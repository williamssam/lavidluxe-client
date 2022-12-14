import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lavidluxe - HomePage</title>
      </Head>

      <main className="flex min-h-screen items-center">
        <h2 className="text-gray-400">Welcome to our homepage.</h2>
        <Link
          href="/store/all"
          className="mx-6 bg-[#333333] py-4 px-10 text-[0.7rem] font-bold uppercase tracking-[5px] text-white"
        >
          Start shopping now
        </Link>
      </main>
    </>
  );
}
