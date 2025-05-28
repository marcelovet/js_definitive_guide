/**
 * ### **Exercício 45 - Internacionalização**
 * Crie um sistema simples de i18n usando tagged templates.
 */
const i18n = (strings, ...values) => {
  const translations = {
    en: {
      hello: 'Hello',
      goodbye: 'Goodbye',
    },
    pt: {
      hello: 'Olá',
      goodbye: 'Tchau',
    },
  };
  const translation = translations[LANGUAGE];
  return strings.reduce((acc, str, i) => {
    const colonIndex = str.search(':');
    if (colonIndex !== -1) {
      const before = str.slice(0, colonIndex);
      const afterColon = str.substring(colonIndex + 1);
      const match = afterColon.match(/^(\w+)/);

      if (!match) return acc + str + (values[i] || '');

      const key = match[0];
      const after = afterColon.slice(match[0].length);

      return (
        acc +
        before +
        (translation[key.toLowerCase()] || key) +
        after +
        (values[i] || '')
      );
    }
    return acc + str + (values[i] || '');
  }, '');
};

let LANGUAGE = 'en';
console.log(i18n`:hello, ${'world'}! :goodbye`);
LANGUAGE = 'pt';
console.log(i18n`:hello, ${'mundo'}! :goodbye`);
console.log(i18n`:hello, ${'mundo'}! :notDefinedWordToTranslate`);
