import { ROUTES } from "./routes";

export const getProductDetailRoute = (productId: number | string) =>
  ROUTES.PRODUCT_DETAIL.replace(":id", String(productId));
