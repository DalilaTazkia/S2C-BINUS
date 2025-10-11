import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import FixedContact from "../components/FixedContact";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const account = new Account(client);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultLogin = await account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      if (resultLogin) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-svw h-svh flex justify-center items-center bg-white">
      <form
        method="POST"
        onSubmit={handleLogin}
        className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-lg flex flex-col justify-center gap-6"
      >
        <h2 className="poppins-bold text-center text-xl">Login</h2>

        <div className="flex flex-col gap-2 justify-center items-stretch">
          <label htmlFor="email" className="poppins-semibold">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="px-4 py-2 rounded-lg outline-none bg-black/10 poppins-normal"
          />
        </div>

        <div className="flex flex-col gap-2 justify-center items-stretch">
          <label htmlFor="password" className="poppins-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="px-4 py-2 rounded-lg outline-none bg-black/10 poppins-normal"
          />{" "}
        </div>

        <div className="flex flex-col gap-2 justify-center items-stretch">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg outline-none bg-amber-300 poppins-semibold text-black text-center"
          >
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-600" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </form>

      <FixedContact />
    </main>
  );
}
