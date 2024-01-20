function createStore(reducer) {
    let state = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs = []                     //массив подписчиков

    const getState = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
        () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка

    const dispatch = action => {
        if (typeof action === 'function') { //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state) { //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs) cb(state) //и запускаем подписчиков
        }
    }

    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

function combineReducers(reducers) {
    function totalReducer(state = {}, action) {
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)) {
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]) {
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length) {
            return { ...state, ...newTotalState }
        }
        return state
    }
    return totalReducer
}

function promiseReducer(state = {}, { name, type, status, payload, error }) {
    if (type === 'PROMISE') {
        return {
            ...state,
            [name]: { status, payload, error }
        }
    }
    return state
}

const authReducer = (state = {}, { type, token }) => {
    if (type === 'AUTH_LOGOUT') {
        return {}
    }
    if (type === 'AUTH_LOGIN') {
        const payload = jwtDecode(token)
        if (payload) {
            return { token, payload }
        }
    }
    return state
}

const jwtDecode = (token) => {
    try {
        let tokenParts = token.split('.')[1]
        let tokenJSON = atob(tokenParts)
        let normalToken = JSON.parse(tokenJSON)
        return normalToken
    }
    catch (e) {
    }
}

const cartReducer = (state = {}, { type, count, good }) => {
    if (type === 'CART_ADD') {
        const id = good._id;
        if (state[id]) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    count: state[id].count + count,
                    good
                },
            };
        } else {
            return {
                ...state,
                [id]: {
                    count,
                    good
                }
            };
        }
    }
    if (type === 'CART_SUB') {
        const id = good._id;
        if (state[id] && state[id].count > 0) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    count: state[id].count - count,
                    good,
                },
            };
        } else {
            let newState = { ...state };
            delete newState[id];
            return newState;
        }
    }
    if (type === 'CART_SET') {
        const id = good._id;
        if (state[id] && state[id].count > 0) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    count,
                    good
                },
            };
        } else {
            return {
                ...state,
                [id]: {
                    count,
                    good,
                }
            };
        }
    }
    if (type === 'CART_DEL') {
        const id = good._id;
        let newState = { ...state };
        delete newState[id];
        return newState;
    }
    if (type === 'CART_CLEAR') {
        return {};
    }

    return state;
};

function getGQL(adress) {
    return function gql(query, variables = {}) {
        return new Promise((resolve, reject) => {
            const headers = {}
            const token = store.getState().auth.token;
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            fetch(adress, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    ...headers
                },
                body: JSON.stringify({ query, variables }),
            }).then(res => res.json())
                .then((json) => {
                    if (json.errors) {
                        throw new Error(json.errors.message)
                    }
                    let data = json.data
                    let keys = Object.keys(data)
                    let result = data[keys[0]]
                    resolve(result)
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}

const address = "http://shop-roles.node.ed.asmer.org.ua/graphql";
const gql = getGQL(address);

function localStoredReducer(originalReducer, localStorageKey) {
    function wrapper(state, action) {
        if (typeof state === 'undefined') {
            let key = localStorage[localStorageKey]
            try {
                return JSON.parse(key)
            }
            catch (e) {
            }
        }
        const newState = originalReducer(state, action)
        localStorage.setItem(localStorageKey, JSON.stringify(newState))
        return newState
    }
    return wrapper
}

const reducers = {
    promise: promiseReducer,
    auth: localStoredReducer(authReducer, 'auth'),
    cart: localStoredReducer(cartReducer, 'cart')
}

const totalReducer = combineReducers(reducers)
const store = createStore(totalReducer)
store.subscribe(() => console.log(store.getState()))

const gqlRootCats = () =>
    gql(`query rootCats { 
    CategoryFind(query:"[{\\"parent\\": null}]"){
     _id name
   }
}`)
const gqlCatById = (_id) => {
    return gql(`query catById($q: String){
CategoryFindOne(query: $q){
  name parent {_id name} 
      subCategories{_id name}
      goods{_id name price images{url}}
}
}`,
        { q: JSON.stringify([{ _id }]) }
    )
}
const gqlGoodById = (_id) => {
    return gql(`query goodById($q: String){
   GoodFindOne(query: $q){
     _id name price description images{url}
   }
 }`,
        { q: JSON.stringify([{ _id }]) }
    )
}

const gqlLogin = (login, password) => {
    return gql(`query login($login:String, $password:String){
login(login:$login, password:$password)
}`, { login, password }
    )
}

const gqlRegister = (login, password) => {
    return gql(`mutation register($login:String, $password: String){
UserUpsert(user: {login:$login, password: $password}){
  login
}
}`, { login, password }
    )
}

const gqlOrderFind = () => {
    return gql(`query historyOrders {
OrderFind(query: "[{}]") {
  orderGoods { price total count good{name}}
    owner {
      login
    }
  }
}`
    )
}

const gqlOrderUpsert = (order) => {
    return gql(`mutation myOrder($order: OrderInput){
OrderUpsert(order:$order){
  _id
}
}`, { order }
    )
}

//имена добавить
const actionPromise = (name, promise) =>
    async dispatch => {
        dispatch(actionPending(name)) //сигнализируем redux, что промис начался
        try {
            const payload = await promise //ожидаем промиса
            dispatch(actionFulfilled(name, payload)) //сигнализируем redux, что промис успешно выполнен
            return payload //в месте запуска store.dispatch с этим thunk можно так же получить результат промиса
        }
        catch (error) {
            dispatch(actionRejected(name, error)) //в случае ошибки - сигнализируем redux, что промис несложился
        }
    }
const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token })
const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })
const actionFullLogin = (login, password) =>
    async dispatch => {
        const token = await dispatch(actionPromise('gqlLogin', gqlLogin(login, password)))
        if (jwtDecode(token)) {
            dispatch(actionAuthLogin(token))
        }
    }
