// src/app/api/wallet/connect/[uuid]/route.ts
import { NextResponse } from 'next/server';
import { XummSdk } from 'xumm-sdk';

const sdk = new XummSdk(
  process.env.XUMM_API_KEY!,
  process.env.XUMM_API_SECRET!
);

export async function GET(
  request: Request,
  context: { params: Promise<{ uuid: string }> }
) {
  // aguarda o params antes de extrair o uuid
  const { uuid } = await context.params;
  const payload = await sdk.payload.get(uuid);

  return NextResponse.json(payload);
}
