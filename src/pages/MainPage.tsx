import { useSelector } from "react-redux";

import { RootState } from "../store";
import PhoneCard from "../components/PhoneCard.tsx";

const MainPage = () => {
  const { isLoading, error } = useSelector((state:RootState) => state.products);
  const products = useSelector((state: RootState) => state.products);

  if (isLoading) {
    return (
      <main className="without-data">
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
      </main>
    );
  } else if (error) {
    return <main className="without-data">{error.toString()}</main>;
  } else if (products) {
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
  }
};

export default MainPage;
