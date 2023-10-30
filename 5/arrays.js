{
    //Confirms
    let arr = [];

    arr.push(confirm("Do you have a car?"));
    arr.push(confirm("Do you have a computer?"));
    arr.push(confirm("Do you have a phone?"));

    console.log(arr);
}

{
    //prompts
    let arr = [];

    arr[0] = prompt("Do you have a car?");
    arr[1] = prompt("Do you have a computer?");
    arr[2] = prompt("Do you have a phone?");

    console.log(arr);
}

{
    //Item access
    let arr = ['q','w','e','r','t','y','u','i'];
    console.log(arr[prompt("Enter number of index")]);
}

{
    //Item change
    let arr = ['q','w','e','r','t','y','u','i'];
    let ind = prompt("Enter number of index");
    console.log(arr[ind]);
    
    arr[ind] = prompt("Enter something");
    console.log(arr[ind]);
}

{
    //Multiply table
    const arr = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
}

{
    //Multiply table slice
    const arr = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];

    let arr1 = [];
    for (let i = 1; i < arr.length; i++) {
        arr1[i-1] = arr[i].slice(-4);
    }
}

{
    //IndexOf Word
    let inStr = prompt("Enter some array");
    let words = inStr.split(' ');
    let wordIndex = words.indexOf(prompt("Enter the word"));
    if (wordIndex !== -1) {
        console.log("Index: " + wordIndex);
    } else {
        console.log("no such word index found");
    }
}

{
    //Reverse
    let newArr = [];
    let reverseArr = [];

    for (let i = 0; i < 5; i++) {
        newArr.push(prompt(`Enter ${i} element`));
    }

    while (newArr.length > 0) {
        reverseArr.push(newArr.pop());
    }

    console.log(reverseArr);
}

{
    //Reverse2 
    let newArr = [];
    let reverseArr = [];
    let revRevArr = [];

    for (let i = 0; i < 5; i++) {
        newArr.push(prompt(`Enter ${i} element`));
    }

    while (newArr.length > 0) {
        reverseArr.push(newArr.pop());
    }

    while (reverseArr.length > 0) {
        revRevArr.unshift(reverseArr.shift());
    }

    console.log(revRevArr);
}

{
    //Copy
    const arr = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
    let copiedArr = [...arr].slice();
}

{
    //Deep Copy
    const arr = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
    let copiedArr = [];
    for (let subArr of arr) {
      let copiedSubArr = subArr.slice();
      copiedArr.push(copiedSubArr);
    }
}

{
    //Array Equals
    let arr1 = [1, 2, 3];
    let arr2 = arr1;
    console.log(arr1 === arr2);
}

{
    //Flat
    let arr = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
    let fullArr = [...arr[0], ...arr[1], ...arr[2], ...arr[3], ...arr[4]];
    console.log(fullArr);
}

{
    //Destruct
    let str = prompt("Enter some string");
    let [first,,,,fifth,,,,ninth] = str;
    console.log([first, fifth, ninth]);
}

{
    //Destruct default
    let str = prompt("Enter some string");
    let [,second = '!',,fourth = '!',fifth = '!'] = str;
    console.log([second, fourth, fifth]);
}

{
    //Multiply table rest
    const arr = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
    let [ , [ , ...firstRow], [ , ...secondRow], [ , ...thirdRow], [ , ...fourthRow]] = arr;
    let newArr = [[...firstRow], [...secondRow], [...thirdRow], [...fourthRow]];
    console.log(newArr);
}

{
    //For Alert
    let alertSrt = ["John", "Paul", "George", "Ringo"];
    for (let a of alertSrt) {
        alert(a);
    }
}

{
    //For Select Option
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let str = "<select>";
    for (const currency of currencies) {
        str += `<option value="${currency}">${currency}</option>`;
    }
    str += "</select>";
    document.write(str);
}

{
    //For Table Horizontal
    const names = ["John", "Paul", "George", "Ringo"];
    let str = "<table>";

    for (const name of names) {
        str += `<td>${name}</td>`;
    }

    str += "</table>";
    document.write(str);
}

{
    //For Table Vertical
    const names = ["John", "Paul", "George", "Ringo"];
    let str = "<table>";

    for (const name of names) {
        str += "<tr><td>" + name + "</td></tr>";
    }

    str += "</table>";
    document.write(str);
}

{
    //For Table Letters
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let str = "<table>";

    for (const currency of currencies) {
        str += "<tr>";
        for (const letter of currency) {
            str += `<td>${letter}</td>`;
        }
        str += "</tr>";
    }

    str += "</table>";
    document.write(str);
}

{
    //For Multiply Table
    let tableHTML = "<table>";

    for (const row of arr) {
        tableHTML += "<tr>";
        for (const cell of row) {
            tableHTML += `<td>${cell}</td>`;
        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    document.write(tableHTML);
}

{
    //Function Capitalize
    const capitalize = str => {
        let result = str[0].toUpperCase() + str.slice(1).toLowerCase();
        return result;
   }
   console.log(capitalize("cANBerRa"));
}

{
    //Map Capitalize
    let str = prompt("Enter some string");
    let arr = str.split(" ");
    let capArr = arr.map(word => word[0].toUpperCase() + word.slice(1).toLowerCase());
    let result = capArr.join(" ");
    console.log(result)
}

{
    //Filter Lexics
    let arr = prompt("Enter some string").split(' ');
    const badWords = ["dupa", "jopa", "govno"];
    let filtered = arr.filter(word => !badWords.includes(word));
    let result = filtered.join(' ');
    console.log(result);
}

{
    //Beep Lexics
    let arr = prompt("Enter some string").split(' ');
    const badWords = ["dupa", "jopa", "govno"];
    let filtered = arr.map(word => badWords.includes(word) ? "BEEP" : word);
    let result = filtered.join(' ');
    console.log(result);
}

{
    //Reduce HTML
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    const selectOptions = currencies.reduce((acc, currency) => {
        return acc + `<option value="${currency}">${currency}</option>`;
    }, "<select>") + "</select>";

    document.write(selectOptions);
}

{
    //For Brackets Hell Check
}