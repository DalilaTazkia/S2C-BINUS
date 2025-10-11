import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";

export default function Footer() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center text-center gap-4 bg-amber-300 rounded-2xl shadow-lg p-10 md:px-24 md:py-6">
      <img src={logo} alt="" className="w-full md:w-1/4" />

      <div className="w-2/4 flex flex-row justify-between items-start gap-2">
        <Link className="text-black text-base poppins-semibold" to={"/"}>
          Home
        </Link>
        <Link
          className="text-black text-base poppins-semibold"
          to={"/donation"}
        >
          Donation
        </Link>
        <Link
          className="text-black text-base poppins-semibold"
          to={"/marketplace"}
        >
          Marketplace
        </Link>
        <Link className="text-black text-base poppins-semibold" to={"/about"}>
          About
        </Link>
      </div>
      <p className="w-1/4">&copy; Copyright by Gree 2025</p>
    </div>
  );
}
