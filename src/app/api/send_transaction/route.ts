import { NextResponse } from "next/server";
import { client } from "@/xrpl/client"
import { xrpToDrops } from "xrpl";
import { Wallet } from "xrpl";
import { prisma } from "@/prisma";


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
    const txResult = await client.submitAndWait(signed.tx_blob);


    /**--------------MINTANDO NFT--------------**/

    //1. Pegando o hash da transação para usar no NFT
    const txHash = txResult.result.tx_json.hash as string || txResult.result.hash as string


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

    console.log(txResult)


    //Sempre desconectar após operações
    client.disconnect()

    // 1) Cria o payment
    // const payment = await prisma.payments.create({
    //     data: {
    //         destination: txResult.result.tx_json.Destination,   
    //         deliver_max: BigInt(txResult.result.tx_json.DeliverMax),
    //         delivered_amount: BigInt(txResult.result.meta?.delivered_amount),
    //     },
    // });

    // 2) Cria o nft mint
    // const nftMint = await prisma.nftMints.create({
    //     data: {
    //         uri: txResult.result.tx_json.URI,
    //         taxon: txResult.result.tx_json.NFTokenTaxon,  
    //     },
    // });

    // 3) Cria a transaction
    // const transaction = await prisma.transactions.create({
    //     data: {
    //         id_payments: payment.id,
    //         id_nft_mints: nftMint.id,
    //         xrpl_id: txResult.result.tx_json.Sequence,
    //         type: txResult.result.tx_json.TransactionType,
    //         hash: txResult.result.hash,
    //         ledger_index: txResult.result.ledger_index,
    //         close_time: new Date(txResult.result.close_time_iso),
    //         validated: txResult.result.validated ? 1 : 0,
    //         result_code: txResult.result.meta?.TransactionResult ?? "",
    //         fee: BigInt(txResult.result.tx_json.Fee),
    //         account: txResult.result.tx_json.Account,
    //         sequence: BigInt(txResult.result.tx_json.Sequence),
    //         last_ledger_seq: txResult.result.tx_json.LastLedgerSequence
    //             ? BigInt(txResult.result.tx_json.LastLedgerSequence)
    //             : undefined,
    //         flags: typeof txResult.result.tx_json.Flags === "number"
    //             ? BigInt(txResult.result.tx_json.Flags)
    //             : undefined,
    //         ledger_hash: txResult.result.ledger_hash,
    //         ctid: txResult.result.ctid,
    //     },
    // });

    // return NextResponse.json({
    //     transaction
    // }, { status: 200 });

    // return NextResponse.json({
    //     payment: txResult,
    //     nftMint: mintResult
    // }, { status: 200 });
}