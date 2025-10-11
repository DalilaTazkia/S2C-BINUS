import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FixedContact from "../components/FixedContact";
import { MessageCircle } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import Product from "./../components/Product";

export default function Home({ products, user, cart, addToCart, minToCart }) {
  return (
    <main className="">
      <Navbar
        user={user}
        cart={cart}
        addToCart={addToCart}
        minToCart={minToCart}
      />

      <div className="bg-radial-[at_50%_75%] from-amber-300 to-amber-300/0 to-90% w-auto h-auto flex justify-center items-start py-24">
        <div className="flex flex-col w-4/5 justify-center items-center gap-4">
          <h1 className="poppins-black text-5xl md:text-6xl text-center">
            Fresh <span className="text-white">From Farmers</span>,<br />{" "}
            Straight <span className="text-white">to You.</span>
          </h1>

          <p className="poppins-semibold text-lg md:text-xl text-center">
            Empowering local farmers through digital cooperatives - dicover
            fresh,
            <br /> organic produce and support sustainable agriculture with
            every purchase
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center px-20 py-10 bg-amber-300/30">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="font-semibold text-black poppins-semibold text-xl">
            Flash Sale
          </h3>
          <CountdownTimer />
        </div>

        <div
          id="flashsale-list"
          className="w-full flex justify-start items-center py-4 gap-4 overflow-x-auto"
        >
          {products &&
            products.map((product) => (
              <Product
                key={product.$id}
                cart={cart}
                product={product}
                addToCart={addToCart}
                minTocart={minToCart}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center px-20 py-10 bg-amber-300">
        <div className="w-full flex flex-row justify-start items-center">
          <h3 className="font-semibold text-black poppins-semibold text-xl">
            Vegetables
          </h3>
        </div>

        <div
          id="flashsale-list"
          className="w-full flex justify-start items-center py-4 gap-4 overflow-x-auto"
        >
          {products &&
            products.map((product) => (
              <Product
                key={product.$id}
                cart={cart}
                product={product}
                addToCart={addToCart}
                minTocart={minToCart}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center px-20 py-10 bg-amber-300/30">
        <div className="w-full flex flex-row justify-start items-center">
          <h3 className="font-semibold text-black poppins-semibold text-xl">
            Fruits
          </h3>
        </div>

        <div
          id="flashsale-list"
          className="w-full flex justify-start items-center py-4 gap-4 overflow-x-auto"
        >
          {products &&
            products.map((product) => (
              <Product
                key={product.$id}
                cart={cart}
                product={product}
                addToCart={addToCart}
                minTocart={minToCart}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center px-20 py-10 bg-amber-300">
        <div className="w-full flex flex-row justify-start items-center">
          <h3 className="font-semibold text-black poppins-semibold text-xl">
            Promo Hari Ini
          </h3>
        </div>

        <div
          id="flashsale-list"
          className="w-full flex justify-start items-center py-4 gap-4 overflow-x-auto"
        >
          {products &&
            products.map((product) => (
              <Product
                key={product.$id}
                cart={cart}
                product={product}
                addToCart={addToCart}
                minTocart={minToCart}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center px-10 md:px-20 py-10 bg-amber-300/30">
        <div className="w-full flex flex-col justify-center items-center text-center gap-4 bg-amber-300 rounded-2xl shadow-lg p-10 md:px-24 md:py-24">
          <h2 className="poppins-black text-black poppins-semibold text-5xl">
            Get in Touch
          </h2>
          <p className="poppins-semibold text-xl">
            Have questions, partnership ideas, or just want to say hi? <br />
            We'd love to hear from you - connect with the Gree team today!
          </p>
          <button className="poppins-semibold flex gap-4 bg-black rounded-lg px-6 py-2 text-white">
            <MessageCircle /> WhatsApp
          </button>
        </div>
      </div>
      <FixedContact />
      <Footer />
    </main>
  );
}
