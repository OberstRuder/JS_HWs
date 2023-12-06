{
    //personConstructor
    function Person(name, surname) {
        this.name = name,
        this.surname = surname,
        this.getFullName = function () {
            let fullName = this.name + " " + this.surname;
            if (this.fatherName) {
                fullName += " " + this.fatherName;
            }
            return fullName;
        }

    }

    const a = new Person("Вася", "Пупкін")
    const b = new Person("Ганна", "Іванова")
    const c = new Person("Єлизавета", "Петрова")

    console.log(a.getFullName()) // Василь Пупкін
    a.fatherName = 'Іванович' // Василь Іванович Пупкін

    console.log(b.getFullName()) // Ганна Іванова
}

{
    //personPrototype
    function Person(name, surname) {
        this.name = name,
        this.surname = surname
    }

    Person.prototype.getFullName = function () {
        let fullName = this.name + " " + this.surname;
        if (this.fatherName) {
            fullName += " " + this.fatherName;
        }
        return fullName;
    }

    const a = new Person("Вася", "Пупкін")
    const b = new Person("Ганна", "Іванова")
    const c = new Person("Єлизавета", "Петрова")

    console.log(a.getFullName()) // Василь Пупкін
    a.fatherName = 'Іванович' // Василь Іванович Пупкін

    console.log(b.getFullName()) // Ганна Іванова
}

{
    //store
    function Store(reducer, initialState) {

    }
}