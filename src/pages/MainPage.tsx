import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../features/ProductsApi";
import { RootState } from "../store";

interface Products {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
}

const MainPage = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({});
  const products = useSelector((state: RootState) => state.products);

  if (isLoading) {
    return (
      <section className="without-data">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Loading...
      </section>
    );
  } else if (error) {
    return <section className="without-data">{error.toString()}</section>;
  }

  return (
    <div>
      <h2>New Arrivals</h2>
      <br />
      {data?.map((product: Products) => (
        <aside key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <div>
            <span>{product.desc}</span>
            <span>${product.price}</span>
          </div>
          <button>Add to cart</button>
        </aside>
      ))}
    </div>
  );
};

export default MainPage;
