function createCounter(startNumber = 0) {
  let counter = Number(startNumber);
  counter = isNaN(counter) || counter < 0 ? 0 : counter;
  return {
    increment: () => counter++,
    decrement: () => counter--,
    reset: () => (counter = 0),
    value: () => counter,
  };
}

let counter = createCounter(-10);

console.log(counter.value());

for (counter; counter.value() < 10; counter.increment()) {
  console.log('incrementando');
}
console.log(counter.value());
counter.reset();
console.log(counter.value());
