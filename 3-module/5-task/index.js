function getMinMax(str) {
  
  const tempArr = str
      .split(` `)
      .map(element => Number(element)) // приведем к числу все элементы массива заранее 
      .filter(element => isFinite(element))
      .sort((a, b) => a-b );

      return {min: tempArr.at(0),
              max: tempArr.at(-1)}
}
