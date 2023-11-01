{
    //Literals
    let cat = {
        color: "gray",
        weight: "5kg",
        years: "3"
    }

    let car = {
        color: "black",
        weight: "1600kg",
        dateOfManufacture: "14.07.2019",
        clearance: "20cm",
        engine: "1.2 BMD"
    }

    let laptop = {
        color: "black",
        weight: "2kg",
        dimensions: "362.3 x 237.4 x 19.9 mm",
        ScreenDiagonal: "15.6",
        Processor: "Intel Core i5-12450H"
    }
}

{
    //Literals expand
    let cat = {
        color: "gray",
        weight: "5kg",
        years: "3",
        [prompt("Enter new key name for cat")]: prompt("Enter key property"),
        [prompt("Enter new key name for cat")]: prompt("Enter key property")
    }

    let car = {
        color: "black",
        weight: "1600kg",
        dateOfManufacture: "14.07.2019",
        clearance: "20cm",
        engine: "1.2 BMD",
        [prompt("Enter new key name for car")]: prompt("Enter key property"),
        [prompt("Enter new key name for car")]: prompt("Enter key property")
    }

    let laptop = {
        color: "black",
        weight: "2kg",
        dimensions: "362.3 x 237.4 x 19.9 mm",
        ScreenDiagonal: "15.6",
        Processor: "Intel Core i5-12450H",
        [prompt("Enter new key name for laptop")]: prompt("Enter key property"),
        [prompt("Enter new key name for laptop")]: prompt("Enter key property")
    }
}

{
    //Literals copy
    let cat = {
        color: "gray",
        weight: "5kg",
        years: "3"
    }

    let newKey = prompt("Enter new key name");
    let newProp = prompt("Enter key property");

    let newObj = {};
    newObj[newKey] = newProp;

    for (let key in cat) {
        newObj[key] = cat[key];
    }
}

{
    //Html tree

    let htmlTree = {
        tagName: 'body',
        children: [
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'span',
                        children: ['Enter a data please:'],
                    },
                    {
                        tagName: 'br',
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'name',
                        },
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'surname',
                        },
                    },
                ],
            },
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'ok',
                        },
                        children: ['OK'],
                    },
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'cancel',
                        },
                        children: ['Cancel'],
                    },
                ],
            },
        ],
    };

    console.log(htmlTree.children[1].children[1].children[0]);
    console.log(htmlTree.children[0].children[3].attrs.id);
}

{
    //Parent
    const htmlTree = {
        tagName: 'body',
        parent: null,
        children: [
            {
                tagName: 'div',
                parent: htmlTree,
                children: [
                    {
                        tagName: 'span',
                        parent: htmlTree.children[0],
                        children: ['Enter a data please:'],
                    },
                    {
                        tagName: 'br',
                        parent: htmlTree.children[0],
                    },
                    {
                        tagName: 'input',
                        parent: htmlTree.children[0],
                        attrs: {
                            type: 'text',
                            id: 'name',
                        },
                    },
                    {
                        tagName: 'input',
                        parent: htmlTree.children[0],
                        attrs: {
                            type: 'text',
                            id: 'surname',
                        },
                    },
                ],
            },
            {
                tagName: 'div',
                parent: htmlTree,
                children: [
                    {
                        tagName: 'button',
                        parent: htmlTree.children[1],
                        attrs: {
                            id: 'ok',
                        },
                        children: ['OK'],
                    },
                    {
                        tagName: 'button',
                        parent: htmlTree.children[1],
                        attrs: {
                            id: 'cancel',
                        },
                        children: ['Cancel'],
                    },
                ],
            },
        ],
    };
}

{
    //Change OK
    let htmlTree = {
        tagName: 'body',
        children: [
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'span',
                        children: ['Enter a data please:'],
                    },
                    {
                        tagName: 'br',
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'name',
                        },
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'surname',
                        },
                    },
                ],
            },
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'button',
                        attrs: {
                            id: prompt("Enter new attribute 'id' for button 'ok':"),
                        },
                        children: ['OK'],
                    },
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'cancel',
                        },
                        children: ['Cancel'],
                    },
                ],
            },
        ],
    };
}

{
    //Destructure

    let htmlTree = {
        tagName: 'body',
        children: [
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'span',
                        children: ['Enter a data please:'],
                    },
                    {
                        tagName: 'br',
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'name',
                        },
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'surname',
                        },
                    },
                ],
            },
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'ok',
                        },
                        children: ['OK'],
                    },
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'cancel',
                        },
                        children: ['Cancel'],
                    },
                ],
            },
        ],
    };

    let [, div1, , inputName, inputSurname, div2] = htmlTree.children;
}

{
    //Destruct array
    let arr = [1, 2, 3, 4, 5, "a", "b", "c"];

    let [odd1, even1, odd2, even2, odd3, ...letters] = arr;

    console.log("Even numbers:");
    console.log(even1, even2);

    console.log("Odd numbers:");
    console.log(odd1, odd2, odd3);

    console.log("Letters:");
    console.log(letters);
}

