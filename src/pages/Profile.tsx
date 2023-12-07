import { FC } from "react";
const Profile: FC = () => {
  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh]  lg:py-0">
        <div className="w-[90vw] bg-white rounded-lg shadow md:mt-0 xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="border border-black w-16 h-16 rounded-full bg-emerald-500 flex justify-center items-center">
              <span>0</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl mb-64">
              Hey, Oska98.
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
