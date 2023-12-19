import { collection, getDocs, query, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { db } from "../../assets/FirebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ShoppingHistory: FC = () => {
  const [shopHistoryList, setShopHistoryList] = useState<any>([]);
  const username = useSelector(
    (state: RootState) => state.account.userData.name
  );

  useEffect(() => {
    const fetchData = async () => {
      const accountsQuery = query(
        collection(db, "accounts"),
        where("name", "==", username)
      );
      const querySnapshot = await getDocs(accountsQuery);
      const historyList = querySnapshot.docs.map(
        (doc) => doc.data().shopHistory
      );
      setShopHistoryList(historyList);
    };

    fetchData();
  }, []);
  console.log(shopHistoryList.map((item) => item.length));
  return (
    <div>
      <h2 className="font-bold text-2xl border-black border-b-[1px]">
        Shopping history
      </h2>
      {shopHistoryList.every((item) => item.length > 0) ? (
        <>
          {shopHistoryList
            .flatMap((item) => item)
            .map((item, index: number) => (
              <div key={index} className="border-black border-b pb-2">
                <p className="mt-4">{item?.date}</p>
                {item.cart.cartItems.map((data, innerIndex) => (
                  <p className="" key={innerIndex}>
                    {data.quantity}x {data.name}
                  </p>
                ))}
                <p>
                  Total: $
                  {item.cart.isDiscount ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${item.cart.withDiscount} <span class="ml-1 text-[0.8rem]">($${item.cart.discount} saved)</span>`,
                      }}
                    />
                  ) : (
                    item.cart.total
                  )}
                </p>
              </div>
            ))}
        </>
      ) : (
        <p className="mt-6 text-center text-xl">List is empty yet.</p>
      )}
    </div>
  );
};

export default ShoppingHistory;
