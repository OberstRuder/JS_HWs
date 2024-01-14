{
    //Світлофор

    let trafficLightConfig = (lightColor) => {
        lightColor.id = "light-color";
        lightColor.style.width = "150px";
        lightColor.style.height = "150px";
        lightColor.style.borderRadius = "50%";
        lightColor.style.border = "1px solid black";
        lightColor.style.margin = "10px";
        document.body.append(lightColor);
    }

    let red = document.createElement("div");
    let yellow = document.createElement("div");
    let green = document.createElement("div");

    trafficLightConfig(red);
    trafficLightConfig(yellow);
    trafficLightConfig(green);

    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));

    let timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    document.body.append(timerDisplay);

    async function updateTimerDisplay(time) {
        for (let i = time/1000; i>0; i--)
        {
            document.getElementById("timer").innerText = `Time left: ${i}s`;
            await delay(1000);
        }
    }

    async function trafficLight() {
        const greenTime = 5000;
        const yellowTime = 1000;
        const redTime = 5000;

        while (true) {
            console.log("Green Light");
            updateTimerDisplay(greenTime);
            green.style.backgroundColor = "green";
            red.style.backgroundColor = "grey";
            yellow.style.backgroundColor = "grey";
            await delay(greenTime);

            console.log("Yellow Light");
            updateTimerDisplay(yellowTime);
            green.style.backgroundColor = "grey";
            red.style.backgroundColor = "grey";
            yellow.style.backgroundColor = "yellow";
            await delay(yellowTime);

            console.log("Red Light");
            updateTimerDisplay(redTime);
            green.style.backgroundColor = "grey";
            red.style.backgroundColor = "red";
            yellow.style.backgroundColor = "grey";
            await delay(redTime);

            console.log("Yellow Light");
            updateTimerDisplay(yellowTime);
            green.style.backgroundColor = "grey";
            red.style.backgroundColor = "grey";
            yellow.style.backgroundColor = "yellow";
            await delay(yellowTime);
        }
    }

    trafficLight();
}

{
    //PedestrainTrafficLight

    let trafficLightConfig = (lightColor) => {
        lightColor.id = "light-color";
        lightColor.style.width = "150px";
        lightColor.style.height = "150px";
        lightColor.style.borderRadius = "50%";
        lightColor.style.border = "1px solid black";
        lightColor.style.margin = "10px";
        document.body.append(lightColor);
    }

    let red = document.createElement("div");
    let green = document.createElement("div");

    trafficLightConfig(red);
    trafficLightConfig(green);

    let button = document.createElement("button");
    button.id = "walkButton";
    button.innerHTML = "Press for green";
    document.body.append(button);

    const delay = ms => new Promise(ok => setTimeout(ok, ms));

    function domEventPromise(element, eventName) {
        return new Promise(resolve => {
            const handler = () => {
                element.removeEventListener(eventName, handler);
                resolve();
            };
            element.addEventListener(eventName, handler);
        });
    }

    async function pedestrianTrafficLight() {

        while (true) {
            console.log('Red Light');
            red.style.backgroundColor = 'red';
            green.style.backgroundColor = 'grey';
            button.removeAttribute('disabled');
            await Promise.race([delay(10000),
                 domEventPromise(button, 'click')
                 .then(() => button.setAttribute('disabled', true))
                 .then(()=> delay(4000))]);
            button.setAttribute('disabled', true);

            console.log('Green Light');
            red.style.backgroundColor = 'grey';
            green.style.backgroundColor = 'green';
            await delay(5000);
        }
    }

    pedestrianTrafficLight();
}

{
    //speedtest

    const delay = ms => new Promise(ok => setTimeout(ok, ms));

    async function speedtest(getPromise, count, parallel = 1) {
        const start = Date.now();
        let parallelDurations = 0;

        for (let i = 0; i < count; i++) {
            const promises = Array.from({ length: parallel }, () => getPromise());
            const parallelStart = Date.now();
            await Promise.all(promises);
            const parallelEnd = Date.now();
            parallelDurations += parallelEnd - parallelStart;
        }

        const end = Date.now();
        const duration = end - start;
        const queryDuration = duration / (count * parallel);
        const querySpeed = 1 / queryDuration;
        const parallelDuration = parallelDurations / count;
        const parallelSpeed = parallel / parallelDuration;

        return {
            duration,
            querySpeed,
            queryDuration,
            parallelSpeed,
            parallelDuration
        };
    }

    speedtest(() => delay(1000), 10, 10).then(result => console.log(result));

    speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)
        .then(result => console.log(result));
}

{
    //gql

    async function gql(endpoint, query, variables) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    ; (async () => {
        const catQuery = `query cats($q: String){
                                            CategoryFind(query: $q){
                                                _id name
                                            }
                                        }`
        const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", catQuery, { q: "[{}]" })
        console.log(cats) //список категорій з _id name та всім таким іншим


        const loginQuery = `query login($login:String, $password:String){
                                    login(login:$login, password:$password)
                            }`

        const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery, { login: "test457", password: "123123" })
        console.log(token)
    })()
}

{
    //jwtDecode

    function jwtDecode(token) {
        try {
            if (!token) {
                return undefined;
            }

            const parts = token.split('.');
            if (parts.length !== 3) {
                return undefined;
            }

            const decodedPayload = atob(parts[1]);
            const payload = JSON.parse(decodedPayload);

            return payload;
        } catch (error) {
            return undefined;
        }
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw"
    console.log(jwtDecode(token))
    //{
    //  "sub": {
    //    "id": "632205aeb74e1f5f2ec1a320",
    //    "login": "test457",
    //    "acl": [
    //      "632205aeb74e1f5f2ec1a320",
    //      "user"
    //    ]
    //  },
    //  "iat": 1668272163
    //}

    try {
        console.log(jwtDecode())         //undefined
        console.log(jwtDecode("дічь"))   //undefined
        console.log(jwtDecode("ey.ey.ey"))   //undefined

        console.log('до сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором')
    }
    finally {
        console.log('ДЗ, мабуть, закінчено')
    }
}