import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FixedContact from "../components/FixedContact";
import {
  Badge,
  Coins,
  Crown,
  HandHeart,
  HelpCircle,
  LogOut,
  MessageCircle,
  Minus,
  Pen,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Client, TablesDB, Account, Query } from "appwrite";
import Swal from "sweetalert2";
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default function Donation({
  user,
  cart,
  addToCart,
  minToCart,
  getUser,
}) {
  const [donate, setDonate] = useState(0);
  const [openDonate, setOpenDonate] = useState(false);
  const tablesDB = new TablesDB(client);
  const navigate = useNavigate();
  let totalDonation = 0;
  let totalPresent = 0;

  if (user.donations != undefined) {
    totalDonation = user.donations.reduce((sum, d) => sum + d.point, 0);
    totalPresent = Math.floor((totalDonation/10000)*100);
  }

  const handleDonate = async () => {
    if (user.points - donate >= 0) {
      try {
        const resultDonate = await tablesDB.updateRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
          rowId: user.$id,
          data: {
            ...user,
            points: user.points - donate,
            donations: [
              ...user.donations,
              {
                point: donate,
              },
            ],
          },
        });
        if (resultDonate) {
          console.log(resultDonate);
          Swal.fire({
            icon: "success",
            title: "Success to Order",
            text: "Success to Order",
            confirmButtonColor: "#000",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/donation");
            }
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: "Failed to Order",
          text: "Failed to Order",
          confirmButtonColor: "#000",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/donation");
          }
        });
      } finally {
        setDonate(0);
        setOpenDonate(false);
        getUser();
        // document.getElementById("indicator").innerHTML = `
        //       <div
        //         className="w-[${
        //           (totalDonation / 10000) * 100
        //         }%] rounded-full bg-amber-300"
        //       ></div>`;
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Failed to Order",
        text: "Failed to Order",
        confirmButtonColor: "#000",
      });
    }
  };

  useEffect(() => {
    // document.getElementById("indicator").innerHTML = `
    //           <div
    //             className="w-[30%] rounded-full bg-amber-300"
    //           ></div>`;
  }, [user]);

  return (
    <main className="">
      <Navbar
        user={user}
        cart={cart}
        addToCart={addToCart}
        minToCart={minToCart}
      />

      <div className="min-h-svh flex flex-col gap-6 justify-center items-center px-10 md:px-20 py-10 bg-amber-300/30">
        <div className="w-full flex flex-col justify-center items-center text-center gap-4 bg-white rounded-2xl shadow-lg p-10 md:px-24 md:py-24">
          <div className="w-44 aspect-square rounded-full bg-black/20"></div>
          <h2 className="poppins-black text-black poppins-semibold text-2xl">
            {user.name}
          </h2>
          <p className="poppins-medium text-lg">
            Ayo perbanyak transaksi untuk kumpulkan poin!
          </p>
          {openDonate ? (
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <div className="w-full flex flex-row justify-center items-center gap-2">
                <button
                  onClick={() => setDonate((prev) => (prev > 0 ? prev - 1 : 0))}
                  className={`bg-black/20 text-black p-2 rounded-lg cursor-pointer`}
                >
                  <Minus />
                </button>
                <p id={`counter-donate`} className={`flex-1 text-center`}>
                  {donate}
                </p>
                <button
                  onClick={() => setDonate((prev) => prev + 1)}
                  className={`bg-black text-white p-2 rounded-lg cursor-pointer`}
                >
                  <Plus />
                </button>
                <button
                  onClick={() => setDonate(user.points)}
                  className={`bg-black text-white p-2 rounded-lg cursor-pointer`}
                >
                  Max
                </button>
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setOpenDonate(false)}
                  className="poppins-semibold w-1/2 flex gap-4 items-center justify-center border-2 border-black rounded-xl text-center px-6 py-2 text-black"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDonate}
                  className="poppins-semibold w-1/2 flex gap-4 items-center justify-center bg-black rounded-xl text-center px-6 py-2 text-white"
                >
                  Donate
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setOpenDonate(true)}
              className="poppins-semibold flex gap-4 bg-black rounded-xl text-center px-6 py-4 text-white"
            >
              <HandHeart /> Donate
            </button>
          )}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-xl flex items-center gap-2 w-full text-start">
                <Crown /> Explorer
              </h3>
              <h3 className="font-bold text-xl text-end flex items-center">
                {totalDonation} Points
              </h3>
            </div>
            <div
              id="indicator"
              className="overflow-hidden w-full border-2 border-black rounded-xl h-4 flex"
            >
              <div
                className={`w-[${totalPresent}%] h-4 rounded-full bg-amber-300`}
              ></div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center border-2 border-black gap-0 rounded-2xl bg-amber-300 px-8 py-4">
            <div className="w-1/2 flex flex-col justify-center items-center gap-2 border-r-2 border-r-white">
              <h4 className="poppins-medium flex gap-2 text-lg">
                <Coins /> Gree Point
              </h4>
              <h3 className="poppins-bold text-lg">{user.points} points</h3>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center gap-2">
              <h4 className="poppins-medium flex gap-2 text-lg">
                <HandHeart /> Total donation
              </h4>
              <h3 className="poppins-bold text-lg">
                {user.donations != undefined ? user.donations.length : "0"}
              </h3>
            </div>
          </div>
          <p className="poppins-medium text-lg">Rp. 1.000 = 1 points</p>
        </div>
      </div>

      <div className="min-h-svh flex flex-col gap-6 justify-center items-center px-10 md:px-20 py-10 bg-amber-300/30">
        <div className="w-full flex flex-col justify-center items-center text-center gap-4 bg-white rounded-2xl shadow-lg p-10 md:px-24 md:py-12">
          <h2 className="poppins-black text-black poppins-semibold text-2xl">
            Donation History
          </h2>

          <div className="w-full flex flex-col gap-2 justify-center items-stretch">
            {user && user.donations ? (
              user.donations.map((item) => (
                <div className="w-full shadow-lg flex justify-between border-2 border-black hover:bg-amber-300/30 rounded-2xl px-8 py-4">
                  <h3 className="poppins-bold text-lg">{item.point} Points</h3>
                  <p className="poppins-medium text-base">{item.$createdAt}</p>
                </div>
              ))
            ) : (
              <div className="w-full shadow-lg flex justify-between border-2 border-black rounded-2xl px-8 py-4">
                <h3 className="poppins-bold text-lg">
                  Anda belum pernah donasi{" "}
                  <span className="text-[1px]">Kasian banget si</span>
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <FixedContact />
      <Footer />
    </main>
  );
}
