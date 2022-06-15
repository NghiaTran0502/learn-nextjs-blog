import Head from "next/head";

const PhongThuy = ({ data }: any) => {
  return (
    <>
      <div>PhongThuy</div>
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" content={data.title} />
        <meta
          property="og:image"
          content={`https://gateway.kientrucnhuanphat.vn/${data.imagePath}`}
        />
        <meta property="og:description" content={data.subTitle} />
      </Head>
      <div>
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {
  console.log("Params:::", params.slug);
  const res = await fetch(
    `https://gateway.kientrucnhuanphat.vn/cms/post/slug?slug=${params.slug}`
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};

export default PhongThuy;
