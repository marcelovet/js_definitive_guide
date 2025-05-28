/**
 * ### **Exercício 18 - Verificação de Números**
 * Verifique se um valor é NaN usando Number.isNaN() e isNaN(). Qual a diferença?
 */
console.log(Number.isNaN(NaN)); // testa se um valor é NaN
// Não converte valores para number, então string não é NaN
console.log(Number.isNaN('texto'));
// isNaN converte valores para number, então string é NaN
console.log(isNaN('texto'));
