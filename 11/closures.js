{
    //makeProfileTimer
    let makeProfileTimer = () => {
        let startTime = performance.now();
        return function() {
            let endTime = performance.now();
            return (endTime - startTime);
        }
    }

    const timer = makeProfileTimer()
    alert('Вимiрюємо час роботи цього alert');  //якийсь код, час виконання якого ми хочемо виміряти з високою точністю
    alert(timer()); //alert повинен вивести час у мілiсекундах від виконання makeProfileTimer до моменту виклику timer(), 
    // тобто виміряти час виконання alert
    const timer2 = makeProfileTimer()
    prompt('')
    alert(`Час роботи двух аlert та одного prompt ${timer()}`)
    alert(`Час роботи prompt та попереднього alert ${timer2()}`)
}

{
    //makeSaver
    let makeSaver = (inValue) => {
        let outValue;
        let called = false;
      
        return function() {
          if (!called) {
            outValue = inValue.apply(this, arguments);
            called = true;
          }
          return outValue;
        };
      }

    let saver = makeSaver(Math.random) //створює функцію-сховище результату переданої як параметр функції (Math.random 
    // у прикладі). На цьому етапі Math.random НЕ ВИКЛИКАЄТЬСЯ
    let value1 = saver()              //saver викликає передану в makeSaver функцію, запам'ятовує результат і повертає його
    let value2 = saver()              //saver надалі просто зберігає результат функції, і більше НЕ викликає передану 
    //в makeSaver функцію;
    alert(`Random: ${value1} === ${value2}`)

    let saver2 = makeSaver(() => {
        console.log('saved function called');
        return [null, undefined, false, '', 0, Math.random()][Math.floor(Math.random() * 6)]
    })
    let value3 = saver2()
    let value4 = saver2()

    value3 === value4 // теж має бути true

    let namePrompt = prompt.bind(window, 'Як тебе звуть?')
    let nameSaver = makeSaver(namePrompt)
    alert(`Привіт! Prompt ще не було!`)
    alert(`Привіт ${nameSaver()}. Щойно запустився prompt, перший та останній раз`)
    alert(`Слухай, ${nameSaver()}, го пити пиво. Адже prompt був лише один раз`)
}

{
    //myBind
    let myBind = (func, context, defaultArgs) => {
        return function (...args) {
            let mergedArgs = defaultArgs.map(arg => (arg !== undefined ? arg : args.shift()));
            return func.apply(context, mergedArgs.concat(args));
        };
    }

    let pow5 = myBind(Math.pow, Math, [, 5]) // перший параметр - функція для біндингу значень за замовчуванням, 
    // другий - this для цієї функції, третій - масив, в якому undefined означає
    // параметри, які мають передаватися під час виклику,
    // інші значення є значеннями за замовчуванням:
    let cube = myBind(Math.pow, Math, [, 3]) // cube зводить число в куб

    pow5(2) // => 32, викликає Math.pow(2,5), співвіднесіть з [undefined, 5]
    pow5(4) // => 1024, викликає Math.pow(4,5), співвіднесіть з [undefined, 5]
    cube(3) // => 27


    let chessMin = myBind(Math.min, Math, [, 4, , 5, , 8, , 9])
    chessMin(-1, -5, 3, 15) // викликає Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5



    let zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогічно, тільки тепер задається "0" як текст за замовчанням в prompt,
    // а текст запрошення користувача задається під час виклику zeroPrompt
    let someNumber = zeroPrompt("Введіть число") // викликає prompt("Введіть число","0")

    const bindedJoiner = myBind((...params) => params.join(''), null, [, 'b', , , 'e', 'f'])//('a','c','d') === 'abcdef'
    bindedJoiner('a', 'c', 'd') === 'abcdef'
    bindedJoiner('1', '2', '3') === '1b23ef'
}

{
    //checkResult
    function checkResult(original, validator) {
        function wrapper(...params) {
            let result;
            do {
                result = original.apply(this, params);
            } while (!validator(result));

            return result;
        }

        return wrapper;
    }

    //numberPrompt - це функція, яка буде запускати prompt до тих пір, поки користувач не введе число
    const numberPrompt = checkResult(prompt, x => !isNaN(+x))
    let number = +numberPrompt("Введіть число", "0")  //параметри передаються наскрізь до оригіналу. Не забудьте передати це, використовуючи call або apply

    //gamePrompt - це функція, яка буде запускати prompt доти, доки користувач не введе одне зі слів 'камінь', 'ножиці', 'папір'
    const gamePrompt = checkResult(prompt, x => ['камень', 'ножиці', 'папір'].includes(x.toLowerCase()))
    const turn = gamePrompt("Введіть щось зі списку: 'камень', 'ножиці', 'папір'")
}