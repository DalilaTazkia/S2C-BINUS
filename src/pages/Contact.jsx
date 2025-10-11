import FixedContact from "../components/FixedContact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Contact({ user, cart, addToCart, minToCart }) {
  return (
    <main className="">
      <Navbar user={user} cart={cart} addToCart={addToCart} minToCart={minToCart} />

      <FixedContact />
      <Footer />
    </main>
  );
}
