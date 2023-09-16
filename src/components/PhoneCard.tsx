import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Products } from "../Types/Types";
import { addItem } from "../features/CartSlice";

const PhoneCard = ({ value, range }) => {
  const dispatch = useDispatch();
  const addToCart = (product: Products) => {
    dispatch(addItem(product));
  };
  const { items } = useSelector((store: RootState) => store.products);
  const itemsArray = (items as { default: Products[] }).default.filter((item) => item.price >= range[0] && item.price <= range[1]);
  const itemsAscending: number[] = itemsArray
    .map((item) => item.price)
    .sort((a, b) => a - b);
  const itemsDescending: number[] = itemsArray
    .map((item) => item.price)
    .sort((a, b) => b - a);
  const sortedItemsArray: Products[] = itemsArray.slice().sort((a, b) => {
    if (value === "Price ascending") {
      const priceA = a.price;
      const priceB = b.price;
      return itemsAscending.indexOf(priceA) - itemsAscending.indexOf(priceB);
    } else if (value === "Price descending") {
      const priceA = a.price;
      const priceB = b.price;
      return itemsDescending.indexOf(priceA) - itemsDescending.indexOf(priceB);
    }
  });
  return (
    <>
      {sortedItemsArray.map((product) => (
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
    </>
  );
};

export default PhoneCard;
