import { useRouter } from "next/router";
import { useState } from "react";
import { login } from "@/modules/fetch/auth";
import Head from "next/head";
import Image from "next/image";


const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      window.localStorage.setItem("token", response.data);
      window.alert(response.message);
      router.push("/todos");
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login | To do lists</title>
      </Head>
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="absolute ml-5 mt-5 bg-blue-600 rounded-lg py-2 px-10">
            <p className="text-back" onClick={() => router.push("/")}>
            Kembali
          </p>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <Image
            className="rounded-xl"
            src={'/login.png'}
            alt="Login Illustration"
            width={400} height={100}
          />
        </div>

        
        <div className="flex justify-center items-center w-full h-screen">
          <div className="card-login bg-gray-300 rounded-xl shadow-sm shadow-slate-400 px-3 py-10">
            <form onSubmit={handleSubmit}>
              <p className="text-center text-4xl font-bold">Login</p>
              <div className="flex-row mt-10 px-5">
                <p className="text-jdl">Email</p>
                <input
                  className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                  type="email"
                  placeholder="Masukkan email anda..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-jdl mt-5">Password</p>
                <input
                  className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                  type="password"
                  placeholder="Masukkan password anda..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex flex-col justify-center items-center mt-10">
                  <button className="btn text-3xl font-bold text-white bg-green-600 rounded-lg py-3 px-28 hover:bg-green-500">
                    Login
                  </button>
                  <p className="mt-2 text-lg">
                    Belum punya akun?{" "}
                    <u
                      className="font-bold text-blue-700 cursor-pointer"
                      onClick={() => router.push("/auth/register")}
                    >
                      Daftar
                    </u>
                  </p>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
