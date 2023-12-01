//Temperature
let temperatureToF = (cTemp) => {
    let fTemp = cTemp * 9 / 5 + 32;
    return fTemp;
}

//RGB
let RGB = (r, g, b) => {
    let cssColor = ("#" + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') );
    return cssColor;
}

//Flats
let flats = (floors, flats, flatNumber) => {
    let entrance = Math.ceil(flatNumber / (floors * flats));
    let remainingFlats = flatNumber - (entrance - 1) * floors * flats;
    let floor = Math.ceil(remainingFlats / flats);

    return {entrance, floor};
}

//Credentials
let crudentionals = () => {
    let name = prompt("Say your name");
    let surname = prompt("Say your surname");
    let fatherName = prompt("Say your patronymic");

    let temp;
    temp = name.toLowerCase();
    name = (temp[0].toUpperCase()) + temp.slice(1);

    temp = surname.toLowerCase();
    surname = (temp[0].toUpperCase()) + temp.slice(1);

    temp = fatherName.toLowerCase();
    fatherName = (temp[0].toUpperCase()) + temp.slice(1);

    let fullName = surname + " " + name + " " + fatherName;

    return {name, surname, fatherName, fullName};
}

//New line
let newLine = (str) => {
    let tmpStr = str.split("\\n");
    let multiLineString = tmpStr.join("\n");
    return multiLineString;
}

{
//Prompt OR
    let promptOrDefault = (promptText, defaultValue) => prompt(promptText) || defaultValue;

    let year = 2023;
    let age = promptOrDefault("How old are you?", "Age not entered");

    if (!isNaN(age)) {
        alert("Your year of birth is: " + (year - age));
    }
}

//Login And Password
let loginAndPassword = (login, password) => {
    const enteredLogin = prompt("Enter the login:");

    if (enteredLogin === login) {
        const enteredPassword = prompt("Enter the password:");

        if (enteredPassword === password) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//For Table
let forTable = (arr) => {
    let tableHTML = "<table>";

    for (const row of arr) {
        tableHTML += "<tr>";
        for (const cell of row) {
            tableHTML += `<td>${cell}</td>`;
        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    return tableHTML;
}

//Filter Lexics
let filterLexics = (inputString, badWords) => {
    const arr = inputString.split(' ');
    const filtered = arr.filter(word => !badWords.includes(word));
    const result = filtered.join(' ');
    return result;
}

//Currency Table
let currencyTable = () => {
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            const tableData = [[''].concat(currencies)];

            for (const currency1 of currencies) {
                const row = [currency1];
                for (const currency2 of currencies) {
                    if (currency1 === currency2) {
                        row.push('1.00');
                    } else {
                        const rate = (1 / data.rates[currency1]) * data.rates[currency2];
                        const roundedRate = rate.toFixed(2);
                        row.push(roundedRate);
                    }
                }
                tableData.push(row);
            }

            const tableHTML = forTable(tableData);
            document.body.innerHTML = tableHTML;
        });
}

//Form
let form = (obj) => {
    const form = document.createElement('form');

    for (const key in obj) {
        const label = document.createElement('label');
        label.textContent = key;

        const input = document.createElement('input');
        const valueType = typeof obj[key];

        input.type = valueType === 'boolean' ? 'checkbox' : valueType === 'number' ? 'number' : 'text';
        input.value = obj[key];

        label.appendChild(input);
        form.appendChild(label);
    }

    document.body.appendChild(form);
}

//Array of objects sort
{
    let arrayOfObjectSort = (arr, field, ascending = true) => {
        return arr.sort((a, b) => {
            let valA = a[field];
            let valB = b[field];

            if (valA < valB) {
                return ascending ? -1 : 1;
            }
            if (valA > valB) {
                return ascending ? 1 : -1;
            }
            return 0;
        });
    }

    let persons = [
        { name: "Іван", age: 17 },
        { name: "Марія", age: 35 },
        { name: "Олексій", age: 73 },
        { name: "Яків", age: 12 }
    ];

    arrayOfObjectSort(persons, "age");
    console.log(persons);

    arrayOfObjectSort(persons, "name", false);
    console.log(persons);
}


//Table
let createAndDisplayTable = (data, sortBy, ascending = true) => {
    const dataCopy = data.slice();

    dataCopy.sort((a, b) => {
        if (ascending) {
            return a[sortBy] - b[sortBy];
        } else {
            return b[sortBy] - a[sortBy];
        }
    });

    let columns = [];
    for (const row of dataCopy) {
        for (const key in row) {
            if (!columns.includes(key)) {
                columns.push(key);
            }
        }
    }

    let tableHTML = '<table><tr>';
    for (const column of columns) {
        tableHTML += `<th>${column}</th>`;
    }
    tableHTML += '</tr>';

    for (const row of dataCopy) {
        tableHTML += '<tr>';
        for (const column of columns) {
            tableHTML += '<td>';
            if (row[column] !== undefined) {
                tableHTML += row[column];
            }
            tableHTML += '</td>';
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    document.body.innerHTML = tableHTML;
}

{
    //Calc Func
    let calculateFuelConsumption = (oldCarMileage, newCarMilage, oldAmountofFuel, newAmountofFuel) => {
        const measurementUnit = " L/100Km";

        const monthlyCarMilage = newCarMilage - oldCarMileage;
        const consumedAmountOfFuel = oldAmountofFuel - newAmountofFuel;
        const fuelConsumption = (consumedAmountOfFuel / monthlyCarMilage * 100).toFixed(2);

        return {
            monthlyCarMilage: monthlyCarMilage,
            consumedAmountOfFuel: consumedAmountOfFuel,
            fuelConsumption: fuelConsumption + measurementUnit
        };
    }

    const oldCarMileage = 160000;
    const newCarMilage = 160350;
    const oldAmountofFuel = 60;
    const newAmountofFuel = 35;

    const result = calculateFuelConsumption(oldCarMileage, newCarMilage, oldAmountofFuel, newAmountofFuel);
    console.log(result);
}