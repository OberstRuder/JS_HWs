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
    const arr = [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 6, 8, 10], [0, 3, 6, 9, 12, 15], [0, 4, 8, 12, 16, 20], [0, 5, 10, 15, 20, 25]];
}

{
    //Multiply table slice
    const arr = [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 6, 8, 10], [0, 3, 6, 9, 12, 15], [0, 4, 8, 12, 16, 20], [0, 5, 10, 15, 20, 25]];

    let arr1 = [];
    for (let i = 1; i < arr.length; i++) {
        arr1[i-1] = arr[i].slice(-5);
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
    const arr = [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 6, 8, 10], [0, 3, 6, 9, 12, 15], [0, 4, 8, 12, 16, 20], [0, 5, 10, 15, 20, 25]];
    let copiedArr = [...arr].slice();
}

{
    //Deep Copy
    const arr = [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 6, 8, 10], [0, 3, 6, 9, 12, 15], [0, 4, 8, 12, 16, 20], [0, 5, 10, 15, 20, 25]];
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
    let arr = [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10], [3, 6, 9, 12, 15], [4, 8, 12, 16, 20], [5, 10, 15, 20, 25]];
    let fullArr = [...arr[0], ...arr[1], ...arr[2], ...arr[3], ...arr[4]];
    console.log(fullArr);
}

{
    //Destruct
    let str = prompt("Enter some array");
    let [first,,,,fifth,,,,ninth] = str;
    console.log([first, fifth, ninth]);
}

{
    //Destruct default
    
}
