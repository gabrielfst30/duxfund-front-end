'use client';
import { useState, useEffect } from 'react';
import { Client } from 'xrpl';

export const XRPLNFT = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Endereço de teste da XRPL Testnet (substitua por um que tenha NFTs)
  // const testAddress = 'raTjWP1DGTRzKCEv2R9ftx71wr1xs8jaau';
  // const testAddress = 'rfyJRyFZzX71LL5LreHpUZBZqrB18xUL4P';
  const testAddress = 'rVnYNK9yuxBz4uP8zC8LEFokM2nqH3poc';
  useEffect(() => {
    const fetchNFTs = async () => {
      const client = new Client("wss://s.altnet.rippletest.net/");
      
      try {
        await client.connect();
        const response = await client.request({
          command: "account_nfts",
          account: testAddress,
        });
        setNfts(response.result.account_nfts);
      } catch (err) {
        setError("Falha ao buscar NFTs. Verifique o console.");
        console.error(err);
      } finally {
        setIsLoading(false);
        client.disconnect();
      }
    };

    fetchNFTs();
  }, []);

  if (isLoading) return <p>Carregando NFTs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>NFTs do Endereço: {testAddress.slice(0, 10)}...</h3>
      {nfts.length > 0 ? (
        <ul>
          {nfts.map((nft) => (
            <li key={nft.NFTokenID}>
              <strong>ID:</strong> {nft.NFTokenID.slice(0, 10)}...
              <br />
              <strong>Taxon:</strong> {nft.NFTokenTaxon}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum NFT encontrado neste endereço.</p>
      )}
    </div>
  );
};
