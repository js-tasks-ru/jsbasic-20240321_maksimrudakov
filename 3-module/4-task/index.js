function showSalary(users, age) {
  
  return users
      .filter(obj => (obj.age <= age))
      .map(obj => `${obj.name}, ${obj.balance}`)
      .join(`\n`)
}
