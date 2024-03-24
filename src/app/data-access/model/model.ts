export interface Fund {
  id: number;
  name: string;
  code: string;
  currentPrice: number;
  lowestPrice: number;
  highestPrice: number;
  minimumSubValue: number;
  navPercent: number;
  date: number;
}

export interface NAV {
  id: number;
  createdAt: number;
  nav: number;
  navDate: string;
}

export interface Volume {
  buy: number;
  sell: number;
  date: string;
}

export interface Comment {
  id: number;
  username: string;
  comment: string;
  liked?: boolean;
}