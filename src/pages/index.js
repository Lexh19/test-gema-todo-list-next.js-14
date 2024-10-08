import LayoutFirst from "@/components/layouts/layout.first";
import HeaderHome from "@/components/header.home";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Beranda | To do lits</title>
      </Head>
      <LayoutFirst>
        <HeaderHome />
      </LayoutFirst>
    </>
  );
};

export default HomePage;
