'use server' // <- executar em servidor node

import { Client } from 'xrpl'

//Definindo rpc
const rpcUrl = process.env.TESTNET_RPC

if (!rpcUrl) {
  throw new Error('A variável de ambiente não está definida')
}

//Criando Client
const client: Client = new Client(rpcUrl)

export async function connectClient() {
  try {
    if (!client.isConnected()) {
      await client.connect() // Conectando ao nó da xrpl
    }

    // Enviando req ao client
    const response = await client.request({ command: 'server_info' })
    
    // Retornando status
    return {
      connected: true,
      server_info: response.result,
    }
  } catch (error) {
    console.error('Erro ao conectar ao XRPL:', error)
    return {
      connected: false,
      error: 'Falha na conexão com XRPL',
    }
  }
}