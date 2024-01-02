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
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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