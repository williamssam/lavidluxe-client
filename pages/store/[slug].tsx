import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Filter } from "../../components/Filter";
import { StoreLayout } from "../../components/StoreLayout";

const Store = () => {
  const products = [
    {
      id: 1,
      name: "The skinny in stone pony",
      price: 175,
      image:
        "http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-2.jpg",
    },
    {
      id: 2,
      name: "The skinny in stone pony",
      price: 175,
      image:
        "http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-2.jpg",
    },
    {
      id: 3,
      name: "The skinny in stone pony",
      price: 325,
      image:
        "http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-7.jpg",
    },
    {
      id: 4,
      name: "The skinny in stone pony",
      price: 125,
      image:
        "http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-4.jpg",
    },
  ];
  const [column, setColumn] = useState(2);

  return (
    <>
      <Head>
        <title>Lavidluxe - Store</title>
      </Head>

      <main className="min-h-screen px-3 py-10 md:p-20 md:px-10">
        {/* <p>Store</p> */}

        <StoreLayout>
          <Filter setColumn={setColumn} column={column} />
          {/* products */}
          <div
            className={`grid grid-cols-1 gap-x-5 gap-y-10 pt-3 transition-all sm:grid-cols-2 ${
              column === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            }`}
          >
            {products?.map((product) => (
              <Link
                href="/store/details"
                key={product.id}
                className="group transition-colors"
              >
                {/* <Image
								alt='product image'
								src='http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-7.jpg'
								className='object-cover'
								width={500}
								height={500}
							/> */}
                <img
                  src="http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-4.jpg"
                  alt=""
                />
                <div className="text-center">
                  <p className="pt-6 text-[0.63rem] font-semibold uppercase tracking-[2px] text-[#333333] group-hover:text-blue-700 md:text-xs md:tracking-[4px]">
                    The skinny in stone pony
                  </p>
                  <p className="pt-2 text-xs text-[#8c8c8c]">$ 175.00</p>
                </div>
              </Link>
            ))}
          </div>
        </StoreLayout>
      </main>
    </>
  );
};
export default Store;
