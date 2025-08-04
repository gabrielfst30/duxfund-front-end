// src/app/api/check-mint-signature/route.ts
import { NextRequest, NextResponse } from "next/server";
import { xumm } from "@/services/xumm/xummClient";

export async function POST(req: NextRequest) {
  const { mintUuid } = await req.json();
  const payload = await xumm.payload.get(mintUuid);

  //Verificando se o nft foi assinado pelo usuário
  if (!payload?.meta?.signed) {
    return NextResponse.json({ resolved: false });
  }

  // opcional: você pode retornar o txid do mint:
  const mintTxId = payload.response.txid;

  
  return NextResponse.json({ resolved: true, mintTxId });
}
