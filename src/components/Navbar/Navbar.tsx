// src/components/Navbar/Navbar.tsx
'use client';
import { useState } from 'react';
import { connectXumm, checkXummStatus, StatusResult } from '@/services/wallet';
import styles from './styles.module.scss';

export default function Navbar() {
  const [loading, setLoading]           = useState(false);
  const [connected, setConnected]       = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();

  const handleConnect = async () => {
    if (loading || connected) return;
    setLoading(true);

    try {
      const { connectUrl, uuid } = await connectXumm();
      window.open(connectUrl, '_blank');

      const interval = setInterval(async () => {
        const result = await checkXummStatus(uuid);
        if ((result as StatusResult).resolved) {
          console.log('Carteira conectada com sucesso!');
          setWalletAddress((result as StatusResult).account);
          setConnected(true);
          clearInterval(interval);
        }
      }, 2000);
    } catch (err) {
      console.error('Erro ao conectar carteira', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <h1>
        Duxfund{walletAddress ? ` – ${walletAddress}` : ''}
      </h1>
      <button
        onClick={handleConnect}
        disabled={loading || connected}
        className={styles.connectButton}
      >
        {loading ? 'Conectando...' : connected ? 'Conectado' : 'Conectar Carteira'}
      </button>
    </nav>
  );
}
