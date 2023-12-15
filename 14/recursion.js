{
    //Рекурсія: HTML tree

    function htmlTree(node) {
        if (!node || typeof node !== 'object') {
            return '';
        }

        const { tagName, attrs, children } = node;

        let html = `<${tagName}`;

        if (attrs) {
            for (const [key, value] of Object.entries(attrs)) {
                html += ` ${key}='${value}'`;
            }
        }

        html += '>';

        if (Array.isArray(children)) {
            for (const child of children) {
                html += htmlTree(child);
            }
        } else if (typeof children === 'string') {
            html += children;
        }

        html += `</${tagName}>`;

        return html;
    }

    const table = {
        tagName: 'table',
        attrs: {
            border: "1",
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["1x1"],
                    },
                    {
                        tagName: "td",
                        children: ["1x2"],
                    },
                ]
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["2x1"],
                    },
                    {
                        tagName: "td",
                        children: ["2x2"],
                    },
                ]
            }
        ]
    };

    document.write(htmlTree(table));
}

{
    //Рекурсія: DOM tree

    function domTree(parent, node) {
        if (!node || typeof node !== 'object') {
            return;
        }

        const { tagName, attrs, children } = node;

        const element = document.createElement(tagName);

        if (attrs) {
            for (const [key, value] of Object.entries(attrs)) {
                element.setAttribute(key, value);
            }
        }

        parent.appendChild(element);

        if (Array.isArray(children)) {
            for (const child of children) {
                domTree(element, child);
            }
        } else if (typeof children === 'string') {
            element.textContent = children;
        }
    }

    const table = {
        tagName: 'table',
        attrs: {
            border: '1',
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['1x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['1x2'],
                    },
                ],
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['2x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['2x2'],
                    },
                ],
            },
        ],
    };

    domTree(document.body, table);
}

{
    //Рекурсія: Deep Copy

    function deepCopy(obj, memo = new WeakMap()) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        if (memo.has(obj)) {
            return memo.get(obj);
        }

        if (Array.isArray(obj)) {
            const copyArray = [];
            memo.set(obj, copyArray);
            for (let i = 0; i < obj.length; i++) {
                copyArray[i] = deepCopy(obj[i], memo);
            }
            return copyArray;
        }

        const copyObj = {};
        memo.set(obj, copyObj);

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                copyObj[key] = deepCopy(obj[key], memo);
            }
        }

        return copyObj;
    }

    const arr = [1, "string", null, undefined, { a: 15, b: 10, c: [1, 2, 3, 4], d: undefined, e: true }, true, false];
    const arr2 = deepCopy(arr);
    console.log(arr2);

    const table = {
        tagName: 'table',
        attrs: {
            border: '1',
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['1x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['1x2'],
                    },
                ],
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['2x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['2x2'],
                    },
                ],
            },
        ],
    };

    const table2 = deepCopy(table);
    console.log(table2);
}

{
    //Рекурсия: My Stringify

    function stringify(obj) {
        const seen = new WeakSet();

        return (function stringifyInternal(obj) {
            if (typeof obj === 'object' && obj !== null) {
                if (seen.has(obj)) {
                    throw new TypeError('Converting circular structure to JSON');
                }
                seen.add(obj);

                if (Array.isArray(obj)) {
                    return '[' + obj.map(element => stringifyInternal(element)).join(',') + ']';
                } else {
                    const keys = Object.keys(obj);
                    return '{' + keys.map(key => `"${key}":${stringifyInternal(obj[key])}`).join(',') + '}';
                }
            } else if (typeof obj === 'string') {
                return `"${obj}"`;
            } else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
                return String(obj);
            } else if (typeof obj === 'undefined') {
                return 'undefined';
            } else if (typeof obj === 'function') {
                return undefined;
            }
        })(obj);
    }

    const arr = [1, "string", null, undefined, { a: 15, b: 10, c: [1, 2, 3, 4], d: undefined, e: true }, true, false];
    const jsonString = stringify(arr);
    console.log(jsonString);

    const table = {
        tagName: 'table',
        attrs: {
            border: '1',
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['1x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['1x2'],
                    },
                ],
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['2x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['2x2'],
                    },
                ],
            },
        ],
    };

    const jsonStringTable = stringify(table);
    console.log(jsonStringTable);

    const parsedArr = JSON.parse(jsonString);
    const parsedTable = JSON.parse(jsonStringTable);

    console.log(parsedArr);
    console.log(parsedTable);
}

{
    //Рекурсія: getElementById throw

    function getElementById(idToFind) {
        let foundElement = null;

        function walker(parent) {
            for (const child of parent.children) {
                if (child.id === idToFind) {
                    throw child;
                }

                if (child.children.length > 0) {
                    walker(child);
                }
            }
        }

        try {
            walker(document.body);
        } catch (element) {
            foundElement = element;
        }

        return foundElement;
    }

    const resultElement = getElementById("elementId");

    if (resultElement) {
        console.log("Element found:", resultElement);
    } else {
        console.log("Element not found");
    }
}