import { NextResponse } from "next/server";
import { client } from "@/xrpl/client"
import { xrpToDrops } from "xrpl";
import { Wallet } from "xrpl";

export async function POST() {

    await client.connect()

    /**--------------TRANSACIONANDO ENTRE DUAS WALLETS--------------**/

    //Criando uma user wallet com fundos
    const createUserWallet = await client.fundWallet()
    console.log("USER:", createUserWallet)

    //Criando uma dux wallet zerada
    const createDuxWallet: Wallet = Wallet.generate()
    console.log("DUX:", createDuxWallet)

    //Pegando propriedades da wallet
    const userWallet = createUserWallet.wallet; //acessando wallet
    const duxWallet = createDuxWallet; //dux wallet

    //Preparando transação
    const preparedTransaction = await client.autofill({
        "TransactionType": "Payment",
        "Account": userWallet.classicAddress, //remetente
        "Amount": xrpToDrops("9"), //1000000 drops = 1 xrp
        "Destination": duxWallet.classicAddress
    })

    //Assinando tx com carteira do remetente
    const signed = userWallet.sign(preparedTransaction)

    //Enviando tx com assinatura
    const result = await client.submitAndWait(signed.tx_blob);


    /**--------------MINTANDO NFT--------------**/

    //1. Pegando o hash da transação para usar no NFT
    const txHash = result.result.tx_json.hash as string || result.result.hash as string


    //2. Codificando o hash em hexadecimal para o campo URI
    function stringToHex(uri: string) {
        return Buffer.from(uri, 'utf8').toString('hex');
    }

    const uriHex = stringToHex(txHash);


    //Mintando NFT
    const mintNFT = await client.autofill({
        "TransactionType": "NFTokenMint",
        "Account": userWallet.classicAddress, //remetente
        "NFTokenTaxon": 0, // obrigatório, pode ser 0
        "URI": uriHex //identidade do NFT
    })

    //Assinando o NFT com a carteira do remetente
    const signerMint = userWallet.sign(mintNFT)
    const mintResult = await client.submitAndWait(signerMint.tx_blob);


    //Sempre desconectar após operações
    client.disconnect()


    return NextResponse.json({
        payment: result,
        nftMint: mintResult
    }, { status: 200 });

}