'use client';
import { Client, Wallet } from 'xrpl';
import { useState } from 'react';

export const NFTViewer = () => {
  const [seed, setSeed] = useState('');
  const [nftStatus, setNftStatus] = useState('');

  const mintNFT = async () => {
    if (!seed.trim()) {
      setNftStatus('Erro: Insira uma seed válida');
      return;
    }

    try {
      setNftStatus('Conectando à Testnet...');
      const client = new Client("wss://s.altnet.rippletest.net/");
      await client.connect();

      setNftStatus('Preparando transação...');
      const wallet = Wallet.fromSeed(seed.trim());
      
      const tx = {
        TransactionType: "NFTokenMint",
        Account: wallet.address,
        URI: "697066733a2f2f7465737465", // "teste" em hexadecimal
        Flags: 8,
        NFTokenTaxon: 0
      };

      setNftStatus('Enviando transação... (aguarde ~20 segundos)');
      const response = await client.submitAndWait(tx, { wallet });
      console.log("NFT cunhado!", response);
      setNftStatus(`✅ NFT criado com sucesso! TX Hash: ${response.result.hash}`);
      
    } catch (error) {
      console.error(error);
      setNftStatus(`❌ Erro: ${error instanceof Error ? error.message : 'Transação falhou'}`);
    }
  };

  return (
    <div style={{ margin: '1rem' }}>
      <h3>Criar NFT de Teste</h3>
      <input
        type="text"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="Cole sua seed (ex: sEdT...)"
        style={{ width: '400px', padding: '0.5rem' }}
      />
      <button 
        onClick={mintNFT}
        style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}
      >
        Cunhar NFT
      </button>
      <p>{nftStatus}</p>
    </div>
  );
};
