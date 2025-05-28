/**
 * ### **Exercício 30 - BigInt**
 * Crie operações com BigInt para números maiores que Number.MAX_SAFE_INTEGER.
 */

const bigValue = 9007199254740991000n;
const bigValue2 = 9007199254740992100n;
console.log(bigValue + bigValue2);
console.log(bigValue > Number.MAX_SAFE_INTEGER);
