export function createRandomArray(data) {
  const totalPositions = Object.keys(data).length * 2;
  const arr = Array.from({ length: totalPositions }).fill("");
  let ind = -1;
  Object.entries(data).forEach(([country, capital]) => {
    arr[++ind] = country;
    arr[++ind] = capital;
  });

  let currentIndex = arr.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  // Object.keys(data).forEach((country) => {
  //   let randomPosition = Math.floor(Math.random() * totalPositions);
  //   while (arr[randomPosition] !== "") {
  //     randomPosition = Math.floor(Math.random() * totalPositions);
  //   }
  //   arr[randomPosition] = country;
  // });
  // Object.values(data).forEach((capital) => {
  //   let randomPosition = Math.floor(Math.random() * totalPositions);
  //   while (arr[randomPosition] !== "") {
  //     randomPosition = Math.floor(Math.random() * totalPositions);
  //   }
  //   arr[randomPosition] = capital;
  // });
  return arr;
}

export function isSelectionCorrect(s1, s2, data) {
  return data[s1] === s2 || data[s2] === s1;
}
