export interface Torrent {
  id: number;
  name: string;
  image: string;
  size: string;
  uploader: string;
  date: string;
  se: number;
  le: number;
  type: 'Adulte' | 'Audio' | 'Vidéo' | 'App' | 'Jeux' | 'Autre';
  format?: string;
  resolution?: string;
  description?: string;
  files?: File[];
}

export interface File {
  id: number;
  name: string;
  size: string;
  extension: string;
}

export type CryptoCurrency = 'btc' | 'xmr';

export interface WalletInfo {
  address: string;
  color: string;
  name: string;
}