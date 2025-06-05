// for classico
for (let index = 0; index < 6; index++) {
  console.log(`Linha ${index}`);
}

function range(start = 0, end, step = 1) {
  return Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, v) => start + v * step
  );
}

console.log(range(0, 21, 2));
