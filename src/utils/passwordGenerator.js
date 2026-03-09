const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  similar: 'il1Lo0O'
};

export const generatePassword = (options) => {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = false,
    excludeSimilar = false,
    customPrefix = ''
  } = options;

  let charset = '';
  
  if (uppercase) charset += CHAR_SETS.uppercase;
  if (lowercase) charset += CHAR_SETS.lowercase;
  if (numbers) charset += CHAR_SETS.numbers;
  if (symbols) charset += CHAR_SETS.symbols;

  if (!charset) {
    charset = CHAR_SETS.lowercase;
  }

  if (excludeSimilar) {
    charset = charset.split('').filter(char => !CHAR_SETS.similar.includes(char)).join('');
  }

  // Calculate remaining length after prefix
  const prefix = customPrefix.trim();
  const remainingLength = Math.max(0, length - prefix.length);

  let randomPart = '';
  if (remainingLength > 0) {
    const array = new Uint32Array(remainingLength);
    crypto.getRandomValues(array);

    for (let i = 0; i < remainingLength; i++) {
      randomPart += charset[array[i] % charset.length];
    }
  }

  return prefix + randomPart;
};

export const generateBatchPasswords = (count, options) => {
  const passwords = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(options));
  }
  return passwords;
};
