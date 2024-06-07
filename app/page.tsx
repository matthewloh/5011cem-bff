import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  // useEffect(() => {
  //   fetch("/api/python")
  //     .then((response) => response.text())
  //     .then((responseData) => setData(responseData))
  //     .catch((error) => console.error(error));
  // }, []);
  const data = await fetch(
    "http://127.0.0.1:3000/api/python/Pulau Pinang"
  ).then((response) => response.json());
  return (
    <div>
      <h2>{data.message}</h2>
    </div>
  );
}
