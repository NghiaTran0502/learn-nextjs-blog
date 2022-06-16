import Head from "next/head";

const NhuanPhatStaticSlug = ({ data }: any) => {
  return (
    <>
      {" "}
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
        <div>{data.content}</div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const nhanPhatData = await fetch(
    `https://gateway.kientrucnhuanphat.vn/cms/post/fengshui?number=1&size=4`
  );
  const data = await nhanPhatData.json();
  return {
    paths: data.data.map((item: any) => ({
      params: { slug: item.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: any) => {
  console.log("Slug::::", params.slug);
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

export default NhuanPhatStaticSlug;
