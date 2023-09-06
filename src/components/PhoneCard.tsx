import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Products } from "src/Types/Products";
const PhoneCard = () => {
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
          <button>Add to cart</button>
        </aside>
      ))}
    </>
  );
};

export default PhoneCard;
