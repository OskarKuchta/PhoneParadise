import { useSelector } from "react-redux";
import { RootState } from "../store";
import PhoneCard from "../components/PhoneCard.tsx";
import Footertext from "../components/Footertext.tsx";
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MainPage = () => {
  const { isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [value, setValue] = useState<string>("Default");
  const [range, setRange] = useState<[number, number]>([1, 1200]);
  const handleRangeChange = (newRange: [number, number]) => {
    setRange(newRange);
  };
  const firstValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      setRange([1, range[1]]);
    }
    if (newValue >= 1 && newValue <= 1200) {
      setRange([newValue, range[1]]);
    }
  };
  const secondValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      setRange([1, range[1]]);
    }
    if (newValue >= 1 && newValue <= 1200) {
      setRange([range[0], newValue]);
    }
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
          <div className="sort-select">
            <span>Sort by:</span>
            <select
              onChange={(e) => setValue(e.target.value)}
              style={{ outlineColor: "rgb(46, 3, 87)" }}
            >
              <option>Default</option>
              <option>Price ascending</option>
              <option>Price descending</option>
              <option>Date release</option>
              <option>Screen size</option>
            </select>
          </div>
          <div className="slider">
            <Slider
              className="slider-filter"
              range
              min={1}
              max={1200}
              step={1}
              value={range}
              onChange={handleRangeChange}
              trackStyle={{ background: "purple" }}
            />
            <p className="first-price-filter">
              Price up:{" "}
              <input
                className="filter-input"
                type="number"
                value={range[0]}
                min={1}
                max={1200}
                onChange={firstValue}
              />
              $
            </p>
            <p>
              Price to:{" "}
              <input
                className="filter-input"
                type="number"
                value={range[1]}
                min={1}
                max={1200}
                onChange={secondValue}
              />
              $
            </p>
          </div>
        </div>
        <PhoneCard value={value} range={range} />
        <Footertext />
      </main>
    );
  }
};

export default MainPage;
