import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main className="w-svw h-svh flex justify-center items-center bg-white">
      <form
        method="POST"
        className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-lg flex flex-col justify-center gap-6"
      >
        <h2 className="poppins-bold text-center text-xl">Register</h2>

        <div className="flex flex-col gap-2 justify-center items-stretch">
          <label htmlFor="name" className="poppins-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder="Your username"
            className="px-4 py-2 rounded-lg outline-none bg-black/10 poppins-normal"
          />
        </div>

        <div className="flex flex-col gap-2 justify-center items-stretch">
          <label htmlFor="email" className="poppins-semibold">
            Email
          </label>
          <input
            type="email"
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
            Already have an account?{" "}
            <Link className="text-blue-600" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </form>

      <FixedContact />
    </main>
  );
}
