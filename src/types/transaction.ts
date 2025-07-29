// Tipos baseados no DER fornecido

export interface Transaction {
  id: number;
  id_payments: number;
  payments: Payment
  id_nft_mints: number;
  nft_mints: NftMints
  xrpl_id: number;
  type: string;
  hash: string;
  ledger_index: number;
  close_time: string; // ISO string para timestamp
  validated: boolean;
  result_code: string;
  fee: BigInt;
  account: string;
  sequence: BigInt;
  last_ledger_seq?: BigInt;
  flags?: BigInt;
  ledger_hash?: string;
  ctid?: string;
}

export interface Payment {
  id: number;
  destinations: string;
  deliver_max?: number;
  delivered_amount?: string;
}

export interface NftMints {
  id: number;
  uri: string;
  taxon?: number;
}


