import Head from "next/head";
import LayoutFirst from "@/components/layouts/layout.first";

const AboutUsPage = () => {
  return (
    <>
      <Head>
        <title>Tentang Kami | TodosNow</title>
      </Head>
      <LayoutFirst>
        <p className="text-4xl font-bold text-center">Tentang Kami</p>
        <div className="flex justify-center px-10 mt-5">
            <p className="text-xl">Todos Now adalah platform yang didedikasikan untuk mempermudah pengguna dalam mencatat dan mengatur tugas-tugas sehari-hari secara efisien. Kami percaya bahwa dengan menyederhanakan proses perencanaan dan pelaksanaan tugas-tugas, setiap individu dapat mencapai lebih banyak dalam hidup mereka. <br />Kami menawarkan pengalaman pengguna yang jelas dan mudah dipahami, dengan fokus pada kegunaan dan kecepatan. Tujuan kami bukan hanya menyediakan alat untuk mencatat to-do list, tetapi juga untuk menjadi alat yang dapat diandalkan dalam mengorganisir setiap langkah menuju tujuan. Dengan pendekatan ini, Todos Now membantu memastikan bahwa tidak ada detail kecil pun yang terlewatkan dalam perjalanan pencapaian tujuan pribadi dan profesional Anda. <br />Tim kami terdiri dari individu yang bersemangat dan berpengalaman dalam mengembangkan solusi teknologi yang bermanfaat. Kami berkomitmen untuk terus meningkatkan platform ini agar dapat memenuhi kebutuhan dan harapan pengguna kami dengan baik. Bersama Todos Now, mari rancang masa depan yang lebih teratur dan produktif, langkah demi langkah.</p>
        </div>
      </LayoutFirst>
    </>
  );
};

export default AboutUsPage;
