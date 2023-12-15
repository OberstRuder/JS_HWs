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
    function Store(reducer) {
        let state;
        const cbs = [];

        this.getState = function () {
            return state;
        };

        this.subscribe = function (cb) {
            cbs.push(cb);
            return function unsubscribe() {
                const index = cbs.indexOf(cb);
                if (index !== -1) {
                    cbs.splice(index, 1);
                }
            };
        };

        this.dispatch = function (action) {
            state = reducer(state, action);
            cbs.forEach(cb => cb());
        };

        this.dispatch({ type: '@@INIT' });
    }
}

{
    //Password
    function Password(parent, open) {
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.value = '';
        parent.appendChild(passwordInput);

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Password';
        parent.appendChild(toggleButton);

        let isOpen = open;
        let value = '';

        this.onChange = (data) => { };
        this.onOpenChange = (open) => { };

        this.setValue = function (newValue) {
            value = newValue;
            this.onChange(value);
        };

        this.getValue = function () {
            return value;
        };

        this.setOpen = function (newOpen) {
            isOpen = newOpen;
            this.onOpenChange(isOpen);
            passwordInput.type = isOpen ? 'text' : 'password';
        };

        this.getOpen = function () {
            return isOpen;
        };

        this.setOpen(open);

        passwordInput.addEventListener('input', () => {
            this.setValue(passwordInput.value);
        });

        toggleButton.addEventListener('click', () => {
            this.setOpen(!isOpen);
        });
    }

    let p = new Password(document.body, true)

    p.onChange = data => console.log(data)  //буде корисно при виконаннi LoginForm та Password Verify
    p.onOpenChange = open => console.log(open)

    p.setValue('qwerty')
    console.log(p.getValue())

    p.setOpen(false)
    console.log(p.getOpen())



    //LoginForm
    function LoginForm(parent) {
        const loginInput = document.createElement('input');
        loginInput.type = 'text';
        loginInput.placeholder = 'Enter your login';
        parent.appendChild(loginInput);

        const password = new Password(parent, true);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.disabled = true;
        parent.appendChild(submitButton);

        const updateSubmitButtonState = () => {
            submitButton.disabled = loginInput.value === '' || password.getValue() === '';
        };

        loginInput.addEventListener('input', updateSubmitButtonState);

        password.onChange = () => {
            updateSubmitButtonState();
        };

        password.onOpenChange = (open) => {
            console.log('Password visibility changed:', open);
        };

        submitButton.addEventListener('click', () => {
            console.log('Login submitted. Username:', loginInput.value, 'Password:', password.getValue());
        });
    }

    const loginForm = new LoginForm(document.body);
}

{
    //LoginForm Constructor
    function LoginForm(parent) {
        const loginInput = document.createElement('input');
        loginInput.type = 'text';
        loginInput.placeholder = 'Enter your login';
        parent.appendChild(loginInput);

        const password = new Password(parent, true);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.disabled = true;
        parent.appendChild(submitButton);

        let onSubmit = () => { };

        this.getLoginValue = function () {
            return loginInput.value;
        };

        this.getPasswordValue = function () {
            return password.getValue();
        };

        this.setOnSubmit = function (callback) {
            onSubmit = callback;
        };

        const updateSubmitButtonState = () => {
            submitButton.disabled = this.getLoginValue() === '' || this.getPasswordValue() === '';
        };

        loginInput.addEventListener('input', () => {
            updateSubmitButtonState();
        });

        password.onChange = () => {
            updateSubmitButtonState();
        };

        submitButton.addEventListener('click', () => {
            onSubmit(this.getLoginValue(), this.getPasswordValue());
        });
    }

    function Password(parent, open) {
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.value = '';
        parent.appendChild(passwordInput);

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Password';
        parent.appendChild(toggleButton);

        let isOpen = open;
        let value = '';

        this.onChange = (data) => { };
        this.onOpenChange = (open) => { };

        this.setValue = function (newValue) {
            value = newValue;
            this.onChange(value);
        };

        this.getValue = function () {
            return value;
        };

        this.setOpen = function (newOpen) {
            isOpen = newOpen;
            this.onOpenChange(isOpen);
            passwordInput.type = isOpen ? 'text' : 'password';
        };

        this.getOpen = function () {
            return isOpen;
        };

        this.setOpen(open);

        passwordInput.addEventListener('input', () => {
            this.setValue(passwordInput.value);
        });

        toggleButton.addEventListener('click', () => {
            this.setOpen(!isOpen);
        });
    }

    const loginForm = new LoginForm(document.body);

    loginForm.setOnSubmit((username, password) => {
        console.log('Login submitted. Username:', username, 'Password:', password);
    });
}

{
    //Password Verify
    function Password(parent, open) {
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.value = '';
        parent.appendChild(passwordInput);

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Password';
        parent.appendChild(toggleButton);

        let isOpen = open;
        let value = '';

        this.onChange = (data) => { };
        this.onOpenChange = (open) => { };

        this.setValue = function (newValue) {
            value = newValue;
            this.onChange(value);
        };

        this.getValue = function () {
            return value;
        };

        this.setOpen = function (newOpen) {
            isOpen = newOpen;
            this.onOpenChange(isOpen);
            passwordInput.type = isOpen ? 'text' : 'password';
        };

        this.getOpen = function () {
            return isOpen;
        };

        this.getElement = function () {
            return passwordInput;
        };

        this.setOpen(open);

        passwordInput.addEventListener('input', () => {
            this.setValue(passwordInput.value);
        });

        toggleButton.addEventListener('click', () => {
            this.setOpen(!isOpen);
        });
    }

    function PasswordVerify(parent) {
        const password1 = new Password(parent, true);
        const password2 = new Password(parent, true);
        password2.getElement().style.display = 'none';

        const updateSecondPasswordInputDisplay = () => {
            const displayStyle = password1.getOpen() ? 'none' : 'block';
            password2.getElement().style.display = displayStyle;
        };

        password1.onOpenChange = () => {
            updateSecondPasswordInputDisplay();
        };

        const verifyPasswords = () => {
            const value1 = password1.getValue();
            const value2 = password2.getValue();

            if (value1 !== value2) {
                password1.getElement().style.border = '1px solid red';
                password2.getElement().style.border = '1px solid red';
            } else {
                password1.getElement().style.border = '';
                password2.getElement().style.border = '';
            }
        };

        password1.onChange = verifyPasswords;
        password2.onChange = verifyPasswords;
    }

    const passwordVerify = new PasswordVerify(document.body);
}