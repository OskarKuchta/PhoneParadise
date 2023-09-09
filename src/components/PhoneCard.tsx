import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Products } from "../Types/Products";
import { addItem } from "../features/CartSlice";



const PhoneCard = () => {
  const dispatch = useDispatch();
  const addToCart: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addItem({}));
  };
  const { items } = useSelector((store: RootState) => store.products);
  const itemsArray = (items as { default: Products[] }).default;
  return (
    <>
      {itemsArray.map((product: Products) => (
        <aside className="phone-card" key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <div>
            <p>{product.desc}</p>
            <p>${product.price}</p>
          </div>
          <button onClick={addToCart}>Add to cart</button>
        </aside>
      ))}
    </>
  );
};

export default PhoneCard;
