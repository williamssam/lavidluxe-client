import { Dispatch, SetStateAction } from "react";
import { GridColumnThree } from "../assets/icon/GridColumnThree";
import { GridColumnTwo } from "../assets/icon/GridColumnTwo";
import { Select } from "./Select";

type FilterProps = {
  setColumn: Dispatch<SetStateAction<number>>;
  column: number;
};

export const Filter = ({ setColumn, column }: FilterProps) => {
  const sort = [
    "Default sorting",
    "Latest",
    "Price: low to high",
    "Price: high to low",
  ];
  return (
    <section className="flex items-center justify-end pt-10 md:pt-20">
      {/* <form>
        <label className="bg-gray-300">
          <input type="search" name="search" id="search" />
        </label>
      </form> */}

      <div className="flex items-center gap-10">
        <div className="hidden items-center justify-center gap-4 text-xs tracking-[3px] sm:flex">
          <button
            title="Two column"
            className={`px-2 py-[0.15rem] transition-all ${
              column === 3
                ? "bg-gray-300 text-gray-400 hover:bg-main/80 hover:text-gray-200"
                : "bg-main text-white"
            }`}
            onClick={() => setColumn(2)}
          >
            <GridColumnTwo />
          </button>
          <button
            title="Three column"
            className={`px-2 py-[0.15rem]  transition-all ${
              column === 2
                ? "bg-gray-300 text-gray-500 hover:bg-main/80 hover:text-gray-200"
                : "bg-main text-white"
            }`}
            onClick={() => setColumn(3)}
          >
            <GridColumnThree />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <h3 className="font-bold uppercase tracking-[2px] text-gray-500">
            Sort by:
          </h3>
          <Select data={sort} />
        </div>
      </div>
    </section>
  );
};
