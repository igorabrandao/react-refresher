// Primite types: number, string, boolean, null, undefined, void, symbol
// More complex types: arrays, objects
// Function types, parameters

// Primitive types
// ========================================================
let age: number = 24;
age = 12.1;

let userName: string | string[] = "User";
let username2 = userName;
userName = ["Name", "Surname"];

let isInstructor: boolean;
isInstructor = true;

// More complex types
// ========================================================
let hobbies: string[]; // array of strings
hobbies = ["Sports", "Cooking"];

type Person = {
  name: string;
  age: number;
  hobbies: string[];
};

let person: Person;
person = { name: "User", age: 24, hobbies: ["Sports", "Cooking"] };

let people: Person[]; // array of person
people = [
  { name: "User", age: 24, hobbies: ["Sports", "Cooking"] },
  { name: "User2", age: 35, hobbies: ["Running", "Reading"] },
];

// Type inference (use it as much as possible)
let course = "React - The Complete Guide";
// course type is string
// course = 12341; // error

// Union types (combine types)
let course2: string | number | boolean = "React - The Complete Guide";
// course2 type is string or number
course2 = 12341; // no error
course2 = true; // no error

// Functions & types
// ========================================================
function add(a: number, b: number) {
  return a + b;
}

function printValue(value: any) {
  console.log(value);
}

// Generics
// ========================================================
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");
const booleanArray = insertAtBeginning([true, false, false], true);
// const booleanArray2 = insertAtBeginning([true, false, false], "true"); // error

console.log(updatedArray, stringArray, booleanArray);

// With the generic type, we can use functions for specific types
// stringArray[0].split(""); // no error