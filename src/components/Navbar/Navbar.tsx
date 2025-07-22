// src/components/Navbar/Navbar.tsx
'use client';

import { useState } from 'react';
import { connectXumm, checkXummStatus, StatusResult } from '@/services/wallet';
import styles from './styles.module.scss';

/**
 * Navbar Component
 * - Gerencia o fluxo de conexão com a XUMM Wallet
 * - Exibe o estado de conexão e o endereço da carteira
 */
export default function Navbar() {
  // 1) Estado que indica se estamos aguardando conexão (desabilita o botão)
  const [loading, setLoading] = useState(false);
  // 2) Estado que indica se a carteira já foi conectada
  const [connected, setConnected] = useState(false);
  // 3) Armazena o endereço XRPL retornado pelo XUMM após aprovação
  const [walletAddress, setWalletAddress] = useState<string>();

  /**
   * handleConnect
   * - Cria um payload SignIn no backend (via connectXumm)
   * - Abre a XUMM Wallet (deep-link ou QR)
   * - Faz polling a cada 2s para verificar se o usuário aprovou
   */
  const handleConnect = async () => {
    // Impede múltiplos cliques enquanto já está conectando ou já conectado
    if (loading || connected) return;
    setLoading(true);

    try {
      // 1) Solicita criação de payload e recebe a URL + UUID
      const { connectUrl, uuid } = await connectXumm();

      // 2) Abre nova janela/guia para a XUMM Wallet
      window.open(connectUrl, '_blank');

      // 3) Inicia polling até receber a aprovação do usuário
      const interval = setInterval(async () => {
        const result = await checkXummStatus(uuid);
        // Quando aprovado, result.resolved será true
        if ((result as StatusResult).resolved) {
          console.log('Carteira conectada com sucesso!');
          // Atualiza o estado com o endereço da carteira
          setWalletAddress((result as StatusResult).account);
          // Marca como conectado para evitar novos polling
          setConnected(true);
          // Cancela o intervalo de polling
          clearInterval(interval);
        }
      }, 2000);
    } catch (err) {
      // Log de erro para facilitar o debug
      console.error('Erro ao conectar carteira', err);
    } finally {
      // Garante que o estado de loading seja desativado ao final
      setLoading(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Mostra o nome da app + endereço da carteira, se disponível */}
      <h1>
        Duxfund{walletAddress ? ` – ${walletAddress}` : ''}
      </h1>

      {/* Botão que dispara o handleConnect */}
      <button
        onClick={handleConnect}
        disabled={loading || connected}
        className={styles.connectButton}
      >
        {loading
          ? 'Conectando...'
          : connected
          ? 'Conectado'
          : 'Conectar Carteira'}
      </button>
    </nav>
  );
}
