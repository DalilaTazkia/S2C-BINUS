import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";


export default function FixedContact() {
    return (
          <Link to={"#"} className="fixed z-40 bottom-10 right-10 poppins-semibold flex gap-4 rounded-full bg-white px-4 py-4 text-black shadow-lg">
            <MessageCircle />
          </Link>
    )
}