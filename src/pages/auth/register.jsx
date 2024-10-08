import { register } from "@/modules/fetch/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const RegisterPage = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password);
      window.alert(response.message);
      router.push("/auth/login");
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Register | To do lits</title>
      </Head>
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="absolute ml-5 mt-5 bg-blue-600 rounded-lg py-2 px-5 md:px-10">
          <p className="text-back cursor-pointer" onClick={() => router.push("/")}>
            Kembali
          </p>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <Image
            className="rounded-xl"
            src={"/registrasi.png"}
            alt="Register Illustration"
            width={400}
            height={100}
          />
        </div>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="card-register bg-gray-300 rounded-xl shadow-sm shadow-slate-400 px-5 py-8 md:px-10 md:py-10">
            <form onSubmit={handleSubmit}>
              <p className="text-center text-3xl md:text-4xl font-bold">Register</p>
              <div className="grid grid-cols-1 md:grid-cols-2 px-3 md:px-5 mt-5 gap-5">
                <div className="flex-row">
                  <p className="text-jdl">Nama</p>
                  <input
                    className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                    type="text"
                    placeholder="Masukkan nama anda..."
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-row">
                  <p className="text-jdl">Email</p>
                  <input
                    className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                    type="email"
                    placeholder="Masukkan email anda..."
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex-row px-3 md:px-5 mt-5">
                <p className="text-jdl">Password</p>
                <input
                  className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                  type="password"
                  placeholder="Masukkan password anda..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col justify-center items-center mt-8 md:mt-10">
                <button className="btn text-2xl md:text-3xl font-bold text-white bg-green-600 rounded-lg py-2 md:py-3 px-16 md:px-28 hover:bg-green-500">
                  Register
                </button>
                <p className="mt-4 text-sm md:text-lg">
                  Sudah punya akun?{" "}
                  <u
                    className="font-bold text-blue-700 cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </u>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
