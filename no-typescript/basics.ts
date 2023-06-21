// Primite types: number, string, boolean, null, undefined, void, symbol
// More complex types: arrays, objects
// Function types, parameters

// Primitive types
let age: number = 24;
age = 12.1;

let userName: string = "User";

let isInstructor: boolean;
isInstructor = true;

// More complex types
let hobbies: string[]; // array of strings
hobbies = ["Sports", "Cooking"];

let person: {
  name: string;
  age: number;
  hobbies: string[];
};
person = { name: "User", age: 24, hobbies: ["Sports", "Cooking"] };

let people: {
  name: string;
  age: number;
  hobbies: string[];
}[]; // array of person

people = [
  { name: "User", age: 24, hobbies: ["Sports", "Cooking"] },
  { name: "User2", age: 35, hobbies: ["Running", "Reading"] },
];
