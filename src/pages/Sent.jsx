import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FixedContact from "../components/FixedContact";
import {
    Box,
    HandHeart,
    HelpCircle,
    LogOut,
    MessageCircle,
    Pen,
    Receipt,
    Truck,
} from "lucide-react";
import Swal from "sweetalert2";

export default function Sent({
    user,
    cart,
    addToCart,
    minToCart,
}) {

    return (
        <main className="">
            <Navbar
                user={user}
                cart={cart}
                addToCart={addToCart}
                minToCart={minToCart}
            />

            <div className="min-h-svh flex flex-col gap-6 justify-center items-center px-10 md:px-20 py-10 bg-amber-300/30">
                <div className="w-1/2 flex flex-col justify-center items-center text-center gap-4 bg-white rounded-2xl shadow-lg p-10 md:px-24 md:py-24">
                    <div className="w-44 aspect-square rounded-full bg-black/20"></div>
                    <h2 className="poppins-black text-black poppins-semibold text-2xl">
                        {user.name}
                    </h2>
                    <p className="poppins-semibold text-xl">{user.email}</p>
                    <p className="poppins-semibold text-base">
                        Joined at {user.$createdAt}
                    </p>
                    <div className="grid grid-cols-3 justify-between gap-2">
                        <Link
                            to={"#"}
                            className="w-full poppins-semibold flex flex-col justify-center items-center gap-4 bg-black rounded-xl text-center px-6 py-4 text-white"
                        >
                            <Box /> Dikemas
                        </Link>
                        <Link
                            to={"#"}
                            className="w-full poppins-semibold flex flex-col justify-center items-center gap-4 bg-black rounded-xl text-center px-6 py-4 text-white"
                        >
                            <Truck /> Dikirim
                        </Link>
                        <Link
                            to={"#"}
                            className="w-full poppins-semibold flex flex-col justify-center items-center gap-4 bg-black rounded-xl text-center px-6 py-4 text-white"
                        >
                            <Receipt /> Diterima
                        </Link>
                    </div>
                    <Link
                        to={"#"}
                        className="w-full poppins-semibold flex gap-4 bg-black/60 rounded-xl text-center px-6 py-4 text-white"
                    >
                        <Pen /> Edit Account
                    </Link>
                    <Link
                        to={"/donation"}
                        className="w-full poppins-semibold flex gap-4 bg-black rounded-xl text-center px-6 py-4 text-white"
                    >
                        <HandHeart /> Donation
                    </Link>
                    <Link
                        to={"#"}
                        className="w-full poppins-semibold flex gap-4 bg-black/60 rounded-xl text-center px-6 py-4 text-white"
                    >
                        <HelpCircle /> Help
                    </Link>
                    <button
                        onClick={handleLogOut}
                        className="w-full poppins-semibold flex gap-4 border-black border-2  rounded-xl text-center px-6 py-4"
                    >
                        <LogOut /> Log Out
                    </button>
                </div>
            </div>

            <FixedContact />
            <Footer />
        </main>
    );
}
