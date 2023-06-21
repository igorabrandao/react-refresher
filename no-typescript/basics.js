// Primite types: number, string, boolean, null, undefined, void, symbol
// More complex types: arrays, objects
// Function types, parameters
// Primitive types
// ========================================================
var age = 24;
age = 12.1;
var userName = "User";
var username2 = userName;
userName = ["Name", "Surname"];
var isInstructor;
isInstructor = true;
// More complex types
// ========================================================
var hobbies; // array of strings
hobbies = ["Sports", "Cooking"];
var person;
person = { name: "User", age: 24, hobbies: ["Sports", "Cooking"] };
var people; // array of person
people = [
    { name: "User", age: 24, hobbies: ["Sports", "Cooking"] },
    { name: "User2", age: 35, hobbies: ["Running", "Reading"] },
];
// Type inference (use it as much as possible)
var course = "React - The Complete Guide";
// course type is string
// course = 12341; // error
// Union types (combine types)
var course2 = "React - The Complete Guide";
// course2 type is string or number
course2 = 12341; // no error
course2 = true; // no error
// Functions & types
// ========================================================
function add(a, b) {
    return a + b;
}
function printValue(value) {
    console.log(value);
}
