/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { isSelectionCorrect, createRandomArray, getValues } from "./utils";

const MAX_SELECTIONS = 2;

const Game = ({ data }) => {
  const [arr, setArr] = useState(() => createRandomArray(data));
  const [options, setOptions] = useState([]);

  const [animate, setAnimate] = useState(false);

  const handleClick = (e) => {
    if (!e.target.dataset.id) return;
    const id = +e.target.dataset.id;
    if (options.length < MAX_SELECTIONS) {
      if (options.includes(id)) {
        setOptions((prev) => prev.filter((i) => i !== id));
      } else {
        setOptions([...options, id]);
      }
    }
  };

  useEffect(() => {
    if (options.length !== MAX_SELECTIONS) return;

    const [s1, s2] = getValues(arr, options);

    let timer;
    if (isSelectionCorrect(data, s1, s2)) {
      setAnimate(true);
      timer = setTimeout(() => {
        setArr((prev) => prev.filter((s, i) => !options.includes(i)));
        setOptions([]);
        setAnimate(false);
      }, 1000);
    } else {
      timer = setTimeout(() => {
        setOptions([]);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [options, arr, data]);

  return (
    <div
      onClick={handleClick}
      className="flex gap-3 m-4 p-4 border flex-wrap justify-center items-center"
    >
      {arr.length > 0 ? (
        arr.map((item, ind) => {
          const isSelected = options.includes(ind);
          const isCorrect =
            options.length === MAX_SELECTIONS &&
            isSelected &&
            isSelectionCorrect(data, ...getValues(arr, options));
          const isIncorrect =
            options.length === MAX_SELECTIONS &&
            isSelected &&
            !isSelectionCorrect(data, ...getValues(arr, options));
          const isExiting =
            options.length === MAX_SELECTIONS && isSelected && animate;

          return (
            <div
              key={item}
              className={`p-3 font-semibold flex justify-center items-center border-[2px] rounded-md cursor-pointer bg-slate-100 border-[#414141]
                ${isSelected ? "border-blue-700" : ""}
                ${isCorrect ? "border-green-700" : ""}
                ${isIncorrect ? "border-red-700" : ""}
                ${isExiting ? "opacity-0 scale-0 transition duration-[1s]" : ""}
              `}
              data-id={ind}
            >
              {item}
            </div>
          );
        })
      ) : (
        <div className="text-center text-2xl font-semibold">
          Congratulations
        </div>
      )}
    </div>
  );
};

export default Game;
