import { useState, useEffect, useCallback } from "react";
import { isSelectionCorrect, createRandomArray } from "./utils";

const Game = ({ data }) => {
  const [arr, setArr] = useState(() => createRandomArray(data));
  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);

  // can be three values "" = means both options is not selected yet
  // true value means both selected value is correct
  // false value means selected boxes are not correct
  const [selection, setSelection] = useState("");

  const handleClick = (id) => {
    if (option1 === null) {
      setOption1(id);
    } else if (id === option1) {
      setOption1(null);
    } else if (option2 === null) {
      setOption2(id);
    }
  };

  const resetValues = useCallback(() => {
    setOption1(null);
    setOption2(null);
    setSelection("");
  }, []);

  const decideBorder = useCallback(
    (ind) => {
      if (selection === "") {
        if (option1 === ind || option2 === ind) {
          return "border-blue-700";
        }
      } else if (selection === true) {
        if (option1 === ind || option2 === ind) {
          return "border-[#66cc99]";
        }
      } else if (selection === false) {
        if (option1 === ind || option2 === ind) {
          return "border-red-700";
        }
      }
      return "";
    },
    [selection, option1, option2]
  );

  useEffect(() => {
    if (option1 === null || option2 === null) return;
    const s1 = arr[option1];
    const s2 = arr[option2];
    let timer;
    if (isSelectionCorrect(s1, s2, data)) {
      setSelection(true);
      timer = setTimeout(() => {
        setArr((prev) => prev.filter((s, i) => i !== option1 && i !== option2));
        resetValues();
      }, 1000);
    } else {
      setSelection(false);
      timer = setTimeout(() => {
        resetValues();
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [option1, option2, arr, isSelectionCorrect, resetValues]);

  return (
    <div className="flex gap-3 m-4 p-4 border flex-wrap justify-center items-center">
      {arr.length > 0 ? (
        arr.map((item, ind) => {
          return (
            <div
              key={item}
              className={`p-3 font-semibold flex justify-center items-center border-[2px] rounded-md cursor-pointer bg-slate-100 border-[#414141] ${decideBorder(
                ind
              )}`}
              onClick={() => handleClick(ind)}
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
