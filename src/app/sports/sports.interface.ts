// name, category, stock quantity, brand, rating
export interface ISports {
  _id?: string;
  name: string;
  category: string;
  stock?: number;
  quantity?: number;
  brand: string;
  ratings?: number;
  numberOfReviews?: number;
  description: string;
  price: number;
  image: {
    url: string;
    public_id: string;
  };
  reviews?: [{ name: string; email: string; comment: string; rating: number }];
}
export type TQuery = {
  name?: string;
  brand?: string;
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  ratings?: number;
  numberOfReviews?: number;
  sort?: string;
  reviews?: [{ name: string; email: string; comment: string; rating: number }];
};
export type TReview = {
  name: string;
  email: string;
  comment: string;
  rating: string;
};
