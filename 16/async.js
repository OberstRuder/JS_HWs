{
    //chat
    let in1 = document.createElement('input');
    let in2 = document.createElement('input');
    let btn = document.createElement('button');
    let msgCont = document.createElement('div');

    in1.type = "text";
    in1.id = "nick";
    in1.placeholder = "nick";
    in1.style.width = "100%";
    in1.style.fontSize = "2em";

    in2.type = "text";
    in2.id = "message";
    in2.placeholder = "message";
    in2.style.width = "100%";
    in2.style.fontSize = "2em";

    btn.id = "send"
    btn.innerText = 'Send';
    btn.style.width = "100%";
    btn.style.fontSize = "2em";
    btn.onclick = send;

    msgCont.id = "msgCont"

    document.body.append(in1);
    document.body.append(in2);
    document.body.append(btn);
    document.body.append(msgCont);

    let nextMessageId = 0;
    const chatUrl = "http://students.a-level.com.ua:10012";

    function jsonPost(url, data) {
        return new Promise((resolve, reject) => {
            fetch (url, {method: 'POST', body: JSON.stringify(data)})
            .then(response => {
                console.log(response);
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(jsonData => {
                resolve(jsonData);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    async function getMessages() {
        const response = await jsonPost(chatUrl, {func: "getMessages", messageId: nextMessageId });
        const messageContainer = document.getElementById("msgCont");

        response.data.forEach(msg => {
            const div = document.createElement('div');
            div.classList.add('message');

            const msgTime = new Date(msg.timestamp);
            const strTime = `- ${msgTime.getHours()}:${msgTime.getMinutes()} | ${msgTime.getDay()}.${msgTime.getMonth()}`;

            div.innerHTML = `<strong>${msg.nick}:</strong> ${msg.message} <small>${strTime}</small>`;
            messageContainer.prepend(div);
        });

        if (response.data.length > 0) {
            nextMessageId = response.nextMessageId;
        }
    }

    async function sendMessage(nick, message) {
        const response = await jsonPost(chatUrl, { func: 'addMessage', nick: nick, message: message });
        nextMessageId = response.nextMessageId;
    }

    async function send() {
        const nick = document.getElementById('nick').value;
        const message = document.getElementById('message').value;
        await sendMessage(nick, message);
        await getMessages();
    }

    function delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    async function checker() {
        while (true) {
            await getMessages();
            await delay(5000);
        }
    }

    window.onload = checker();
}

{
    //swapi links

    const swapiUrl = "https://swapi.dev/api/people/20";

    async function swapiLinks(url) { 
        const res = await fetch(url); 
        const data = await res.json();
        const includeUrl = "https://swapi.dev/api/"
     
        const promises = Object.keys(data).map(async (key) => { 
            if (typeof data[key] === 'string' && data[key].includes(includeUrl)) { 
                const res = await fetch(data[key]); 
                data[key] = await res.json(); 
            } else if (Array.isArray(data[key])) { 
                const promises2 = data[key].map(async (element) => { 
                    if (typeof element === 'string' && element.includes(includeUrl)) { 
                        const res = await fetch(element); 
                        return await res.json(); 
                    } 
                    return element; 
                }); 
                data[key] = await Promise.all(promises2); 
            } 
            return data[key]; 
        }); 
     
        await Promise.all(promises); 
        return data; 
    } 
     
    swapiLinks(swapiUrl, true) 
        .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4))) 
        .catch(error => console.error(error));
}

{
    //domEventPromise

    function domEventPromise(element, eventName) {
        function executor(resolve) {
            const action = (e) => {
                element.removeEventListener(eventName, action);
                resolve(e);
            }
            element.addEventListener(eventName, action);
        }
        return new Promise(executor);
    }

    const knopka = document.createElement('button');
    knopka.style.width = "100px";
    knopka.style.height = "50px";
    knopka.textContent = "Click me!";
    document.body.append(knopka);

    domEventPromise(knopka, 'click').then(e => console.log('event click happens', e));
}