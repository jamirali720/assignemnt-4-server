import { Sport } from "../sports/sports.model";

export const updateStock = async (productId: string, quantity: number) => {
  const product = await Sport.findById(productId);
  if (product?.stock) {
    product.stock = product.stock - quantity;
    await product?.save();
  }
};