{
    //Destruct string
    let arr = [1, "abc"];

    let [number, [s1, s2, s3]] = arr;

    console.log("Number:", number);
    console.log("s1:", s1);
    console.log("s2:", s2);
    console.log("s3:", s3);
}

{
    //Destruct 2
    let obj = {
        name: 'Ivan',
        surname: 'Petrov',
        children: [{ name: 'Maria' }, { name: 'Nikolay' }]
      };
      
      let { children: [{ name: name1 }, { name: name2 }] } = obj;
      
      console.log(name1);
      console.log(name2);
}

{
    //Destruct 3
    let arr = [1, 2, 3, 4, 5, 6, 7, 10];

    let [a, b, ...rest] = arr;
    let length = arr.length;

    console.log("a:", a);
    console.log("b:", b);
    console.log("length:", length);
}

{
    //Copy delete
    let cat = {
        color: "gray",
        weight: "5kg",
        years: "3"
    };

    let keyToDelete = prompt("Enter key for delete");
    let { [keyToDelete]: deletedKey, ...newCat } = cat;
}

{
    //Currency real rate
    fetch('https://open.er-api.com/v6/latest/USD')
        .then((res) => res.json())
        .then((data) => {
            const rates = data.rates;

            const inputCurrency = prompt("Enter the input currency:").toUpperCase();
            const outputCurrency = prompt("Enter the currency to convert to:").toUpperCase();

            if (rates[inputCurrency] && rates[outputCurrency]) {
                const inputAmount = parseFloat(prompt("Enter the amount in the input currency:"));

                const convertedAmount = (inputAmount * rates[outputCurrency]) / rates[inputCurrency];

                alert(`Result: ${inputAmount} ${inputCurrency} = ${convertedAmount.toFixed(2)} ${outputCurrency}`);
            } else {
                alert("You have entered an incorrect currency");
            }
        });
}

{
    //Currency drop down
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
            let htmlString = '<select>';

            for (const currency in data.rates) {
                htmlString += `<option value="${currency}">${currency}</option>`;
            }

            htmlString += '</select>';

            document.body.innerHTML = htmlString;
        });
}

{
    //Currency table
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
            let tableHTML = '<table>';
            tableHTML += '<tr><th></th>';

            for (const currency in data.rates) {
                tableHTML += `<th>${currency}</th>`;
            }

            tableHTML += '</tr>';

            for (const currency1 in data.rates) {
                tableHTML += `<tr><th>${currency1}</th>`;
                for (const currency2 in data.rates) {
                    if (currency1 === currency2) {
                        tableHTML += '<td>1.00</td>';
                    } else {
                        const rate = (1 / data.rates[currency1]) * data.rates[currency2];
                        const roundedRate = rate.toFixed(2);
                        tableHTML += `<td>${roundedRate}</td>`;
                    }
                }
                tableHTML += '</tr>';
            }

            tableHTML += '</table>';
            document.body.innerHTML = tableHTML;
        });
}

{
    //Form
    const car = {
        "Name": "chevrolet chevelle malibu",
        "Cylinders": 8,
        "Displacement": 307,
        "Horsepower": 130,
        "Weight_in_lbs": 3504,
        "Origin": "USA",
        "in_production": false
    };

    const form = document.createElement('form');

    for (const key in car) {
        const label = document.createElement('label');
        label.textContent = key;

        const input = document.createElement('input');
        const valueType = typeof car[key];

        input.type = valueType === 'boolean' ? 'checkbox' : valueType === 'number' ? 'number' : 'text';
        input.value = car[key];

        label.appendChild(input);
        form.appendChild(label);
    }

    document.body.appendChild(form);
}

{
    //Table
    const data = [
        {
            "Name": "chevrolet chevelle malibu",
            "Cylinders": 8,
            "Displacement": 307,
            "Horsepower": 130,
            "Weight_in_lbs": 3504,
            "Origin": "USA"
        },
        {
            "Name": "buick skylark 320",
            "Miles_per_Gallon": 15,
            "Cylinders": 8,
            "Displacement": 350,
            "Horsepower": 165,
            "Weight_in_lbs": 3693,
            "Acceleration": 11.5,
            "Year": "1970-01-01",
        },
        {
            "Miles_per_Gallon": 18,
            "Cylinders": 8,
            "Displacement": 318,
            "Horsepower": 150,
            "Weight_in_lbs": 3436,
            "Year": "1970-01-01",
            "Origin": "USA"
        },
        {
            "Name": "amc rebel sst",
            "Miles_per_Gallon": 16,
            "Cylinders": 8,
            "Displacement": 304,
            "Horsepower": 150,
            "Year": "1970-01-01",
            "Origin": "USA"
        },
    ];

    let columns = [];
    for (const row of data) {
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

    for (const row of data) {
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