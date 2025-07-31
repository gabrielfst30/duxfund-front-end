// src/app/api/xumm_wallet/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { XummSdk } from 'xumm-sdk';
import { xrpToDrops } from 'xrpl';

export async function POST(request: NextRequest) {
  const apiKey = process.env.XUMM_API_KEY;
  const apiSecret = process.env.XUMM_API_SECRET;
  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'XUMM_API_KEY and XUMM_API_SECRET must be set' },
      { status: 500 }
    );
  }

  const sdk = new XummSdk(apiKey, apiSecret);

  const body = await request.json().catch(() => ({}));

  const { uuid, TransactionType, Destination, Amount } = body;

  if (uuid) {
    const payload = await sdk.payload.get(uuid);
    if (!payload) {
      return NextResponse.json({ error: 'Payload not found' }, { status: 404 });
    }
    return NextResponse.json({
      uuid,
      resolved: payload.meta.resolved,
      ...(payload.meta.resolved && { account: payload.response.account }),
    });
  }

  // Se for uma transação de pagamento
  if (TransactionType === 'Payment') {
    const payload = {
      txjson: {
        TransactionType,
        Destination,
        Amount: xrpToDrops(Amount), // Converte XRP para drops
      },
    };
    const created = await sdk.payload.create(payload, true);
    if (!created) {
      return NextResponse.json(
        { error: 'Failed to create XUMM payment payload' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      uuid: created.uuid,
      connectUrl: created.next.always,
      resolved: false,
    });
  }


  // Payload de SignIn padrão
  const created = await sdk.payload.create(
    { txjson: { TransactionType: 'SignIn' } },
    true
  );
  if (!created) {
    return NextResponse.json(
      { error: 'Failed to create XUMM payload' },
      { status: 500 }
    );
  }
  return NextResponse.json({
    uuid: created.uuid,
    connectUrl: created.next.always,
    resolved: false,
  });
}