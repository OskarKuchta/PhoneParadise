import { useSelector } from "react-redux";
import { RootState } from "../store";
import PhoneCard from "../components/PhoneCard.tsx";
import Footertext from "../components/Footertext.tsx";
import { useState } from "react";

const MainPage = () => {
  const { isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [value, setValue] = useState("Default");
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
  } else {
    return (
      <main>
        <h1>
          Welcome to Phone Paradise – Your Ultimate Destination for the Phones.
          Explore a World of Innovation and Style. Shop Now!
        </h1>
        <span>Sort by:</span>
        <select onChange={(e) => setValue(e.target.value)}>
          <option>Default</option>
          <option>Price ascending</option>
          <option>Price descending</option>
        </select>
        <section className="phone-container">
          <PhoneCard value={value} />
        </section>
        <Footertext />
      </main>
    );
  }
};

export default MainPage;
