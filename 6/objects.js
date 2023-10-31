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
}