import { ArrowLeft } from "lucide-react";
import FixedContact from "../components/FixedContact";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Client, TablesDB, Query, ID } from "appwrite";
import Swal from "sweetalert2";
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default function Checkout({ user, cart, setCart }) {
  const tablesDB = new TablesDB(client);
  const navigate = useNavigate();

  let productItems = [];
  let total_price = 0;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      productItems = [];
      total_price = 0;
      for (let index = 0; index < cart.length; index++) {
        productItems.push({
          product: cart[index].product_id,
          quantity: cart[index].quantity,
          price: cart[index].price,
          subtotal_price: cart[index].total_price,
        });
        total_price += cart[index].total_price;
      }
      const resultCheckout = await tablesDB.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        rowId: user.$id,
        data: {
          ...user,
          orders: [
            ...user.orders,
            {
              total_price: total_price,
              payment_method: "transfer",
              order_status: "Dikemas",
              product_items: productItems,
              location: user.locations[0].$id,
            },
          ],
        },
      });

      if (resultCheckout) {
        setCart([]);
        console.log(resultCheckout);
        Swal.fire({
          icon: "success",
          title: "Success to Order",
          text: "Success to Order",
          confirmButtonColor: "#000",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Failed to Order!",
        text: "Failed to Order",
        confirmButtonColor: "#000",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  return (
    <main className="min-h-svh">
      <header className="bg-white sticky top-0 z-40 flex flex-wrap md:flex-nowrap justify-between gap-2 items-center px-6 py-2 shadow-lg border-b-2 border-b-black/20 md:border-b-0">
        <Link
          to={"/marketplace"}
          className="w-auto px-4 py-2 hover:bg-black/6 rounded-full"
        >
          <ArrowLeft />
        </Link>

        <h2 className="w-3/4 text-center text-xl px-6 py-2 text-black poppins-semibold">
          Checkout
        </h2>
      </header>

      <div className="flex w-full flex-col justify-center items-center gap-6 px-6 py-4">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <h3 className="text-black/60 poppins-medium">Locations</h3>
          <div className="w-full flex justify-between px-4 py-4 rounded-lg border-black/20 border-2 items-center  flex-row gap-4 bg-white shadow-lg">
            <div className="flex flex-col gap-4">
              <h3 className="poppins-semibold text-xl">
                {user && user.locations[0].location_name}
              </h3>
              <p className="poppins-medium text-lg">
                {user && user.locations[0].location_detail}
              </p>
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-lg poppins-semibold">
              Edit
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <h3 className="text-black/60 poppins-medium">Cart Items</h3>

          <div className="w-full flex flex-col justify-center item-center gap-2">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.$id} className="w-full flex justify-between items-center gap-2">
                  <div class="bg-black/20 rounded-xl w-24 md:w-44 aspect-square"></div>

                  <div className="w-full flex flex-col gap-2 justify-start items-start">
                    <h3 className="poppins-semibold">{item.product_name}</h3>
                    <p>{item.price}</p>
                  </div>

                  <p className="w-1/5 poppins-medium">x{item.quantity}</p>
                  <p className="w-1/5 text-end poppins-medium">
                    Rp. {item.total_price}
                  </p>
                </div>
              ))
            ) : (
              <p className="poppins-italic">Cart is empty</p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <h3 className="text-black/60 poppins-medium">Payment Method</h3>

          <div className="w-full flex justify-between px-4 py-4 rounded-lg border-black/20 border-2 items-center  flex-row gap-4 bg-white shadow-lg">
            <div className="flex flex-col gap-4">
              <h3 className="poppins-semibold text-xl">Transfer</h3>
              <p className="poppins-medium text-lg">******4321</p>
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-lg poppins-semibold">
              Edit
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-white sticky bottom-0 z-40 flex justify-between gap-2 items-center px-6 py-2 shadow-lg border-t-2 border-t-black/20">
        <div className="flex flex-col justify-between items-start gap-4">
          <h2 className="text-start text-xl px-6 py-2 text-black poppins-semibold">
            Total
          </h2>
          <h3 className="text-start poppins-bold text-2xl">Rp. {total}</h3>
        </div>

        <button
          onClick={handleCheckout}
          className="cursor-pointer px-6 py-2 bg-black text-white rounded-lg poppins-semibold"
        >
          Pay {total}
        </button>
      </footer>
    </main>
  );
}
