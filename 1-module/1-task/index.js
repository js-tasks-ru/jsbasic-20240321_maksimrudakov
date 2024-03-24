function factorial(n) {
  if (n <= 1) 
  return 1;

  let fact = n;

  for (let i = 1; i < n; i++) 
    fact *= i;

  return fact; 
}
