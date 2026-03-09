export const calculateEntropy = (password, charsetSize) => {
  if (!password || !charsetSize) return 0;
  return Math.floor(Math.log2(Math.pow(charsetSize, password.length)));
};

export const getCharsetSize = (options) => {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = false,
    excludeSimilar = false
  } = options;

  let size = 0;
  
  if (uppercase) size += 26;
  if (lowercase) size += 26;
  if (numbers) size += 10;
  if (symbols) size += 28;

  if (excludeSimilar) {
    let similarCount = 0;
    if (uppercase) similarCount += 2; // I, O
    if (lowercase) similarCount += 3; // i, l, o
    if (numbers) similarCount += 2; // 1, 0
    size -= similarCount;
  }

  return size || 26;
};
