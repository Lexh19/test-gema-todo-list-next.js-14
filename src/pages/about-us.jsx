import Head from "next/head";
import LayoutFirst from "@/components/layouts/layout.first";

const AboutUsPage = () => {
  return (
    <>
      <Head>
        <title>Tentang Kami | To do lists</title>
      </Head>
      <LayoutFirst>
        <p className="text-4xl font-bold text-center">Tentang Kami</p>
        <div className="flex justify-center px-10 mt-5">
          <div className="text-xl">
            <p>
              To do list adalah platform yang dirancang untuk memudahkan pengguna dalam mencatat dan mengelola tugas harian dengan efisien. Kami percaya bahwa dengan menyederhanakan proses perencanaan dan pelaksanaan, setiap orang dapat mencapai lebih banyak dalam hidup mereka.
            </p>
            <p className="mt-4">
              Dengan antarmuka yang intuitif dan fokus pada kegunaan serta kecepatan, kami tidak hanya menyediakan alat untuk mencatat to-do list, tetapi juga menjadi mitra yang andal dalam mengatur setiap langkah menuju pencapaian tujuan. Todos Now membantu memastikan setiap detail penting diperhatikan dalam perjalanan meraih sukses pribadi maupun profesional.
            </p>
            <p className="mt-4">
              Tim kami terdiri dari individu berpengalaman dan berdedikasi dalam menciptakan solusi teknologi yang bermanfaat. Kami berkomitmen untuk terus mengembangkan platform ini agar selalu memenuhi kebutuhan dan harapan pengguna. Bersama Todos Now, mari wujudkan masa depan yang lebih terorganisir dan produktif, satu langkah pada satu waktu.
            </p>
          </div>
        </div>
      </LayoutFirst>
    </>
  );
};

export default AboutUsPage;
