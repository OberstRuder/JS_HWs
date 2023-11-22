{
    //Blocks
    let a = 10
    {
        let b = 20
        {
            let c = 30
            //які тут будуть значення змінних a, b, c, d
            //a = 10; b = 20; c = 30; d не існує
            b++
            a *= 10
        }
        {
            let c = 50
            //які тут будуть значення змінних a, b, c, d
            //a = 100; b = 21; c = 50; d не існує
            c--
            b += 500
        }
        {
            const a = 100500
            const d = "value"
            //які тут будуть значення змінних a, b, c, d
            //a = 100500; b = 521; c не існує; d = "value"
            {
                let a = -50
                b = 1000
                //які тут будуть значення змінних a, b, c, d
                //a = -50; b = 1000; c не існує; d = "value"
            }
            //які тут будуть значення змінних a, b, c, d
            //a = 100500; b = 1000; c не існує; d = "value"
        }
        //які тут будуть значення змінних a, b, c, d
        //a = 100; b = 1000; c не існує; d не існує
    }
    //які тут будуть значення змінних a, b, c, d
    //a = 100; b не існує; c не існує; d не існує
}

{
    //comparison if
    var age = +prompt("Скільки вам років?");

    if (age < 0)
        alert("помилка");
    else if (age < 18)
        alert("школяр");
    else if (age < 30)
        alert("молодь");
    else if (age < 45)
        alert("зрілість");
    else if (age < 60)
        alert("захід сонця");
    else if (age >= 60)
        alert("як пенсія?");
    else
        alert("чи кіборг, чи KERNESS");
}

{
    //switch: sizes
    let size = prompt("Enter your number of size (from 40 to 54) :");

    switch (true) {
        case size >= 40 && size < 42:
            alert("Your size in USA size system is S");
            break;
        case size >= 42 && size < 46:
            alert("Your size in USA size system is M");
            break;
        case size >= 46 && size < 50:
            alert("Your size in USA size system is L");
            break;
        case size >= 50 && size < 54:
            alert("Your size in USA size system is XL");
            break;
        case size == 54:
            alert("Your size in USA size system is XXL");
            break;
        default:
            alert("You have entered the wrong size");
    }
}

{
    //switch: if
    let color = prompt("Введіть колір", "");

    if (color === "red") {
        document.write("<div style='background-color: red;'>червоний</div>");
    }
    if (color === "black") {
        document.write("<div style='background-color: black; color: white;'>чорний</div>");
    }
    else if (color === "blue") {
        document.write("<div style='background-color: blue;'>синій</div>");
    }
    if (color === "green") {
        document.write("<div style='background-color: green;'>зелений</div>");
    }
    else {
        document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
    }
}

{
    //noswitch
    const noSwitch = (key, cases, defaultKey = 'default') => {
        const caseFunction = cases[key] || cases[defaultKey];
        return caseFunction ? caseFunction() : undefined;
    };

    const drink = prompt("Що ви любите пити");

    noSwitch(drink, {
        воду: () => console.log('Найздоровіший вибір!'),
        чай: () => console.log('Смачна та корисна штука. Не перестарайтеся з цукром'),
        пиво: () => console.log('Добре влітку, та в міру'),
        віскі: () => console.log('Та ви, батечку, естет! Не забудьте лід і сигару'),
        default: () => console.log('шото я не зрозумів')
    });
}

{
    //closure calc
    fetch('https://open.er-api.com/v6/latest/USD')
    .then(res => res.json())
    .then(data => {

        console.log(data);

        const buttonsContainer = document.createElement('div');
        document.body.appendChild(buttonsContainer);

        for (const currency in data.rates) {
            const button = document.createElement('button');
            button.innerText = currency;

            button.onclick = () => {
                const amount = prompt(`Enter the amount in ${currency}:`);
                if (amount !== null && !isNaN(amount)) {
                    const convertedAmount = amount / data.rates[currency];
                    alert(`Converted amount in USD: ${convertedAmount.toFixed(2)}`);
                } else {
                    alert('Invalid input. Please enter a valid number.');
                }
            };

            buttonsContainer.appendChild(button);
        }
    });
}