export interface PriceState {
  initialPrice: {
    value: number | undefined;
    isValid: boolean;
  };
  minPrice: {
    value: number | undefined;
    isValid: boolean;
  };
  minPricePer: {
    value: string;
  };
}

export interface ImageFiles {
  main: File | null;
  sub: File[];
  mainPreviewUrl: string | null;
  subPreviewUrl: string[];
}

export interface Dates {
  start_date: string;
  end_date: string;
}