const actionFullRegister = (login, password) =>
    async dispatch => {
        const registerUser = await dispatch(actionPromise('gqlRegister', gqlRegister(login, password)))
        if (registerUser) {
            dispatch(actionFullLogin(login, password))
        }
    }
const actionPending = (name) => ({ name, type: 'PROMISE', status: 'PENDING' })
const actionFulfilled = (name, payload) => ({ name, type: 'PROMISE', status: 'FULFILLED', payload })
const actionRejected = (name, error) => ({ name, type: 'PROMISE', status: 'REJECTED', error })
const actionCatById = (_id) => actionPromise('catById', gqlCatById(_id))
const actionGoodById = (_id) => actionPromise('goodById', gqlGoodById(_id))
const actionRootCats = () => actionPromise('rootCats', gqlRootCats())
store.dispatch(actionRootCats())
const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', count, good })
const actionCartSub = (good, count = 1) => ({ type: 'CART_SUB', count, good })
const actionCartDel = (good) => ({ type: 'CART_DEL', good })
const actionCartSet = (good, count = 1) => ({ type: 'CART_SET', count, good })
const actionCartClear = () => ({ type: 'CART_CLEAR' })
const actionFullOrder = () =>
    async (dispatch, getState) => {
        const orderGoods = []
        for (let key in getState().cart) {
            const { count, good } = getState().cart[key]
            const { _id } = good
            let order = { count, good: { _id } }
            orderGoods.push(order)
        }
        const orderInfo = { orderGoods }
        if (await dispatch(actionPromise('fullOrder', gqlOrderUpsert(orderInfo)))) {
            dispatch(actionCartClear())
            main.innerHTML = ""
        }
    };
const actionOrderHistory = () => actionPromise('history', gqlOrderFind())
const drawGood = (state) => {
    const [, route, _id] = location.hash.split('/')
    if (route !== 'good')
        return
    const { status, payload, error } = store.getState().promise.goodById || {}
    if (status === 'PENDING') {
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED') {
        const { name, price, description, images } = payload
        const orderButton = document.createElement('button')
        orderButton.innerText = "Додати до кошика"
        orderButton.onclick = () => {
            store.dispatch(actionCartAdd(payload))
        }
        main.innerHTML = `<h1>${name}</h1>
                       <img src="http://shop-roles.node.ed.asmer.org.ua/${images[0].url}" />
                       <section>Про товар: ${description}</section>
                       <section>Цена: ${price}</section>`
        main.append(orderButton)
    }
}
store.subscribe(drawGood)

function CartButtons(parent, good) {
    const numberInput = document.createElement('input');
    const minusButton = document.createElement('button');
    const plusButton = document.createElement('button');
    const changeButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    parent.appendChild(minusButton);
    parent.appendChild(numberInput);
    parent.appendChild(plusButton);
    parent.appendChild(changeButton);
    parent.appendChild(deleteButton);

    numberInput.type = 'number';
    numberInput.value = 1;
    minusButton.innerText = '-';
    plusButton.innerText = '+';
    changeButton.innerText = 'Змінити кількість';
    deleteButton.innerText = 'Видалити товар';

    minusButton.onclick = () => {
        let value = parseInt(numberInput.value);
        if (value > 1) {
            numberInput.value = value - 1;
        }
    };

    plusButton.onclick = () => {
        let value = parseInt(numberInput.value);
        numberInput.value = value + 1;
    };

    changeButton.onclick = () => {
        let newCount = parseInt(numberInput.value);
        store.dispatch(actionCartSet(good, newCount));
        location.reload();
    };

    deleteButton.onclick = () => {
        store.dispatch(actionCartDel(good));
        location.reload();
    };

    function getNumberInputValue() {
        return numberInput.value;
    }

    function setNumberInputValue(newNumber) {
        numberInput.value = newNumber;
    }

    this.getNumberInputValue = getNumberInputValue;
    this.setNumberInputValue = setNumberInputValue;
}

