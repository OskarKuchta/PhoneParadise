import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../features/ProductsApi";
import { RootState } from "../store";
import PhoneCard from "../components/PhoneCard";

const MainPage = () => {
  const { error, isLoading } = useGetAllProductsQuery({});
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
    <main>
      <h1>
        Welcome to Phone Paradise – Your Ultimate Destination for the Phones.
        Explore a World of Innovation and Style. Shop Now!
      </h1>
      <h2>New Arrivals</h2>
      <div className="phone-container">
        <PhoneCard />
      </div>
    </main>
  );
};

export default MainPage;
