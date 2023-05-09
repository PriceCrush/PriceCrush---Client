export interface MyAuctionItem {
  id: string;
  price: number;
  create_dt: Date;
  update_dt: Date;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  start_price: number;
  desc: string;
  start_date: Date;
  end_date: Date;
  deletedAt: null;
}
