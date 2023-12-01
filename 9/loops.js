{
    //While confirm
    while (confirm() === false){
        console.log("Enter ok");
    }
}

{
    //array fill
    let arr = [];
    let text;
    while (text = prompt("Enter something"))
    {
        arr.push(text);
    }
    console.log(arr);
}

{
    //array fill nonpush
    let arr = [];
    let text;
    let counter = 0;
    while (text = prompt("Enter something"))
    {
        arr[counter] = text;
        counter++;
    }
    console.log(arr);
}

{
    //infinite probability
    let counter = 0;
    while (true) {
        if (Math.random() > 0.9)
        {
            break;
        }
        counter++;
    }
    alert(counter);
}

{
    //empty loop
    while (true) {
        let userInput = prompt("Enter something");
        if (userInput === null) {
            break;
        }
    }
}

{
    //progression sum
    let n = +prompt("Enter length of arithmetic progression");
    let sum = 0;
    let num = 1;
    for (let i = 0; i < n; i++) {
        sum += num;
        num += 3;
    }
    console.log(sum);
}

{
    //numbers
    let string;
    for (let i = 0; i <= 10; i++) {
        for (let j = 0; j <= 9; j++) {
            string += j;
        }
        string += "\n";
    }
    console.log(string);
}

{
    //chess
    let enter = (info) => {
        let param = +prompt(info);
        while (param % 2 === 0) {
            param = +prompt("Enter not a pair number")
        }
        return param;
    }

    let x = enter("Enter length of chess");
    let y = enter("Enter high of chess");
    let chess = '';
    let dh = ".#";
    let hd = "#.";

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (i % 2 === 0) {
                chess += dh;
            } else {
                chess += hd;
            }
        }
        chess += "\n";
    }

    console.log(chess);
}

{
    //cubes
    let n = +prompt("Enter length of array");
    let arr = [];

    for (let i = 0; i < n; i++) {
        arr[i] = Math.pow(i, 3);
    }

    console.log(arr);
}

{
    //multiply table
    let multiplicationTable = [];

    for (let i = 0; i <= 10; i++) {
        multiplicationTable[i] = [];
        for (let j = 0; j <= 10; j++) {
            multiplicationTable[i][j] = i * j;
        }
        console.log(multiplicationTable[i]);
    }
}

{
    //read array of objects
    let readArrayOfObjects = () => {
        let array = [];
        let bool = true;

        while (bool) {
            let tmpObj = {};
            let key;

            while (key = prompt("Enter object key")) {
                tmpObj[key] = prompt("Enter object value");
            }

            array.push(tmpObj);
            bool = confirm("Do you want to continue?");
        }

        return array;
    }

    let testArray = readArrayOfObjects();
    console.log(testArray);
}

{
    //Ромбік
    let size = +prompt("Enter size of ромбік");
    let rombik = "";


    if (size % 2 === 0 || size < 3) {
        console.log("Invalid size if ромбік");
    } else {
        let hash = 1;
        let dot;

        for (let y = 0; y < (size - 1)/ 2; y++) 
        {
            dot = (size - hash) / 2;

            for (let h = 0; h < dot; h++)
            {
                rombik += (".");
            }

            for (let d = 0; d < hash; d++)
            {
                rombik += ("#");
            }

            for (let h = 0; h < dot; h++)
            {
                rombik += (".");
            }

            hash = hash + 2;

            rombik += ("\n");
        }

        for (let y = 0; y < (size + 1)/ 2; y++) 
        {
            dot = (size - hash) / 2;

            for (let h = 0; h < dot; h++)
            {
                rombik += (".");
            }

            for (let d = 0; d < hash; d++)
            {
                rombik += ("#");
            }

            for (let h = 0; h < dot; h++)
            {
                rombik += (".");
            }

            hash = hash - 2;

            rombik += ("\n");
        }
    }

    console.log(rombik);
}
