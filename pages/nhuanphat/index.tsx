import Link from "next/link";

const NhuanPhat = ({ news }: any) => {
  return (
    <>
      {news.map((item: any) => (
        <div key={item.id}>
          <Link href={`/nhuanphat/${item.slug}`}>
            <a>{item.title}</a>
          </Link>
        </div>
      ))}
      <div>NhuanPhat</div>
    </>
  );
};

export async function getServerSideProps() {
  const nhanPhatData = await fetch(
    `https://gateway.kientrucnhuanphat.vn/cms/post/fengshui`
  );
  const data = await nhanPhatData.json();
  console.log(data);
  return {
    props: {
      news: data.data,
    },
  };
}

export default NhuanPhat;
