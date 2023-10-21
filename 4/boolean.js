{
    //Number: odd
    let inStr = prompt("Enter number");
    let inNum = parseFloat(inStr);

    if (!isNaN(inNum)) {
        if (inNum % 2 === 0) {
            alert("You entered a paired number");
        }
        else {
            alert("Нou entered an unpaired number");
        }
    }
    else {
        alert("You enter not a number");
    }
}

{
    //String: lexics
    let str = prompt("Enter something");
    let badWords = ["some", "bad", "word"];
    let badWordsConuter = 0;

    for (var i = 0; i < badWords.length; i++) {
        if (str.indexOf(badWords[i]) !== -1) {
            alert("Founded bad word: " + badWords[i]);
            badWordsConuter++;
        }
    }
    
    if (badWordsConuter === 0) {
        alert("Text have not bad words");
    }
}

{
    //Boolean: if
    let male = confirm("Are you a male?");
    if (male) {
        alert("You are male");
    } 
    else {
        alert("You are female");
    }

    let years = confirm("Are you over 25 years old?");
    if (years) {
        alert("You are young");
    } 
    else {
        alert("You are old");
    }

    let films = confirm("Do you like watching films?");
    if (films) {
        alert("You like watching films");
    } 
    else {
        alert("You don`t like watching films");
    }

    let shows = confirm("Do you like watching shows?");
    if (shows) {
        alert("You like watching shows");
    } 
    else {
        alert("You don`t like watching shows");
    }

    let football = confirm("Do you like football?");
    if (football) {
        alert("You like football");
    } 
    else {
        alert("You don`t like football");
    }

    let games = confirm("Do you like computer games?");
    if (games) {
        alert("You like computer games");
    } 
    else {
        alert("You don`t computer games");
    }

    let beer = confirm("Do you like beer?");
    if (beer) {
        alert("You like beer");
    } 
    else {
        alert("You don`t beer");
    }
}

{
    //Comparison: sizes
    let size = prompt("Enter your number of size (from 40 to 54) :");
    if (size >= 40 && size < 42) {
        alert("Your size in USA size system is S");
    } 
    else if (size >= 42 && size < 46) {
        alert("Your size in USA size system is M");
    }
    else if (size >= 46 && size < 50) {
        alert("Your size in USA size system is L");
    }
    else if (size >= 50 && size < 54) {
        alert("Your size in USA size system is XL");
    }
    else if (size >= 50 && size < 54) {
        alert("Your size in USA size system is XL");
    }
    else if (size == 54) {
        alert("Your size in USA size system is XXL");
    }
    else {
        alert("You have entered the wrong size ");
    }
}

{
    //Ternary
    let male = confirm("Are you a male?");
    alert(male ? "You are male" : "You are female");
}

{
    //Prompt: or
    let year = 2023;
    let age = prompt("How old are you?") || alert("Age not entered");

    if (!isNaN(age)) {
        alert("Your year of birth is: " + (year - age));
    }
}

{
    //Default: or
    confirm("шопінг?") || alert("ти - бяка");
}

{
    //Default: if
    if (!confirm("шопінг?")) {
        alert("ти - бяка");
    }
}

{
    //Login and password
    if ((prompt("Enter the login :") === "admin")) {
        if ((prompt("Enter the passwod :") === "qwerty")) {
            alert("access authorised");
        } 
        else {
            alert("password is wrong");
        }
    }
    else {
        alert("login is wrong");
    }
}

{
    //Currency exchange
    let currency = prompt("Enter your preferred currency (USD, EUR, PLN, BGN)").toUpperCase();
    let isBuy = confirm("You want to buy currency?");
    let rate;

    if (currency === "USD") {
        rate = isBuy ? 38.2 : 37.5;
    } 
    else if (currency === "EUR") {
        rate = isBuy ? 40.0 : 41.0;
    } 
    else if (currency === "PLN") {
        rate = isBuy ? 9.0 : 8.0;
    }
    else if (currency === "BGN") {
        rate = isBuy ? 20.0 : 19.0;
    }
    else {
        alert("Wrong currency");
    }

    let amount = parseFloat(prompt("Enter the amount to be exchanged"));

    if (!isNaN(amount)) {
        var result = amount * rate;
        alert("Result: " + result.toFixed(2) + "UAH");
    } else {
        alert("Error");
    }
}

{
    let userChoice = prompt("Enter your option: stone, scissors or paper").toLowerCase();

    const computerChoices = ["stone", "scissors", "paper"];
    let computerChoice = computerChoices[Math.floor(Math.random() * 2)];

    alert("Computer variant: " + computerChoice);

    let result =
        (userChoice === computerChoice && "Draw") ||
        (userChoice === "stone" && computerChoice === "scissors" && "You winner!") ||
        (userChoice === "scissors" && computerChoice === "paper" && "You winner!") ||
        (userChoice === "paper" && computerChoice === "stone" && "You winner!") ||
        "Computer winner!";

    alert(result);
}