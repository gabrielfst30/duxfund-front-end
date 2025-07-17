import { NextResponse } from "next/server";
import { client } from "@/xrpl/client"
import { xrpToDrops } from "xrpl";

export async function POST() {

    await client.connect()

    //Criando uma Wallet 1 com fundos
    const walletObjectOne = await client.fundWallet()

    //Criando uma Wallet 2 com fundos
    const walletObjectTwo = await client.fundWallet()

    //Pegando propriedades da wallet
    const walletOne = walletObjectOne.wallet; //Wallet 1
    const walletTwo = walletObjectTwo.wallet; //Wallet 2

    //Preparando transação
    const preparedTransaction = await client.autofill({
        "TransactionType": "Payment",
        "Account": walletOne.classicAddress, //remetente
        "Amount": xrpToDrops("5"),
        "Destination": walletTwo.classicAddress
    })

    //Assinando tx com carteira do remetente
    const signed = walletOne.sign(preparedTransaction)

    //Enviando tx com assinatura
    const result = await client.submitAndWait(signed.tx_blob);

    //Sempre desconectar após operações
    client.disconnect()

    return NextResponse.json(result, { status: 200 })


}