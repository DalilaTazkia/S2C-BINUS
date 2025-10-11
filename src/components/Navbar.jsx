import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import { Menu, PersonStanding, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import Cart from "./Cart";

export default function Navbar({ user, cart, addToCart, minToCart }) {
  const [isNavbarOpen, setIsNavBarOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <header className="bg-white md:bg-transparent sticky top-0 z-40 flex flex-wrap md:flex-nowrap justify-between gap-2 items-center px-6 py-2 shadow-lg border-b-2 border-b-black/20 md:border-b-0 md:shadow-none">
      <Link to={"/"} className="w-1/4">
        <img src={logo} alt="" className="w-24 md:w-44" />
      </Link>

      <div
        className={`order-3 md:order-0 ${
          isNavbarOpen ? "flex" : "hidden md:flex"
        } w-full sm:w-2/4 md:flex-none flex-col md:flex-row justify-evenly items-center gap-4 py-6 md:py-0`}
      >
        <Link
          to={"/"}
          className="w-full text-center px-6 py-2 text-black/40 hover:text-black font-semibold poppins-semibold"
        >
          Home
        </Link>
        <Link
          to={"/marketplace"}
          className="w-full text-center px-6 py-2 text-black/40 hover:text-black font-semibold poppins-semibold"
        >
          Marketplace
        </Link>
        <Link
          to={"/donation"}
          className="w-full text-center px-6 py-2 text-black/40 hover:text-black font-semibold poppins-semibold"
        >
          Donation
        </Link>
        <Link
          to={"/about"}
          className="w-full text-center px-6 py-2 text-black/40 hover:text-black font-semibold poppins-semibold"
        >
          About
        </Link>
      </div>

      <div className="w-auto md:w-1/4 flex gap-2 md:gap-4 justify-end items-center">
        {!user ? (
          <>
            <Link
              to={"/login"}
              className={`px-6 py-2 text-black/40 hover:text-black rounded-full poppins-semibold`}
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className={`px-6 py-2 bg-amber-300 rounded-full poppins-semibold hover:scale-105 transition`}
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setOpenCart(true)}
              className={`md:block px-2 py-2 text-black/40 hover:text-black rounded-full poppins-semibold cursor-pointer`}
            >
              <ShoppingCart />
            </button>
            <Link
              to={"/account"}
              className={`md:block px-2 py-2 text-black/40 hover:text-black rounded-full poppins-semibold`}
            >
              Account
            </Link>
          </>
        )}

        <button
          onClick={() => setIsNavBarOpen((prev) => !prev)}
          className="block md:hidden px-2 py-2 rounded-xl text-black/40 hover:text-black cursor-pointer"
        >
          {isNavbarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {openCart && (
        <Cart
          cart={cart}
          setOpen={setOpenCart}
          addToCart={addToCart}
          minToCart={minToCart}
        />
      )}
    </header>
  );
}
