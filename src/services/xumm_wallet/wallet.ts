// src/services/wallet.ts

/**
 * ENDPOINT padrão para chamadas da XUMM Wallet.
 * Atualize esta constante se a rota mudar no futuro.
 */
const ENDPOINT = '/api/xumm_wallet';

/**
 * Estrutura de dados retornada na criação de um payload XUMM.
 * - `uuid`: identificador único para polling de status.
 * - `connectUrl`: deep-link ou URL do QR para abrir a XUMM Wallet.
 * - `resolved`: sempre `false` nesta etapa inicial.
 */
export type ConnectResult = {
  uuid: string;
  connectUrl: string;
  resolved: false;
};

/**
 * Estrutura de dados retornada após aprovação do payload.
 * - `uuid`: mesmo identificador enviado no polling.
 * - `resolved`: sempre `true` nesta etapa final.
 * - `account`: endereço XRPL da carteira do usuário.
 */
export type StatusResult = {
  uuid: string;
  resolved: true;
  account: string;
};

/**
 * Dispara a criação de um payload “SignIn” no backend XUMM.
 * @returns {Promise<ConnectResult>} Dados iniciais para abrir a XUMM Wallet.
 * @throws {Error} Se a resposta HTTP não for OK.
 */
export async function connectXumm(): Promise<ConnectResult> {
  // 1) Envia requisição POST sem corpo para criar o payload
  const res = await fetch(ENDPOINT, { method: 'POST' });

  // 2) Verifica se o status HTTP indica sucesso
  if (!res.ok) {
    throw new Error(`connectXumm failed: HTTP ${res.status}`);
  }

  // 3) Converte a resposta para JSON e retorna o objeto tipado
  return res.json();
}

/**
 * Executa polling do status de um payload XUMM existente.
 * @param uuid - Identificador retornado por connectXumm().
 * @returns {Promise<ConnectResult|StatusResult>} 
 *   - Se ainda não aprovado, retorna ConnectResult (resolved: false).  
 *   - Se aprovado, retorna StatusResult (resolved: true + account).
 * @throws {Error} Se a resposta HTTP não for OK.
 */
export async function checkXummStatus(
  uuid: string
): Promise<ConnectResult | StatusResult> {
  // 1) Envia UUID no corpo da requisição para checar status
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid }),
  });

  // 2) Verifica se o status HTTP indica sucesso
  if (!res.ok) {
    throw new Error(`checkXummStatus failed: HTTP ${res.status}`);
  }

  // 3) Converte a resposta para JSON e retorna o objeto tipado
  return res.json();
}
