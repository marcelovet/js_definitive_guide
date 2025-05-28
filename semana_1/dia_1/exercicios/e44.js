/**
 * ### **Exercício 44 - Formatador SQL Seguro**
 * Implemente um tagged template que previna SQL injection.
 */

function sql(strings, ...values) {
  const sanitezedValues = values.map((value) => {
    if (typeof value === 'string') {
      return `'${value.replace(/'/g, "''")}'`;
    }
    return value;
  });
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] ? sanitezedValues[i] : '');
  }, '');
}
const nome = 'John';
const idade = 30;
const query = sql`SELECT * FROM users WHERE name = ${nome} AND age = ${idade}`;
console.log(query);

// testing sql injection
const sqlInjection = sql`SELECT * FROM users WHERE name = ${'John" OR 1=1 --'}`;
console.log(sqlInjection); // SELECT * FROM users WHERE name = 'John" OR 1=1 --'
