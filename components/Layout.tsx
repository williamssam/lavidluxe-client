import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="absolute top-0 right-0 z-50 flex w-full items-center justify-between bg-transparent px-3 py-3 text-gray-900 md:px-6">
        <button className="hidden md:block">
          <p>hamburger</p>
        </button>

        <h1 className="font-oswald text-2xl font-bold uppercase text-gray-600">
          <Link href="/">Lavidluxe</Link>
        </h1>

        <button className="group flex items-center gap-2 py-1 px-2 text-main transition-all hover:bg-main hover:text-white">
          <ShoppingBagIcon
            className="h-5 w-5 text-main group-hover:text-white"
            aria-hidden="true"
          />
          <p className="hidden text-xs font-bold uppercase tracking-[4px] md:block">
            cart
          </p>
          <p className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-main text-xs font-bold group-hover:border-white">
            2
          </p>
        </button>
      </header>

      {children}
    </>
  );
};
