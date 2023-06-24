export const intersectionArrays = (array: any[]) => {
  const intersection = array.reduce((accumulator: any[], currentArray: any[]) => {
    return accumulator.filter((element) =>
      currentArray.some((x: any) => JSON.stringify(x) === JSON.stringify(element))
    );
  });
  return intersection;
};
