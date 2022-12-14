import Link from "next/link";
import { useRouter } from "next/router";

export const Tabs = () => {
  const tabs = [
    {
      id: 1,
      name: "All",
      href: "/store/all",
      slug: "all",
    },
    {
      id: 2,
      name: "Female Wears",
      href: "/store/female-wears",
      slug: "female-wears",
    },
    {
      id: 3,
      name: "Men Wears",
      href: "/store/men-wears",
      slug: "men-wears",
    },
    {
      id: 4,
      name: "Handbags",
      href: "/store/handbags",
      slug: "handbags",
    },
    {
      id: 5,
      name: "Unisex Footwears",
      href: "/store/unisex-footwears",
      slug: "unisex-footwears",
    },
  ];

  const router = useRouter();
  const { slug } = router.query;

  return (
    <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[0.6rem] font-semibold uppercase tracking-[3px] text-[#999999] md:mt-10 md:text-[0.69rem] lg:gap-16">
      {tabs?.map((tab) => (
        <li key={tab.id}>
          <Link
            href={tab.href}
            className={`relative transition-all hover:text-blue-600 ${
              slug === tab.slug ? "text-main" : "text-[#8c8c8c]"
            } ${
              slug === tab.slug
                ? "after:absolute after:-bottom-2 after:left-1/2 after:h-[1px] after:w-4 after:-translate-x-1/2 after:bg-main hover:text-main md:after:-bottom-3"
                : ""
            }`}
          >
            {tab.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
