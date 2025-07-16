import { Client } from 'xrpl'

const rpcUrl = process.env.TESTNET_RPC //Definindo rpc

if (!rpcUrl) {
  throw new Error('A variável de ambiente não está definida')
}
//Criando Client
export const client: Client = new Client(rpcUrl)
