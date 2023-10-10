{
    //greeting
    let str = prompt("Say your name");
    alert("Hello " + str);
}

{
    //gopni4ek
    let str = prompt("Say something");
    let tempStr = str.split(',');
    let resultStr = tempStr.join(', блін,');
    alert("Gopnik say: " + resultStr);
}

{
    //capitalize
    let str = "cANBerRa";
    let result;
    str = str.toLowerCase();
    result = (str[0].toUpperCase()) + str.slice(1);
    console.log(result);
}

{
    //word count
    let str = prompt("Say something");
    let strArray = str.split(' ');
    let result = strArray.length;
    alert("Count of words: " + result);
}

{
    
}