import React, { useEffect, useState } from "react";
import { Product } from ".";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

interface PropType {
  header?: string;
  productList?: ProductType[];
  isCategorySection?: boolean;
}

const ProductList: React.FC<PropType> = ({
  header,
  productList,
  isCategorySection,
}) => {
  const [products, setProducts] = useState<ProductType[]>(productList || []);

  const [sortMethod, setSortMethod] = useState<string>("Sort: Newest first");

  const [showsortOptions, setShowsortOptions] = useState<boolean>(false);

  const sortByIncreasingName = () => {
    if (productList) {
      const arrayToSort = [...productList];
      return arrayToSort.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA > titleB) {
          return 1;
        }
        if (titleA < titleB) {
          return -1;
        }
        return 0;
      });
    }
  };

  const sortByDecreasingName = () => {
    if (productList) {
      const arrayToSort = [...productList];
      return arrayToSort.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }
        return 0;
      });
    }
  };

  const sortByIncreasingPrice = () => {
    if (productList) {
      const arrayToSort = [...productList];
      return arrayToSort.sort((a, b) => a.price - b.price);
    }
  };

  const sortByDecreasingPrice = () => {
    if (productList) {
      const arrayToSort = [...productList];
      return arrayToSort.sort((a, b) => b.price - a.price);
    }
  };

  const sortOptions = [
    {
      label: "Name: A-Z",
      method: sortByIncreasingName,
    },
    {
      label: "Name: Z-A",
      method: sortByDecreasingName,
    },
    {
      label: "Price: Low-High",
      method: sortByIncreasingPrice,
    },
    {
      label: "Price: High-Low",
      method: sortByDecreasingPrice,
    },
  ];

  useEffect(() => {
    if (productList) {
      setProducts(productList);
    }
  }, [productList]);

  const toggleSortOptions = () => {
    setShowsortOptions((prevState) => !prevState);
  };

  const sortProducts = (optionIndex: number) => {
    if (productList) {
      setShowsortOptions(false);
      setSortMethod(sortOptions[optionIndex].label);
      const sortedList = sortOptions[optionIndex].method();
      if (sortedList) {
        console.log(sortedList);

        setProducts(sortedList);
      }
    }
  };

  return (
    <div className="w-full my-16 px-5 lg-list:px-5vw xl-list:px-10vw 2xl-list:px-15vw mb-20">
      <div className="mb-4 md-list:mb-8 flex flex-col md-list:flex-row md-list:justify-between md-list:items-center">
        <h2
          className="relative after:content-[''] after:absolute after:-bottom-1 after:block after:w-10 after:h-1 md:after:mt-2 after:bg-purple uppercase tracking-wider"
          style={{ wordSpacing: "0.25em" }}
        >
          {header}
        </h2>

        {isCategorySection && (
          <div className="w-[150px] self-end mt-1 md-list:mt-0 mr-3 ml:auto relative">
            <div
              className="w-full py-1 px-2 flex items-center text-sm text-gray-600 bg-neutral-200 rounded cursor-pointer"
              onClick={toggleSortOptions}
            >
              <span>{sortMethod}</span>
              {showsortOptions ? (
                <FiChevronUp className="ml-auto" />
              ) : (
                <FiChevronDown className="ml-auto" />
              )}
            </div>

            {showsortOptions && (
              <ul
                className={`w-full absolute left-0 top-[120%] text-[0.8rem] bg-white border border-slate-300 rounded-md divide-y overflow-hidden transition-all animate-slideY`}
              >
                {sortOptions.map((option, index) => {
                  return (
                    <li
                      className="py-1 px-2 text-slate-600 cursor-pointer"
                      onClick={() => sortProducts(index)}
                    >
                      {option.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-2 sm-list:grid-cols-3 md-list:grid-cols-4 gap-x-1 gap-y-7">
        {products &&
          products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
      </div>
    </div>
  );
};

export default ProductList;
