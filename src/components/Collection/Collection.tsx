import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import Example from "@/../public/examples.jpg";
import { getProducts } from "@/core/actions";
import { productDetails } from "@/core/interfaces";
import useUserState from "@/core/useStore";
type Props = {};

const Collection = (props: Props) => {
  const [products, setProducts] = useState<productDetails[]>();
  const user = useUserState((state) => state.user);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, [products]);

  return (
    <div className="mt-20 text-center dark ">
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight">
        Our Collection
      </h1>
      <div className="flex flex-wrap gap-6 justify-center p-10">
        {products &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              description={product.description}
              imageURL={product.imageURL}
              id={product.id}
              customizable={product.customizable}
              userId={user?.id as unknown as string}
            />
          ))}
      </div>
    </div>
  );
};

export default Collection;
