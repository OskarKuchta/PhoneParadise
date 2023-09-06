import Products from "../Types/Products.ts";
import { useGetAllProductsQuery } from "../features/ProductsApi";

const PhoneCard = () => {
  const { data } = useGetAllProductsQuery({});
  return (
    <>
      {data?.map((product: Products) => (
        <aside className="phone-card" key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <div>
            <p>{product.desc}</p>
            <p>${product.price}</p>
          </div>
          <button>Add to cart</button>
        </aside>
      ))}
    </>
  );
};

export default PhoneCard;
