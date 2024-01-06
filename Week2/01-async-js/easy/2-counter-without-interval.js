let counter = 0;

const counterFunction = () => {
    counter++;
    console.log(counter);
    setTimeout(counterFunction, 1000)
}

counterFunction()