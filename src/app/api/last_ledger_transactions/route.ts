import { NextResponse } from "next/server";
import { client } from "@/xrpl/client"

export async function POST() {

  await client.connect()

  //Criando estrutura de dados do comando para enviar um request para XRPL
  const response = await client.request({
    "command": "ledger",
    "ledger_index": "validated", //último bloco validado pela rede
    "transactions": true //trazer txs
  })

  return NextResponse.json(response.result, { status: 200 })
}