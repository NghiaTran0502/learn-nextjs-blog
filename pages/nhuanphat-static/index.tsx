import Link from "next/link";

const NhuanPhatStatic = ({ news }: any) => {
  return (
    <>
      {news.map((item: any) => (
        <Link href={`/nhuanphat-static/${item.slug}`}>
          <a>{item.title}</a>
        </Link>
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const nhanPhatData = await fetch(
    `https://gateway.kientrucnhuanphat.vn/cms/post/fengshui?number=1&size=4`
  );
  const data = await nhanPhatData.json();
  console.log(data);
  return {
    props: {
      news: data.data,
    },
  };
};

export default NhuanPhatStatic;
