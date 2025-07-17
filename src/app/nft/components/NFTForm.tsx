'use client';
import { useState } from 'react';
import { Client, Wallet } from 'xrpl';

export const NFTForm = () => {
  const [formData, setFormData] = useState({
    seed: '',
    uri: '697066733a2f2f7465737465', // "ipfs://teste" em hex
    taxon: '0'
  });
  const [status, setStatus] = useState({ message: '', isError: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.seed.startsWith('sEd')) {
      setStatus({ message: 'Por favor, insira uma SEED válida (começa com sEd...)', isError: true });
      return;
    }

    try {
      setStatus({ message: 'Conectando à XRPL Testnet...', isError: false });
      
      const client = new Client("wss://s.altnet.rippletest.net/");
      await client.connect();

      const wallet = Wallet.fromSeed(formData.seed);
      setStatus({ message: `Carteira conectada: ${wallet.address}`, isError: false });

      const tx = {
        TransactionType: "NFTokenMint",
        Account: wallet.address,
        URI: formData.uri,
        Flags: 8,
        NFTokenTaxon: parseInt(formData.taxon)
      };

      setStatus({ message: 'Assinando e enviando transação...', isError: false });
      const response = await client.submitAndWait(tx, { wallet });
      
      setStatus({
        message: `✅ NFT criado com sucesso!
        ID: ${response.result.NFTokenID}
        Explorer: https://testnet.xrpl.org/transactions/${response.result.hash}`,
        isError: false
      });

    } catch (error) {
      setStatus({
        message: `❌ Erro: ${error instanceof Error ? error.message : 'Falha na transação'}`,
        isError: true
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="nft-form">
      <div className="form-group">
        <label htmlFor="seed">Seed da Carteira</label>
        <input
          id="seed"
          type="password"
          value={formData.seed}
          onChange={(e) => setFormData({...formData, seed: e.target.value})}
          placeholder="sEd7Ew7XEEdQzH972wusVQd5SfFTjk1"
          required
        />
        <small>Obtenha no <a href="https://xrpl.org/xrp-testnet-faucet.html" target="_blank">Testnet Faucet</a></small>
      </div>

      <div className="form-group">
        <label htmlFor="uri">URI (Hex)</label>
        <input
          id="uri"
          type="text"
          value={formData.uri}
          onChange={(e) => setFormData({...formData, uri: e.target.value})}
          placeholder="697066733a2f2f7465737465"
        />
        <small>Texto convertido para hexadecimal</small>
      </div>

      <div className="form-group">
        <label htmlFor="taxon">Taxon (Coleção)</label>
        <input
          id="taxon"
          type="number"
          value={formData.taxon}
          onChange={(e) => setFormData({...formData, taxon: e.target.value})}
          min="0"
        />
      </div>

      <button type="submit" className="submit-button">
        Cunhar NFT
      </button>

      {status.message && (
        <div className={`status-message ${status.isError ? 'error' : 'success'}`}>
          {status.message.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </form>
  );
};
