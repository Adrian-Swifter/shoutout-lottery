const pickRandomWinner = (collectionData) => {
  return collectionData[Math.floor(Math.random() * collectionData.length)];
};

export default pickRandomWinner;
