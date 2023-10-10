//чомусь без парсу не хотіло працювати
let red = parseInt(prompt("Enter number of red color"));
let green = parseInt(prompt("Enter number of green color"));
let blue = parseInt(prompt("Enter number of blue color"));

let cssColor = ("#" + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0') );
alert("Your css color: " + cssColor);