import ProductCard from "../Card";
import { IProductsGridProps, IProduct } from "@/interfaces/interfaces";

function ProductsGridComponent({ products }: IProductsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-10 md:grid-cols-3">
      {products.map((product: IProduct) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductsGridComponent;
