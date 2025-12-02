const users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Carlos" },
  { id: 1, name: "Ana Duplicate" },
  { id: 3, name: "Ana Duplicate" },
  { id: 3, name: "Ana Duplicate" },
  { id: 4, name: "Ana Duplicate" },
];

function uniqueUsers(list: typeof users) {
  const seen = new Set<number>();
  return list.filter((user) => {
    if (seen.has(user.id)) return false;
    seen.add(user.id);
    return true;
  });
}

const numbers = new Set([1, 2, 3, 3, 4]);
console.log("numbers", numbers); 

console.log(uniqueUsers(users));
