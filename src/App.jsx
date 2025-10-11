import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import { useEffect, useState } from "react";
import { Client, TablesDB, Account, Query } from "appwrite";
import Checkout from "./pages/Checkout.jsx";
import AccountE from "./pages/Account.jsx";
import Donation from "./pages/Donation.jsx";
import Swal from "sweetalert2";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const tablesDB = new TablesDB(client);
  const account = new Account(client);

  const fetchProducts = async () => {
    try {
      const result = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
      });

      if (result) {
        console.log(result);
        setProducts(result.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const user = await account.get();

      const result = await tablesDB.getRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        rowId: user.$id,
        queries: [
          Query.select(["*", "locations.*", "orders.*", "donations.*"]),
        ],
      });

      if (result) {
        console.log(result);
        setUser(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {};

  const handleLogOut = async () => {
    try {
      await account.deleteSession("current");
      Swal.fire({
        icon: "success",
        title: "Success to LogOut",
        text: "Success to LogOut",
        confirmButtonColor: "#000",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:5173";
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      setCart([]);
    }
  };

  const handleAddToCart = (product_id) => {
    const findCart = cart.find((c) => c.product_id == product_id);
    if (findCart) {
      const filterCart = cart.filter((c) => c.product_id != product_id);
      let newCart = [
        ...filterCart,
        {
          ...findCart,
          total_price: (findCart.quantity + 1) * findCart.price,
          quantity: ++findCart.quantity,
        },
      ];
      setCart(newCart);
    } else {
      const findProduct = products.find((p) => p.$id == product_id);
      setCart((prev) => [
        ...prev,
        {
          product_id: product_id,
          product_name: findProduct.product_name,
          price: findProduct.price,
          quantity: 1,
          total_price: findProduct.price,
        },
      ]);
    }
  };

  const handleMinToCart = (product_id) => {
    const findCart = cart.find((c) => c.product_id == product_id);
    const filterCart = cart.filter((c) => c.product_id != product_id);

    if (findCart.quantity - 1 > 0) {
      let newCart = [
        ...filterCart,
        {
          ...findCart,
          total_price: (findCart.quantity - 1) * findCart.price,
          quantity: --findCart.quantity,
        },
      ];
      setCart(newCart);
    } else {
      setCart(filterCart);
    }
  };

  useEffect(() => {
    getUser();
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(cart);
    console.log(user);
  }, [cart]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              user={user}
              cart={cart}
              addToCart={handleAddToCart}
              minToCart={handleMinToCart}
            />
          }
        />
        <Route
          path="/account"
          element={
            <AccountE
              user={user}
              cart={cart}
              addToCart={handleAddToCart}
              minToCart={handleMinToCart}
              onLogOut={handleLogOut}
            />
          }
        />
        <Route
          path="/donation"
          element={
            <Donation
              user={user}
              cart={cart}
              addToCart={handleAddToCart}
              minToCart={handleMinToCart}
              getUser={getUser}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/marketplace"
          element={
            <Marketplace
              products={products}
              cart={cart}
              addToCart={handleAddToCart}
              minToCart={handleMinToCart}
              user={user}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              user={user}
              cart={cart}
              addToCart={handleAddToCart}
              minToCart={handleMinToCart}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              user={user}
              cart={cart}
              addToCart={handleAddToCart}
              minToCart={handleMinToCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout user={user} cart={cart} setCart={setCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
