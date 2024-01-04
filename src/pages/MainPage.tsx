import { useSelector } from "react-redux";
import { RootState } from "../store";
import PhoneCard from "../components/Products/PhoneCard.tsx";
import DesktopFooter from "../components/Footer/DesktopFooter.tsx";
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MainPage = () => {
  const { isLoading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [value, setValue] = useState<string>("Default");
  const [range, setRange] = useState<[number, number]>([1, 1200]);
  const [paginationCount, setPaginationCount] = useState<number>(10);
  const handleRangeChange = (newRange: [number, number]) => {
    setRange(newRange);
  };
  const firstValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(event.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      setRange([1, range[1]]);
    }
    if (newValue >= 1 && newValue <= 1200) {
      setRange([newValue, range[1]]);
    }
  };
  const secondValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(event.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      setRange([1, range[1]]);
    }
    if (newValue >= 1 && newValue <= 1200) {
      setRange([range[0], newValue]);
    }
  };
  const changePagination = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: number = Number(e.target.value);
    setPaginationCount(selectedValue);
    setCurrentPage(1);
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
      <main className="m-8">
        <h1 className="text-purple text-center font-trocchi text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-10 mb-8">
          Welcome to Phone Paradise – Your Ultimate Destination for the Phones.
          Explore a World of Innovation and Style. Shop Now!
        </h1>
        <section className="flex flex-col md:flex-row justify-center mb-16">
          <aside className="flex flex-col items-center md:mr-12">
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="sortOrder">Sort by:</label>
              <select
                id="sortOrder"
                className="w-40 mt-2 mb-10"
                onChange={(e) => {
                  setValue(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ outlineColor: "rgb(46, 3, 87)" }}
              >
                <option>Default</option>
                <option>Price ascending</option>
                <option>Price descending</option>
                <option>Date release</option>
                <option>Screen size</option>
                <option>Actual available</option>
              </select>
            </form>
          </aside>
          <aside className="flex flex-col items-center mb-8">
            <Slider
              className="mb-8 md:mb-[0.4rem] w-40"
              range
              min={1}
              max={1200}
              step={1}
              value={range}
              onChange={handleRangeChange}
              trackStyle={{ background: "purple" }}
              ariaLabelForHandle="Price range slider"
              ariaLabelledByForHandle="Price range slider"
            />
            <div className=" mb-[0.7rem] my-[0.2rem] flex">
              <label className="first-price-filter" htmlFor="first-range">
                Price up:{" "}
              </label>
              <input
                id="first-range"
                className="filter-input"
                type="number"
                value={range[0]}
                min={1}
                max={1200}
                onChange={firstValue}
              />
              <span>$</span>
            </div>
            <div className="mb-[0.7rem] my-[0.2rem] flex">
              <label htmlFor="second-range">Price to: </label>
              <input
                id="second-range"
                className="filter-input"
                type="number"
                value={range[1]}
                min={1}
                max={1200}
                onChange={secondValue}
              />
              <span>$</span>
            </div>
          </aside>
          <aside className="choose-pagination flex flex-col items-center md:ml-8">
            <label htmlFor="page-pagination">Products on page:</label>
            <select
              id="page-pagination"
              onChange={changePagination}
              style={{ outlineColor: "rgb(46, 3, 87)" }}
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </aside>
        </section>
        <PhoneCard
          value={value}
          range={range}
          paginationCount={paginationCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <DesktopFooter />
      </main>
    );
  }
};

export default MainPage;
