// Representa uma transação comum (ex: pagamento em XRP)
export type Transaction = {
  id: number;
  hash: string; // Hash da transação na XRPL
  ledger_index: number; // Número do ledger onde foi validada
  type: "Payment"; // Tipo da transação (neste caso, um pagamento)
  account: string; // Endereço do remetente
  delivered_amount: string; // Valor entregue em drops (1 XRP = 1.000.000 drops)
  account_destination: string; // Endereço do destinatário
  validated: boolean; // Se a transação foi validada
  result_code: string; // Código de resultado (ex: tesSUCCESS)
  created_at: string; // Timestamp ISO da criação no banco
};

// Representa o NFT criado a partir da transação acima
export type NFT = {
  id: number;
  nft_hash: string; // Hash do NFT gerado
  transaction_hash: string; // Hash da transação que gerou o NFT (relacionamento com Transaction.hash)
  type: "NFTokenMint"; // Tipo da transação (mint de NFT)
  uri: string; // URI codificada (provavelmente em hex)
  taxon: number; // Taxon usado na mintagem
  created_at: string; // Timestamp ISO da criação no banco
};