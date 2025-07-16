import { NextResponse } from "next/server";
import { client } from "@/xrpl/client"
import { Wallet } from "xrpl";

export async function POST(){

    await client.connect()

    const wallet: Wallet = Wallet.generate();

    client.disconnect()

    return NextResponse.json(wallet, {status: 200})
  

}