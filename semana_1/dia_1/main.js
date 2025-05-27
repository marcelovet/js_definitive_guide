function validar(strings, ...valores) {
  const regras = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    telefone: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  };

  return valores.every((valor, index) => {
    const tipoValidacao = strings[index].match(/:(\w+)$/)?.[1];
    if (tipoValidacao && regras[tipoValidacao]) {
      return regras[tipoValidacao].test(valor);
    }
    return true;
  });
}

const email = 'user@example.com';
const cpf = '123.456.789-10';
const valido = validar`:email${email} :cpf${cpf} :telefone${'(11) 1234-5678'}`;
console.log(valido); // true ou false