function Login(parent) {
    const loginInput = createInput('text', 'Введіть логін');
    const passwordInput = createInput('password', 'Введіть пароль');
    const showPasswordCheckbox = createCheckbox();
    const checkButton = createButton('Увійти');

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    formContainer.appendChild(loginInput);
    formContainer.appendChild(passwordInput);
    formContainer.appendChild(showPasswordCheckbox);
    formContainer.appendChild(checkButton);

    parent.appendChild(formContainer);

    function createInput(type, placeholder) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }

    function createCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        return checkbox;
    }

    function createButton(text) {
        const button = document.createElement('button');
        button.innerText = text;
        button.disabled = true;
        return button;
    }

    function togglePasswordVisibility() {
        passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    }

    function checkFormValidity() {
        const isNotEmpty = loginInput.value.trim() !== '' && passwordInput.value.trim() !== '';
        if (isNotEmpty) {
            checkButton.disabled = false;
        } else {
            checkButton.disabled = true;
        }
    }

    loginInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);
    showPasswordCheckbox.addEventListener('change', togglePasswordVisibility);

    checkButton.addEventListener('click', () => {
        parent.innerHTML = '';
        this.onclick(loginInput.value, passwordInput.value, showPasswordCheckbox.checked);
    });

    checkFormValidity();
}

function Register(parent) {
    const loginInput = createInput('text', 'Введіть логін');
    const passwordInput = createInput('password', 'Введіть пароль');
    const confirmPasswordInput = createInput('password', 'Підтвердіть пароль');
    const showPasswordCheckbox = createCheckbox();
    const registerButton = createButton('Зареєструватися');

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    formContainer.appendChild(loginInput);
    formContainer.appendChild(passwordInput);
    formContainer.appendChild(confirmPasswordInput);
    formContainer.appendChild(showPasswordCheckbox);
    formContainer.appendChild(registerButton);

    parent.appendChild(formContainer);

    function createInput(type, placeholder) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }

    function createCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        return checkbox;
    }

    function createButton(text) {
        const button = document.createElement('button');
        button.innerText = text;
        button.disabled = true;
        return button;
    }

    function togglePasswordVisibility() {
        passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    }

    function checkFormValidity() {
        const isNotEmpty = loginInput.value.trim() !== '' && passwordInput.value.trim() !== '' && confirmPasswordInput.value.trim() !== '';
        const isPasswordMatching = passwordInput.value === confirmPasswordInput.value;
        if (isNotEmpty && isPasswordMatching) {
            registerButton.disabled = false;
        } else {
            registerButton.disabled = true;
        }
    }

    togglePasswordVisibility();

    loginInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);
    confirmPasswordInput.addEventListener('input', checkFormValidity);
    showPasswordCheckbox.addEventListener('change', togglePasswordVisibility);

    registerButton.addEventListener('click', () => {
        parent.innerHTML = '';
        this.onclick(loginInput.value, passwordInput.value);
    });

    checkFormValidity();
}

function closeCart() {
    window.location.hash = '';
}

function updateHistory() {
    const history = document.getElementById('history')
    history.innerHTML = `<a href="#/history/">Історія замовлень</a>`
    const [, route] = location.hash.split('/');
    if (route !== 'history') return;

    const { status, payload, error } = store.getState().promise.history;
    if (status === 'FULFILLED' && payload) {
        const main = document.getElementById('main');
        main.innerHTML = '';

        const table = document.createElement('table');
        table.style.border = '1px solid black';
        table.style.width = '100%';

        let orderIndex = 1;
        for (const orderGoods of payload) {
            if (orderGoods.orderGoods.length === 0) continue;

            const trOrder = document.createElement('tr');
            const tdOrder = document.createElement('td');
            tdOrder.innerText = `Замовлення ${orderIndex++}`;
            trOrder.append(tdOrder);
            table.append(trOrder);

            for (const keys of orderGoods.orderGoods) {
                const headerTr = document.createElement('tr');
                headerTr.style.border = '1px solid black';

                const headerInfo = Object.keys(keys);
                headerInfo.forEach(element => {
                    const thTable = document.createElement('th');
                    thTable.style.border = '1px solid black';
                    thTable.innerText = element;
                    headerTr.append(thTable);
                });

                table.append(headerTr);

                const tableInfo = Object.values(keys);
                const trTable = document.createElement('tr');
                trTable.style.border = '1px solid black';

                tableInfo.forEach(element => {
                    const tdTable = document.createElement('td');
                    tdTable.style.border = '1px solid black';

                    if (typeof element === 'object') {
                        const { name } = element;
                        tdTable.innerText = name;
                    } else {
                        tdTable.innerText = element;
                    }

                    trTable.append(tdTable);
                });

                table.append(trTable);
            }
        }

        main.append(table);
    }
}

