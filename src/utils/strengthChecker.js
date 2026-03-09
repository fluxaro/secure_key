export const checkPasswordStrength = (password, entropy) => {
  if (!password) {
    return { level: 'Weak', score: 0, color: 'bg-red-500' };
  }

  const length = password.length;
  let score = 0;

  // Length scoring
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (length >= 20) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Entropy bonus
  if (entropy > 60) score += 1;
  if (entropy > 80) score += 1;

  // Determine strength level
  if (score <= 3) {
    return { level: 'Weak', score, color: 'bg-red-500', percentage: 25 };
  } else if (score <= 5) {
    return { level: 'Medium', score, color: 'bg-orange-500', percentage: 50 };
  } else if (score <= 7) {
    return { level: 'Strong', score, color: 'bg-yellow-400', percentage: 75 };
  } else {
    return { level: 'Very Strong', score, color: 'bg-green-500', percentage: 100 };
  }
};
