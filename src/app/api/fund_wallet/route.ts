import { NextResponse } from "next/server";
import { client } from "@/services/xrpl/client"

export async function POST(){

    await client.connect()

    const wallet = await client.fundWallet()

    client.disconnect()

    return NextResponse.json(wallet, {status: 200})
  

}