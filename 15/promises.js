{
    //fetch basic

    function createTable(domElement, jsonData) {
        const table = document.createElement('table');
        table.setAttribute('border', 1);

        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                const row = table.insertRow();
                const cell1 = row.insertCell();
                const cell2 = row.insertCell();
                cell1.textContent = key;
                cell2.textContent = jsonData[key];
            }
        }

        domElement.innerHTML = '';
        domElement.appendChild(table);
    }

    fetch('https://swapi.dev/api/people/1/')
        .then(res => res.json())
        .then(luke => {
            createTable(document.body, luke);
        })
        .catch(err => {
            console.error('Error', err);
        });
}

{
    //fetch improved

    function fetchPersonData(url) {
        return fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network error');
                }
                return res.json();
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    function createButton(link, cell, domElement) {
        const btn = document.createElement('button');
        btn.textContent = link;
        btn.addEventListener('click', function () {
            fetchPersonData(`https://swapi.dev/api/${link}`)
                .then(data => {
                    createTable(domElement, data);
                });
        });
        cell.appendChild(btn);
    }

    function createTable(domElement, jsonData) {
        const table = document.createElement('table');
        table.setAttribute('border', 1);

        for (const key in jsonData) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            cell1.textContent = key;

            if (!Array.isArray(jsonData[key])) {
                cell2.textContent = jsonData[key];
            } else {
                for (const elem of jsonData[key]) {
                    const buttonName = elem.split('api/')[1];
                    createButton(buttonName, cell2, domElement);
                }
            }
        }

        domElement.innerHTML = '';
        domElement.appendChild(table);
    }

    fetchPersonData('https://swapi.dev/api/people/1/')
        .then(luke => {
            createTable(document.body, luke);
        });
}

{
    //race

    function myFetch(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms, "promise"));
    }

    const request = myFetch('https://swapi.dev/api/people/1/');
    const delayPromise = delay(1100);

    Promise.race([request, delayPromise])
        .then(winner => {
            console.log('Швидше було:', winner === "promise" ? 'затримка' : 'запит');
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
}

{
    // Promisify: confirm

    function confirmPromise(text) {
        return new Promise ((resolve, reject) => {
            const result = confirm(text);

            if(result) {
                resolve();
            } else {
                reject();
            }
        });
    }

    confirmPromise('Проміси це складно?')
        .then(() => console.log('Не так вже й складно'))
        .catch(() => console.log('Respect за посидючість і уважність'));
}

{
    // Promisify: prompt

    function promptPromise(text) {
        return new Promise((resolve, reject) => {
            const userInput = prompt(text);

            if (userInput === null) {
                reject();
            } else {
                resolve(userInput);
            }
        });
    }

    promptPromise("Як тебе звуть?")
        .then(name => console.log(`Тебе звуть ${name}`))
        .catch(() => console.log('Ну навіщо морозитися, нормально ж спілкувалися'));
}

{
    //Promisify: LoginForm

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

    function loginPromise(parent) {
        return new Promise((resolve, reject) => {
            const form = new LoginForm(parent);

            form.setOnSubmit((username, password) => {
                resolve({ login: username, password: password });
            });
        });
    }

    loginPromise(document.body).then(({ login, password }) => {
        console.log(`Ви ввели ${login} та ${password}`);
    });
}