function totalCartQuantity(cart) {
    let totalQuantity = 0;
    for (const key in cart) {
      totalQuantity += cart[key].count;
    }
    return totalQuantity;
  }

store.subscribe(updateHistory);

store.subscribe(() => console.log(store.getState()))

store.subscribe(() => {
    const { status, payload, error } = store.getState().promise.rootCats
    if (status === 'FULFILLED' && payload) {
        aside.innerHTML = ''
        for (const { _id, name } of payload) {
            aside.innerHTML += `<a href="#/category/${_id}">${name}</a>`
        }
    }
})

store.subscribe(() => {
    const [, route] = location.hash.split('/')
    if (route !== 'category') return
    const { status, payload, error } = store.getState().promise.catById || {}
    if (status === 'PENDING') {
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED') {
        const { name, goods } = payload
        main.innerHTML = `<h1>${name}</h1>`
        for (const { _id, name, price, images } of goods) {
            main.innerHTML += `<a href="#/good/${_id}">${name}
    <img src = "http://shop-roles.node.ed.asmer.org.ua/${images[0].url}">
    </a>`
        }
    }
})

store.subscribe(() => {
    const payload = store.getState().auth.payload
    if (payload) {
        userLogin.innerHTML = payload.sub.login
        const logoutButton = document.createElement('button')
        userLogin.appendChild(logoutButton)
        logoutButton.innerHTML = 'Вийти'
        logoutButton.onclick = () => {
            store.dispatch(actionAuthLogout())
        }
    } else {
        userLogin.innerHTML = `<a href="#/login/">Увійти</a>`
    }
})
store.subscribe(() => {
    userRegister.innerHTML = `<a href ="#/register/">Зареєструватися</a>`
})
store.subscribe(() => {
    const cartItems = store.getState().cart;
    const totalQuantity = totalCartQuantity(cartItems);
    cartIcon.innerHTML = `<a href="#/cart/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShR0LMDtFgmI1BcNEAB5qCWL7y3mvzi3_SwQ&usqp=CAU"></a>
                         <div class="cart-quantity">${totalQuantity}</div>`;
});

window.onhashchange = () => {
    const [, route, _id] = location.hash.split('/')
    main.innerHTML = '';
    const routes = {
        category() {
            store.dispatch(actionCatById(_id))
        },

        good() {
            console.log('good', _id)
            store.dispatch(actionGoodById(_id))
        },

        login() {
            const loginUser = new Login(main)
            loginUser.onclick = (login, password) => {
                store.dispatch(actionFullLogin(login, password))
            }
        },

        register() {
            const registerUser = new Register(main)
            registerUser.onclick = (login, password) => {
                store.dispatch(actionFullRegister(login, password))
            }
        },

        cart() {
            const cartInfo = document.createElement('div');
            const field = document.createElement('div');
            const closeBtn = document.createElement('button');

            cartInfo.classList.add('cart');
            field.classList.add('cart-field');
            closeBtn.classList.add('close');

            cartInfo.innerHTML = `
            <h2>Товари у кошику:</h2>
            <button class="close" onclick="closeCart()">Закрити кошик</button>`;
            cartInfo.appendChild(field);
            main.appendChild(cartInfo);

            const cartItems = store.getState().cart;
            for (const key in cartItems) {
                const { good, count } = cartItems[key];
                const { name, description, price, images } = good;

                const cartBtn = new CartButtons(field, good);
                cartBtn.setNumberInputValue(count);

                const goodInfo = document.createElement('div');
                goodInfo.innerHTML = `
                <p>Назва: ${name}</p>
                <p>Опис: ${description}</p>
                <p>Ціна: ${price}</p>
                <img src="http://shop-roles.node.ed.asmer.org.ua/${images[0].url}">
                <p>Кількість: ${count}</p>`;

                field.appendChild(goodInfo);
            }

            closeBtn.onclick = () => {
                innerHTML = '';
                document.body.removeChild(cartInfo);
            };

            const orderButton = document.createElement('button');
            orderButton.innerText = 'Оформити замовлення';
            orderButton.onclick = () => {
                store.dispatch(actionFullOrder());
            };
            field.appendChild(orderButton);
        },

        history() {
            store.dispatch(actionPromise('history', gqlOrderFind()));
        }
    }
    if (route in routes) {
        routes[route]()
    }
}
window.onhashchange()