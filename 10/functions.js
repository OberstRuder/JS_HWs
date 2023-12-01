
{
    //Arrow to Functions
    {
        function enter(info) {
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
        function readArrayOfObjects() {
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
        function temperatureToF(cTemp) {
            let fTemp = cTemp * 9 / 5 + 32;
            return fTemp;
        }
    }

    {
        function RGB(r, g, b) {
            let cssColor = ("#" + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') );
            return cssColor;
        }
    }

    {
        function flats(floors, flats, flatNumber) {
            let entrance = Math.ceil(flatNumber / (floors * flats));
            let remainingFlats = flatNumber - (entrance - 1) * floors * flats;
            let floor = Math.ceil(remainingFlats / flats);
       
            return {entrance, floor};
        }
    }
}

{
    //createPerson
    let createPerson = (name, surname) => {
        return {
            name: name,
            surname: surname,
            getFullName: function () {
                let fullName = this.name + " " + this.surname;
                if (this.fatherName) {
                    fullName += " " + this.fatherName;
                }
                return fullName;
            }
        }
    }

    let a = createPerson("Вася", "Пупкін")
    let b = createPerson("Ганна", "Іванова")
    let c = createPerson("Єлизавета", "Петрова")
   
    console.log(a.getFullName()) //Вася Пупкін
    a.fatherName = 'Іванович'   
    console.log(a.getFullName()) //Вася Іванович Пупкін
   
    console.log(b.getFullName()) //Ганна Іванова
}

{
    //createPersonClosure
    let createPersonClosure = (name, surname) => {
        let age;
        let fatherName;

        return {
            getName: function () { return name },
            getSurname: function () { return surname },
            getFatherName: function () { return fatherName },
            getAge: function () { return age },
            getFullName: function () { return surname + " " + name + " " + (fatherName ? fatherName : '') },

            setName: function (newName) {
                if (upperCaseCheck(newName)) {
                    name = newName;
                } else {
                    console.log("Misspelled");
                }
                return name;
            },
            setSurname: function (newSurname) {
                if (upperCaseCheck(newSurname)) {
                    surname = newSurname;
                } else {
                    console.log("Misspelled");
                }
                return surname;
            },
            setFatherName: function (newFatherName) {
                if (upperCaseCheck(newFatherName)) {
                    fatherName = newFatherName;
                } else {
                    console.log("Misspelled");
                }
                return fatherName;
            },
            setAge: function(newAge) {
                if (newAge <= 0 && newAge >= 100) {
                    age = newAge;
                } else {
                    console.log("Misspelled");
                }
                return age;
            },
            setFullName: function(newFullName) {
                let splitFullName = newFullName.split(' ');

                if (upperCaseCheck(splitFullName[1])) {
                    name = splitFullName[1];
                } else {
                    console.log("Misspelled");
                }

                if (upperCaseCheck(splitFullName[0])) {
                    surname = splitFullName[0];
                } else {
                    console.log("Misspelled");
                }

                if (upperCaseCheck(splitFullName[2])) {
                    fatherName = splitFullName[2];
                } else {
                    console.log("Misspelled");
                }
            }
        }
    }

    let upperCaseCheck = (word) => word[0] === (word[0].toUpperCase());

    let a = createPersonClosure("Вася", "Пупкін")
    let b = createPersonClosure("Ганна", "Іванова")
    console.log(a.getName())
    a.setAge(15)
    a.setAge(150) //не працює

    b.setFullName("Петрова Ганна Миколаївна")
    console.log(b.getFatherName()) //Миколаївна



    
    //createPersonClosureDestruct
    let createPersonClosureDestruct = ({ name = "", surname = "", age = 0, fatherName = "" } = {}) => {
        let person = createPersonClosure(name, surname);
    
        person.setAge(age);
        person.setFatherName(fatherName);
    
        return person;
    }

    let c = createPersonClosureDestruct(createPersonClosure("Вася", "Пупкін"));
    let d = createPersonClosureDestruct({ name: 'Миколай', age: 75 });

    console.log(c.getFullName());  // Виведе "Пупкін Вася"
    console.log(d.getFullName());  // Виведе "Миколай undefined"





    //personForm
    let personForm = (parent, person) => {
        let nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = person.getName();
        parent.appendChild(nameInput);

        let surnameInput = document.createElement('input');
        surnameInput.type = 'text';
        surnameInput.value = person.getSurname();
        parent.appendChild(surnameInput);

        let fatherNameInput = document.createElement('input');
        fatherNameInput.type = 'text';
        fatherNameInput.value = person.getFatherName();
        parent.appendChild(fatherNameInput);

        let ageInput = document.createElement('input');
        ageInput.type = 'number';
        ageInput.value = person.getAge();
        parent.appendChild(ageInput);

        let fullNameInput = document.createElement('input');
        fullNameInput.type = 'text';
        fullNameInput.value = person.getFullName();
        parent.appendChild(fullNameInput);

        nameInput.oninput = () => {
            let newName = nameInput.value;
            person.setName(newName);
            nameInput.value = person.getName();
        };

        surnameInput.oninput = () => {
            let newSurname = surnameInput.value;
            person.setSurname(newSurname);
            surnameInput.value = person.getSurname();
        };

        fatherNameInput.oninput = () => {
            let newFatherName = fatherNameInput.value;
            person.setFatherName(newFatherName);
            fatherNameInput.value = person.getFatherName();
        };

        ageInput.oninput = () => {
            let newAge = parseInt(ageInput.value, 10);
            person.setAge(newAge);
            ageInput.value = person.getAge();
        };

        fullNameInput.oninput = () => {
            let newFullName = fullNameInput.value;
            person.setFullName(newFullName);
            fullNameInput.value = person.getFullName();
        };
    }

    let container = document.getElementById('form-container');
    let personObject = createPersonClosure('Ганна', 'Іванова');
    personObject.setAge(15);
    personObject.setFullName('Петрова Ганна Миколаївна');
    personForm(container, personObject);
}

{
    //isSorted
    let isSorted = (arr) => {
        if (arr.length < 2) {
            return true;
        }

        for (let i = 1; i < arr.length; i++) {
            if (typeof arr[i] !== 'number' || arr[i] <= arr[i - 1]) {
                return false;
            }
        }

        return true;
    }

    //test isSorted
    let arrayFill = () => {
        let arr = [];
        let text;
        while (text = prompt("Enter something")) {
            arr.push(text);
        }
        return arr;
    }
    
    let test = arrayFill();
    console.log(test);

    console.log(isSorted(test));
}

{
    //getSetForm
    let car;
    {
        let brand = 'BMW', model = 'X5', volume = 2.4;
        car = {
            getBrand() {
                return brand;
            },
            setBrand(newBrand) {
                if (newBrand && typeof newBrand === 'string') {
                    brand = newBrand;
                }
                return brand;
            },

            getModel() {
                return model;
            },
            setModel(newModel) {
                if (newModel && typeof newModel === 'string') {
                    model = newModel;
                }
                return model;
            },

            getVolume() {
                return volume;
            },
            setVolume(newVolume) {
                newVolume = +newVolume;
                if (newVolume && newVolume > 0 && newVolume < 20) {
                    volume = newVolume;
                }
                return volume;
            },

            getTax() {
                return volume * 100;
            }
        };
    }

    function getSetForm(parent, getSet) {
        let inputs = {};

        let updateInputs = () => {
            for (let getSetName in getSet) {
                let getOrSet = getSetName.slice(0, 3);
                let fieldName = getSetName.slice(3);

                let setKey = `set${fieldName}`;
                let getKey = `get${fieldName}`;

                if (!inputs[fieldName]) {
                    let input = document.createElement('input');
                    input.type = 'text';
                    input.placeholder = fieldName;
                    parent.appendChild(input);

                    inputs[fieldName] = input;
                }

                let input = inputs[fieldName];
                input.disabled = getOrSet === 'get';
                input.value = getSet[getKey]();

                if (getOrSet === 'set') {
                    input.oninput = () => {
                        let newValue = input.value;
                        getSet[setKey](newValue);
                        input.value = getSet[getKey]();
                    };
                }
            }
        };
        updateInputs();
    }
    getSetForm(document.body, car);
}