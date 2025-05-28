/**
 * ### **Exercício 43 - Symbol Iterator**
 * Crie um objeto iterável customizado usando Symbol.iterator.
 */

const iterator = {
  [Symbol.iterator]() {
    let index = 0;
    const iterable = 'abacate';
    return {
      next: () => {
        if (index < 7) {
          return { value: iterable.charAt(index++), done: false };
        }
        return { done: true };
      },
    };
  },
};

for (const value of iterator) {
  console.log(value);
}
