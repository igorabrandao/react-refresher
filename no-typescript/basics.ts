// Primite types: number, string, boolean, null, undefined, void, symbol
// More complex types: arrays, objects
// Function types, parameters

// Primitive types
let age: number = 24;
age = 12.1;

let userName: string | string[] = "User";
let username2 = userName;
userName = ["Name", "Surname"];

let isInstructor: boolean;
isInstructor = true;

// More complex types
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
