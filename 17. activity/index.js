// #1
const people = [
  { name: "Jack", hasPet: true },
  { name: "Jill", hasPet: false },
  { name: "Alice", hasPet: true },
  { name: "Bob", hasPet: false },
];

function filterArray(array, callback) {
  const resultingArray = [];

  array.filter((item) => {
    if (callback(item)) {
      resultingArray.push(item);
    }
  });

  return resultingArray;
}

function withPets(item) {
  return item.hasPet;
}

const filteredPeople = filterArray(people, withPets);
// console.log(filteredPeople);

// #2
const voters = [
  { name: "Joe", email: "joe@joe.com", voted: true },
  { name: "Jane", email: "jane@jane.com", voted: true },
  { name: "Bo", email: "bo@bo.com", voted: false },
  { name: "Bane", email: "bane@bane.com", voted: false },
];

// Write your code below
const emailAddress = voters
  .filter((item) => item.voted)
  .map((item) => item.email);

console.log(emailAddress);
