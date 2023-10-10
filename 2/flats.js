let floors = prompt("Enter number of floors");
let flats = prompt("Enter number of flat");
let flatNumber = prompt("Enter flat number");

let entrance = Math.ceil(flatNumber / (floors * flats));
let remainingFlats = flatNumber - (entrance - 1) * floors * flats;
let floor = Math.ceil(remainingFlats / flats);

alert("Еhe flat is in the " + entrance + " entrance on the " + floor + " floor");