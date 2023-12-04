import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { PhoneCard, Products } from "../../Types/Types";
import { addItem } from "../../features/CartSlice";
import { FC, useEffect, useState } from "react";
import { usePhoneContext } from "../../context/PhoneProvider";
const PhoneCard: FC<PhoneCard> = ({
  value,
  range,
  paginationCount,
  currentPage,
  setCurrentPage,
}) => {
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const { isPhone } = usePhoneContext();
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    window.scrollTo(0, isPhone ? 400 : 220);
  }, [currentPage]);
  const dispatch = useDispatch();
  const addToCart = (product: Products) => {
    dispatch(addItem(product));
  };
  const { items } = useSelector((store: RootState) => store.products);
  const itemsArray = (items as { default: Products[] }).default.filter(
    (item) =>
      (item.price >= range[0] && item.price <= range[1]) ||
      (item.price >= range[1] && item.price <= range[0])
  );
  const itemsAscending: number[] = itemsArray
    .map((item) => item.price)
    .sort((a, b) => a - b);
  const itemsDescending: number[] = itemsArray
    .map((item) => item.price)
    .sort((a, b) => b - a);

  const sortedItemsArray: Products[] = itemsArray.slice().sort((a, b) => {
    if (value === "Price ascending") {
      const priceA: number = a.price;
      const priceB: number = b.price;
      return itemsAscending.indexOf(priceA) - itemsAscending.indexOf(priceB);
    } else if (value === "Price descending") {
      const priceA: number = a.price;
      const priceB: number = b.price;
      return itemsDescending.indexOf(priceA) - itemsDescending.indexOf(priceB);
    } else if (value === "Date release") {
      const dateA: number = new Date(a.date).getTime();
      const dateB: number = new Date(b.date).getTime();
      return dateB - dateA;
    } else if (value === "Screen size") {
      const sizeA: number = parseFloat(a.desc.match(/\d+\.\d+/)[0]);
      const sizeB: number = parseFloat(b.desc.match(/\d+\.\d+/)[0]);
      return sizeB - sizeA;
    }
  });

  const hasProducts: boolean = sortedItemsArray.length > 0;
  const productsPerPage: number = paginationCount;
  const startIndex: number = (currentPage - 1) * productsPerPage;
  const endIndex: number = startIndex + productsPerPage;
  const currentProducts: Products[] = sortedItemsArray.slice(
    startIndex,
    endIndex
  );
  return (
    <>
      {hasProducts ? (
        <>
          <section className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {currentProducts.map((product) => (
              <aside
                className="bg-[aliceblue] p-[0.7rem] border rounded-[0.3rem] flex flex-col justify-center items-center text-center"
                key={product.id}
              >
                <h2 className="my-[0.3rem]">{product.name}</h2>
                <img
                  src={product.image}
                  alt={product.name}
                  className="my-[0.3rem]"
                />
                <div className="my-[0.3rem]">
                  <p className="my-[0.3rem]">{product.desc}</p>
                  <p className="my-[0.3rem]">${product.price}</p>
                </div>
                <button
                  className="my-[0.3rem] py-[0.4rem] px-[0.7rem] boder border-transparent 
                  bg-purple rounded text-lightGray transition-all duration-500 focus:outline-purple hover:scale-110
                  focus:scale-110"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </aside>
            ))}
          </section>
          <aside className="mb-20 flex justify-center md:mt-8">
            <button
              className="mx-2 p-[0.2rem] border border-transparent bg-transparent"
              onClick={() => {
                setCurrentPage((currentPage) => currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              &#60;
            </button>
            {Array.from(
              {
                length: Math.ceil(sortedItemsArray.length / productsPerPage),
              },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index + 1);
                  }}
                  className={
                    currentPage === index + 1
                      ? "mx-2 py-[0.4rem] px-[0.8rem] rounded-full bg-purple text-lightGray"
                      : "mx-2 p-[0.2rem] border border-transparent bg-transparent"
                  }
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className="mx-2 p-[0.2rem] border border-transparent bg-transparent"
              onClick={() => {
                setCurrentPage((currentPage) => currentPage + 1);
              }}
              disabled={endIndex >= sortedItemsArray.length}
            >
              &#62;
            </button>
          </aside>
        </>
      ) : (
        <h3 className="text-purple mt-12 mb-[23rem] w-full text-center">
          There are no products for the given filters. Take different filters.
        </h3>
      )}
    </>
  );
};

export default PhoneCard;
