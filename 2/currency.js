const rate = 38.05;
let dollars = prompt("How many dollars you want to buy?");

let hryvnia = (dollars * rate).toFixed(2);
alert("You must pay " + hryvnia + " hryvnias");