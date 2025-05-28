/**
 * ### **Exercício 33 - Nullish Coalescing**
 * Use ?? para definir valores padrão diferenciando de ||. Mostre casos onde ?? é melhor.
 */

const getAttribute = (obj, attr, defaultValue) => {
  return obj[attr] ?? defaultValue;
};
const getAttributeUnexpected = (obj, attr, defaultValue) => {
  return obj[attr] || defaultValue;
};

// ?? is better when a falsy value is expected and returning a default value when it occurs is not desired.
console.log(getAttribute({}, 'name', 'Unknown')); // Unknown
console.log(getAttribute({ name: 'John' }, 'name', 'Unknown')); // John
console.log(getAttribute({ name: '' }, 'name', 'Unknown')); // ''
console.log(getAttributeUnexpected({ name: '' }, 'name', 'Unknown')); // Unknown
