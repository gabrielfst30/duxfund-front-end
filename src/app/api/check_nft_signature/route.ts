// src/app/api/check-mint-signature/route.ts
import { NextRequest, NextResponse } from "next/server";
import { xumm } from "@/services/xumm/xummClient";
import { client } from "@/services/xrpl/client";
import { prismaClient } from "@/prisma";

export async function POST(req: NextRequest) {
  const { mintUuid, paymentHash } = await req.json();

  console.log("mintUuid:", mintUuid);
  console.log("paymentHash:", paymentHash);

  const payload = await xumm.payload.get(mintUuid);

  //Verificando se o nft foi assinado pelo usuário
  if (!payload?.meta?.signed) {
    return NextResponse.json({ resolved: false });
  }

  // pegando id do mint
  const mintTxId = payload.response.txid;

  // validação se o mint ja foi processado
  if (!mintTxId) {
    return NextResponse.json({ error: "Mint ainda não processado." });
  }

  // conecta à XRPL se necessário
  if (!client.isConnected()) await client.connect();

  // busca os dados da transação
  const xrplResult = await client.request({
    command: "tx",
    transaction: mintTxId,
  });

  
  const txValidated = xrplResult.result.validated;
  if (!txValidated) {
    return NextResponse.json({ resolved: false });
  }

  const tx = xrplResult.result;
  const meta = tx.meta as any;

  //
  const createdNode = meta.AffectedNodes.find(
    (node: any) => node.CreatedNode?.LedgerEntryType === "NFToken"
  );

  const NFTokenID = createdNode?.CreatedNode?.LedgerIndex || null;
  const URIHex = tx.tx_json.URI || tx.tx_json?.URI || null;
  const account = tx.tx_json.Account || tx.tx_json.Account;

  if (!URIHex || !account) {
    return NextResponse.json({ error: "Não foi possível extrair dados do NFT." }, { status: 500 });
  }

  const savedNFT = await prismaClient.nftMints.create({
    data: {
      nft_hash: NFTokenID,
      tx_hash: mintTxId,
      transaction_hash: paymentHash,
      type: "NFTokentMint",
      uri: String(URIHex),
      taxon: 0,
    },
  });

  return NextResponse.json({ resolved: true, savedNFT });
}
