import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { PhoneCard, Products } from "../Types/Types";
import { addItem } from "../features/CartSlice";
import { FC } from "react";
const PhoneCard: FC<PhoneCard> = ({
  value,
  range,
  paginationCount,
  currentPage,
  setCurrentPage,
}) => {
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
  const currentProducts: Products[] = sortedItemsArray.slice(startIndex, endIndex);
  return (
    <>
      {hasProducts ? (
        <>
          <section className="phone-container">
            {currentProducts.map((product) => (
              <aside className="phone-card" key={product.id}>
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
                <div>
                  <p>{product.desc}</p>
                  <p>${product.price}</p>
                </div>
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </aside>
            ))}
          </section>
          <aside className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
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
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= sortedItemsArray.length}
            >
              &#62;
            </button>
          </aside>
        </>
      ) : (
        <h3 className="phone-card-empty">
          There are no products for the given filters. Take different filters.
        </h3>
      )}
    </>
  );
};

export default PhoneCard;
