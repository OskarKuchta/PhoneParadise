import { Dispatch, FC, useState } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/AccountSlice";
import { changeAvatar, changeName } from "../features/AccountSlice";
import { NavigateFunction, useNavigate } from "react-router";
import { AnyAction } from "redux";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../assets/FirebaseConfig";

const Profile: FC = () => {
  const [isColorsPallete, setIsColorsPallete] = useState<boolean>(false);
  const today: Date = new Date();

  const formattedDate: string =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const formattedHour: string =
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? "0" : "") +
    today.getMinutes();

  const storedUserData = useSelector(
    (state: RootState) => state.account.userData
  );
  const avatarColor = useSelector(
    (state: RootState) => state.account.userData.avatarColor
  );
  const userName = useSelector(
    (state: RootState) => state.account.userData.name
  );
  const [actualColor, setActualColor] = useState<string>(avatarColor);
  const [prevColor, setPrevColor] = useState<string>(avatarColor);
  const [isButtonName, setIsButtonName] = useState<boolean>(false);
  const [nameError, setNameError] = useState({
    nameIsTaken: false,
    nameIsShort: false,
    nameIsInvalid: false,
  });
  const [changedName, setChangedName] = useState<string>("");
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const nameRegex: RegExp = /^[A-Za-z][A-Za-z0-9]*$/;
  const navigate: NavigateFunction = useNavigate();

  const logoutAccount = () => {
    dispatch(logout());
    navigate("/login");
  };

  const saveName = async () => {
    try {
      const accountsQuery = query(
        collection(db, "accounts"),
        where("id", "==", storedUserData.id)
      );
      const accountCollection = collection(db, "accounts");
      const userList = await getDocs(accountCollection);
      const isNameTaken = userList.docs.some((doc) => {
        const nameInDoc = doc.data().name;
        if (changedName === nameInDoc) {
          setNameError({
            nameIsTaken: true,
            nameIsShort: false,
            nameIsInvalid: false,
          });
          return true;
        } else if (changedName.length < 4) {
          setNameError({
            nameIsTaken: false,
            nameIsShort: true,
            nameIsInvalid: false,
          });
          return true;
        } else if (!nameRegex.test(changedName)) {
          setNameError({
            nameIsTaken: false,
            nameIsShort: false,
            nameIsInvalid: true,
          });
          return true;
        }
        return false;
      });

      const querySnapshot = await getDocs(accountsQuery);
      if (!isNameTaken && !querySnapshot.empty) {
        const userDocRef = doc(db, "accounts", querySnapshot.docs[0].id);
        await updateDoc(userDocRef, { name: changedName });
        dispatch(changeName(changedName));
        setNameError({
          nameIsTaken: false,
          nameIsShort: false,
          nameIsInvalid: false,
        });
        setIsButtonName(false);
      }
    } catch (error) {
      console.error("Error updating name:", error.message);
    }
  };

  const saveColor = async () => {
    try {
      const accountsQuery = query(
        collection(db, "accounts"),
        where("id", "==", storedUserData.id)
      );

      const querySnapshot = await getDocs(accountsQuery);

      if (!querySnapshot.empty) {
        const userDocRef = doc(db, "accounts", querySnapshot.docs[0].id);
        await updateDoc(userDocRef, { avatarColor: actualColor });
        dispatch(changeAvatar(actualColor));
        setPrevColor(actualColor);
        setIsColorsPallete(false);
      } else {
        console.log("No matching document found for the given condition.");
      }
    } catch (error) {
      console.error("Error updating avatarColor:", error.message);
    }
  };
  const revertName = () => {
    setChangedName("");
    setIsButtonName(false);
    setNameError({
      nameIsTaken: false,
      nameIsShort: false,
      nameIsInvalid: false,
    });
  };
  const revertColor = () => {
    setActualColor(prevColor);
    setIsColorsPallete(false);
  };
  const changeProfileAvatar = (color: string) => {
    setActualColor(color);
  };

  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh]  lg:py-0">
        <div className="w-[90vw] bg-white rounded-lg shadow md:mt-0 xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col">
                <div className="flex">
                  {isButtonName ? (
                    <div className="flex flex-col md:flex-row items-start relative pb-2">
                      {nameError.nameIsTaken ? (
                        <span className="absolute bottom-12 md:bottom-2 left-28 text-[12px] text-purple">
                          Name is taken
                        </span>
                      ) : nameError.nameIsShort ? (
                        <span className="absolute bottom-12 md:bottom-2 left-28 text-[12px] text-purple">
                          Name is too short
                        </span>
                      ) : nameError.nameIsInvalid ? (
                        <span className="absolute bottom-12 md:bottom-2 left-28 text-[12px] text-purple">
                          Name is invalid
                        </span>
                      ) : null}

                      <div className="mb-6">
                        <label htmlFor="change-name" className="mr-2 text-sm">
                          Type name
                        </label>
                        <input
                          id="change-name"
                          name="change-name"
                          className="border border-black rounded-sm w-40"
                          onChange={(e) => setChangedName(e.target.value)}
                        />
                      </div>
                      <div className="flex mt-2 md:mt-0 mb-2">
                        <button
                          className="text-xs ml-4  py-[0.3rem] px-[0.8rem] rounded focus:bg-red focus:text-lightGray hover:bg-red hover:text-lightGray focus:outline-none"
                          onClick={() => revertName()}
                        >
                          Back
                        </button>
                        <button
                          className="text-xs ml-2  py-[0.3rem] px-[0.8rem] rounded focus:bg-green-500 focus:text-lightGray hover:bg-green-500 hover:text-lightGray focus:outline-none"
                          onClick={saveName}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl inline-flex">
                        Hey,&nbsp;<span>{userName}</span>.
                      </span>
                      <button
                        className="text-xs ml-4 p-[0.3rem] rounded focus:bg-purple focus:text-lightGray hover:bg-purple hover:text-lightGray"
                        onClick={() => {
                          setIsButtonName(true);
                          setIsColorsPallete(false);
                        }}
                      >
                        Change name
                      </button>
                    </>
                  )}
                </div>
                <div className="flex mt-6">
                  <div
                    className={`border border-black w-16 h-16 rounded-full ${actualColor} flex justify-center items-center`}
                  >
                    <span>{userName.slice(0, 1).toUpperCase()}</span>
                  </div>

                  <button
                    className="mb-10 md:mb-20 ml-2 mt-1 p-[0.3rem] rounded focus:outline-none focus:bg-purple focus:text-lightGray hover:bg-purple hover:text-lightGray text-sm"
                    onClick={() => {
                      setIsButtonName(false);
                      setIsColorsPallete(true);
                    }}
                  >
                    Change color
                  </button>
                </div>
              </div>
              {isColorsPallete ? (
                <div className="flex items-center ml-0 md:ml-2 mt-0 md:mt-10">
                  <div className="bg-gray-100 w-60 rounded-md border border-black grid grid-cols-3 gap-2 place-items-center py-2">
                    <button
                      className="border border-black w-10 h-10 rounded-full bg-emerald-500 flex justify-center items-center hover:scale-110 focus:scale-110"
                      onClick={() => changeProfileAvatar("bg-emerald-500")}
                    ></button>
                    <button
                      className="border border-black w-10 h-10 rounded-full bg-pink-500 flex justify-center items-center hover:scale-110 focus:scale-110"
                      onClick={() => changeProfileAvatar("bg-pink-500")}
                    ></button>
                    <button
                      className="border border-black w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center hover:scale-110 focus:scale-110"
                      onClick={() => changeProfileAvatar("bg-blue-500")}
                    ></button>
                    <button
                      className="border border-black w-10 h-10 rounded-full bg-yellow-500 flex justify-center items-center hover:scale-110 focus:scale-110"
                      onClick={() => changeProfileAvatar("bg-yellow-500")}
                    ></button>
                    <button
                      className="border border-black w-10 h-10 rounded-full bg-rose-400 flex justify-center items-center hover:scale-110 focus:scale-110"
                      onClick={() => changeProfileAvatar("bg-rose-400")}
                    ></button>
                    <button
                      className="border border-black w-10 h-10 rounded-full bg-fuchsia-400 flex justify-center items-center hover:scale-110 focus:scale-110"
                      onClick={() => changeProfileAvatar("bg-fuchsia-400")}
                    ></button>
                  </div>
                  <div className="flex flex-col mt-10">
                    <button
                      className="ml-4 mb-2 border-black p-[0.3rem] rounded focus:bg-red focus:text-lightGray hover:bg-red hover:text-lightGray focus:outline-none"
                      onClick={() => revertColor()}
                    >
                      Back
                    </button>
                    <button
                      className="ml-4 border-black p-[0.3rem] rounded focus:bg-green-500 focus:text-lightGray hover:bg-green-500 hover:text-lightGray focus:outline-none"
                      onClick={() => saveColor()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              <h2 className="font-bold text-2xl  border-black border-b-[1px]">
                Shopping history
              </h2>
              <p className="mt-6">
                {formattedDate} {formattedHour}
              </p>
              <p>1x iPhone12</p>
              <p>1x Samsung Galaxy s20</p>
              <p className=" border-black pb-2 border-b-[1px]">
                Total price: $3000
              </p>
            </div>
            <div className="flex">
              <button
                onClick={logoutAccount}
                className="ml-auto p-[0.3rem] rounded focus:outline-none focus:bg-purple focus:text-lightGray hover:bg-purple hover:text-lightGray text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
