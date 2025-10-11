import { useEffect, useState } from "react";

export default function Product({ product, cart, addToCart, minTocart }) {
  const [findCart, setFindCart] = useState({});

  useEffect(() => {
    const find = cart.find((c) => c.product_id == product.$id);
    setFindCart(find);
  }, [cart, product.$id]);

  return (
    <div className="min-w-40 flex flex-col gap-2 bg-white border-black/6 hover:scale-[1.05] border-2 p-4 rounded-3xl transition">
      <div className="bg-black/20 rounded-xl w-full aspect-square"></div>
      <div className="flex justify-start items-center gap-2">
        <h4 className="text-black/60">50%</h4>
        <h4 className="text-black/30 line-through text-[14px]">Rp. 30.000</h4>
      </div>
      <h3 className="poppins-semibold">{product.product_name}</h3>
      <h4 className="poppins-regular">{product.price}</h4>
      <div className="flex gap-2 items-center w-full">
        <button
          onClick={() => addToCart(product.$id)}
          className={`w-full ${
            findCart ? "hidden" : "flex"
          } bg-black text-white p-2 rounded-lg items-center gap-2 text-sm justify-center cursor-pointer`}
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
          Tambah
        </button>
        <button
          onClick={() => minTocart(product.$id)}
          className={`bg-black/20 text-black p-2 rounded-lg cursor-pointer ${
            findCart ? "" : "hidden"
          }`}
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
          id={`counter-${product.$id}`}
          className={`flex-1 text-center ${findCart ? "" :"hidden"}`}
        >
          {findCart && findCart.quantity}
        </p>
        <button
          onClick={() => addToCart(product.$id)}
          className={`bg-black text-white p-2 rounded-lg cursor-pointer ${
            findCart ? "" : "hidden"
          }`}
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
  );
}
