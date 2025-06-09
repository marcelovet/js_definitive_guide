const maior = (val1, val2) => (val1 > val2 ? val1 : val2);

console.log(maior(30, 20));

const ePaisagem = (largura, altura) => largura > altura;
console.log(ePaisagem(1920, 1080));

function assessFizzBuzz(value) {
  if (typeof value !== 'number') return value;
  if (value % 3 === 0 && value % 5 === 0) return 'FizzBuzz';
  if (value % 3 === 0) return 'Fizz';
  if (value % 5 === 0) return 'Buzz';
  return value;
}

for (let i = 0; i < 1; i++) {
  console.log(i, assessFizzBuzz(i));
}

function createTimer() {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  return {
    get: () =>
      date.toLocaleTimeString('pt-BR', {
        hour12: false,
      }),
    add: (seconds) => {
      date.setSeconds(date.getSeconds() + seconds);
    },
  };
}

const innerTimer = createTimer();
const timer = setInterval(() => {
  console.log(innerTimer.get());
  innerTimer.add(10);
}, 1000);

setTimeout(() => {
  clearInterval(timer);
}, 10000);

// factory function using closures
function createCounter(counterId) {
  let counter = 0;
  return {
    // getter
    get counter() {
      return counter;
    },
    // setter
    set counter(value) {
      if (typeof value !== 'number') return;
      counter = value;
    },
    increment: () => {
      counter++;
    },
    decrement: () => {
      counter--;
    },
    reset: () => {
      counter = 0;
    },
    id: counterId,
    toString() {
      return `counter ${this.id}`;
    },
  };
}

let counter = createCounter(`counter 1`);
console.log(counter.counter);
counter.increment();
console.log(counter.counter);
counter.counter = 10;
console.log(counter.counter);
counter.decrement();
console.log(counter.counter);
counter.reset();
console.log(counter.counter);
console.log(counter.toString());
