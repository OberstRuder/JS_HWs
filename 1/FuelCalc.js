let oldCarMileage = 160000;
let newCarMilage = 160350;
let oldAmountofFuel = 60;
let newAmountofFuel = 35;
const measurementUnit = " L/100Km";

let monthlyCarMilage = newCarMilage - oldCarMileage;
let consumedAmountOfFuel = oldAmountofFuel - newAmountofFuel;
let fuelConsumption = (consumedAmountOfFuel / monthlyCarMilage * 100).toFixed(2);
let result = fuelConsumption + measurementUnit;

alert(result);