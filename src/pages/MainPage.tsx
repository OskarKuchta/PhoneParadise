import { useSelector } from "react-redux";
import { RootState } from "../store";
import PhoneCard from "../components/PhoneCard.tsx";
import Footertext from "../components/Footertext.tsx";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const MainPage = () => {
  const { isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [value, setValue] = useState("Default");
  const [range, setRange] = useState([1, 1200]);
  const handleRangeChange = (newRange: [number, number]) => {
    setRange(newRange);
  };
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
        <div className="sort-container">
          <span>Sort by:</span>
          <select onChange={(e) => setValue(e.target.value)}>
            <option>Default</option>
            <option>Price ascending</option>
            <option>Price descending</option>
          </select>
          <div className="slider">
            <Slider
              range
              min={1}
              max={1200}
              step={1}
              value={range}
              onChange={handleRangeChange}
              dotStyle={{ backgroundColor: "purple", borderColor: "purple" }}
              trackStyle={{ background: "purple" }}
            />
            <p>Price up: {range[0]}</p>
            <p>Price to: {range[1]}</p>
          </div>
        </div>
        <section className="phone-container">
          <PhoneCard value={value} range={range} />
        </section>
        <Footertext />
      </main>
    );
  }
};

export default MainPage;
