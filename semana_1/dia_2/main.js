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

const frutas = ['Pera', 'Maçã', 'Uva'];

for (const i in frutas) {
  console.log(i, frutas[i]);
}

const objeto = { nome: 'fulano', sobrenome: 'sicrano', idade: 22 };

for (const i in objeto) {
  console.log(i, objeto[i]);
}

for (const i of frutas) {
  console.log(i);
}

frutas.forEach((fruta) => console.log(fruta));
