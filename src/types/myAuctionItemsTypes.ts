export type MyAuctionItem = MyBidding | MySelling;

// auction/user/bidding Api
export interface MyBidding {
  id: string;
  price: number;
  create_dt: Date;
  update_dt: Date;
  product: ProductOfBidding;
}

export interface ProductOfBidding {
  id: string;
  name: string;
  start_price: number;
  desc: string;
  start_date: Date;
  end_date: Date;
  minBidPrice: string;
  deletedAt: null;
}

// product/user/selling Api
export interface MySelling {
  id: string;
  name: string;
  start_price: number;
  desc: string;
  start_date: Date;
  end_date: Date;
  minBidPrice: string;
  deletedAt: null;
  user: UserOfSelling;
}

export interface UserOfSelling {
  id: string;
  email: string;
  password: string;
  phone: string;
  nickname: string;
  address: string;
  name: string;
  agreement_use: boolean;
  agreement_mkt: boolean;
  favorites: string;
}
