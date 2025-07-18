'use client';

import { useState } from 'react';
import api from '@/services/api';
import styles from './styles.module.scss';

export default function Navbar() {
  const [connected, setConnected]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    if (loading || connected) return;
    setLoading(true);

    try {
      // chamo o POST e pego URL + uuid
      const resp = await api.post<{ connectUrl: string; uuid: string }>('/api/wallet/connect');
      const { connectUrl, uuid } = resp.data;

      window.open(connectUrl, '_blank');

      // polling a cada 2s até o usuário aprovar no XUMM
      const interval = setInterval(async () => {
        const status = await api.get<{
          meta:     { resolved: boolean };
          response: { account: string };
        }>(`/api/wallet/connect/${uuid}`);

        if (status.data.meta.resolved) {
          console.log('Carteira conectada com sucesso!');
          setWalletAddress(status.data.response.account);
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
      <h1 className={styles.brand}>
        Duxfund{walletAddress ? ` – ${walletAddress}` : ''}
      </h1>
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
