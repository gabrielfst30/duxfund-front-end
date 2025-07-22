// src/services/wallet.ts
export type ConnectResult = {
  uuid:      string;
  connectUrl: string;
  resolved:  false;
};
export type StatusResult = {
  uuid:     string;
  resolved: true;
  account:  string;
};

const ENDPOINT = '/api/xumm_wallet';

export async function connectXumm(): Promise<ConnectResult> {
  const res = await fetch(ENDPOINT, { method: 'POST' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function checkXummStatus(
  uuid: string
): Promise<ConnectResult | StatusResult> {
  const res = await fetch(ENDPOINT, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ uuid }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
