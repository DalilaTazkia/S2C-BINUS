import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart({
  cart,
  setOpen,
  addToCart,
  minToCart,
}) {
  return (
    <div
      className={`fixed top-20 right-10 w-72 px-6 py-2 bg-white border-2 border-black/6 rounded-xl`}
    >
      <div className="flex w-full justify-between items-center">
        <h2 className="text-center poppins-semibold">Cart</h2>
        <button className="px-4 py-2 hover:bg-black/6 rounded-lg" onClick={() => setOpen(false)}>
          <X />
        </button>
      </div>
      <div className="flex flex-col justify-center items-stretch gap-2">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.$id} className="w-full flex justify-center items-center gap-2">
              <div className="bg-black/20 rounded-xl w-1/5 aspect-square"></div>

              <div className="w-2/5 flex flex-col gap-2 justify-start items-start">
                <h3 className="poppins-semibold">{item.product_name}</h3>
                <p>{item.price}</p>
              </div>

              <div className="flex gap-2 items-center w-2/5">
                <button
                  onClick={() => minToCart(item.product_id)}
                  className={`bg-black/20 text-black p-2 rounded-lg cursor-pointer`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-minus-icon lucide-minus"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <p
                  id={`counter-${item.product_id}`}
                  className={`flex-1 text-center`}
                >
                  {item.quantity}
                </p>
                <button
                  onClick={() => addToCart(item.product_id)}
                  className={`bg-black text-white p-2 rounded-lg cursor-pointer`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-plus-icon lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="poppins-italic">Cart is empty</p>
        )}

        {
            cart.length > 0 && (
                <Link to={"/checkout"} className="px-6 py-2 bg-black text-white poppins-semibold text-center rounded-lg w-full">Checkout</Link>
            )
        }
      </div>
    </div>
  );
}
