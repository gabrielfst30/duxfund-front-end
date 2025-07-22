// src/app/api/xumm_wallet/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { XummSdk }                   from 'xumm-sdk';

export async function POST(request: NextRequest) {
  // 1) valida as env vars
  const key    = process.env.XUMM_API_KEY;
  const secret = process.env.XUMM_API_SECRET;
  if (!key || !secret) {
    return NextResponse.json(
      { error: 'XUMM_API_KEY / XUMM_API_SECRET missing' },
      { status: 500 }
    );
  }

  // 2) instancia o SDK **aqui**, dentro do handler
  const sdk = new XummSdk(key, secret);

  // 3) lê o body ({} se não vier JSON)
  const { uuid } = (await request.json().catch(() => ({}))) as {
    uuid?: string;
  };

  // 4) se vier uuid: polling
  if (uuid) {
    const payload = await sdk.payload.get(uuid);
    if (!payload) {
      return NextResponse.json(
        { error: 'Payload not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      uuid,
      resolved: payload.meta.resolved,
      ...(payload.meta.resolved && { account: payload.response.account }),
    });
  }

  // 5) senão: cria um SignIn payload
  const created = await sdk.payload.create(
    { txjson: { TransactionType: 'SignIn' } },
    true
  );
  if (!created) {
    return NextResponse.json(
      { error: 'Failed to create payload' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    uuid:       created.uuid,
    connectUrl: created.next.always,
    resolved:   false,
  });
}
