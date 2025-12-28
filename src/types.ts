export interface Torrent {
  id: number;
  name: string;
  size: string;
  uploader: string;
  date: string;
  se: number;
  le: number;
  type: 'Audio' | 'Vidéo' | 'App' | 'Jeux' | 'Autre';
}

export type CryptoCurrency = 'btc' | 'xmr';

export interface WalletInfo {
  address: string;
  color: string;
  name: string;
}