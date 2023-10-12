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
    //credentials
    let name = prompt("Say your name");
    let surname = prompt("Say your surname");
    let patronymic = prompt("Say your patronymic");

    let temp;
    temp = name.toLowerCase();
    name = (temp[0].toUpperCase()) + temp.slice(1);

    temp = surname.toLowerCase();
    surname = (temp[0].toUpperCase()) + temp.slice(1);

    temp = patronymic.toLowerCase();
    patronymic = (temp[0].toUpperCase()) + temp.slice(1);

    let fullName = surname + " " + name + " " + patronymic;
    alert(fullName);
}

{
    //beer
    let str = "Було жарко. Василь пив пиво вприкуску з креветками";
    let result;

    let tempStr = str.split('пиво');
    result = tempStr.join('чай');

    console.log(result);
}

{
    //no tag
    let str = "якийсь текст, в якому є один тег <br /> і всяке інше";
    let result;

    let tmpStr = str.split(' <br /> ');
    result = tmpStr.join(' ');

    console.log(result);
}

{
    //big tag
    let str = "якийсь текст у якому є один тег <br /> і всяке інше";
    let result;

    let index = str.indexOf("br");
    let tmpStr = str.slice(index, index + 2 ).toUpperCase();
    result = str.substring(0, index) + tmpStr + str.substring(index + 2);

    console.log(result);
}

{
    //new line
    let str = prompt("Use \n for new line");
    let tmpStr = str.split("\\n");
    let multiLineString = tmpStr.join("\n");
    alert(multiLineString);
}

{
    //youtube
    const youtubeReg = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/)?([\w-]{11})/;
    let str = prompt("Enter the link to the YouTube video");

    let match = str.match(youtubeReg);
    let videoId = match[1];
    let htmlCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    document.write(htmlCode);
}