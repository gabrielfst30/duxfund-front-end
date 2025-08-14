import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/prisma";


export async function GET() {

    const allNfts = await prismaClient.nftMints.findMany()

    if (!allNfts) {
        return NextResponse.json({ error: "Não existe NFTs registrados" }, { status: 500 });
    }

    return NextResponse.json(allNfts)
}