import ProductsGridComponent from "@/components/Cards";
import { fetchProducts } from "../lib/server/fetchProducts";

async function Home() {
  const products = await fetchProducts();
  return (
    <div>
      <ProductsGridComponent products={products} />
    </div>
  );
}

export default Home;
