// src/app/api/wallet/connect/route.ts
import { NextResponse } from 'next/server';
import { XummSdk }       from 'xumm-sdk';

const sdk = new XummSdk(
  process.env.XUMM_API_KEY!,
  process.env.XUMM_API_SECRET!
);

export async function POST(request: Request) {
  const payload = { txjson: { TransactionType: 'SignIn' } };
  const created = await sdk.payload.create(payload, true);

  return NextResponse.json({
    connectUrl: created.next.always,
    uuid:       created.uuid
  });
}
