## 📝 50 Exercícios de Funções em JavaScript

### 🟢 Nível Básico (20 exercícios)

#### 1. Criando sua primeira função

Crie uma função chamada `cumprimentar` que receba um nome como parâmetro e retorne a string "Olá, [nome]!".

```javascript
// Sua solução aqui
function cumprimentar(nome) {
  // ?
}

// Teste
console.log(cumprimentar('Maria')); // "Olá, Maria!"
```

#### 2. Função de soma simples

Crie uma função `somar` que receba dois números e retorne a soma deles.

```javascript
// Sua solução aqui

// Teste
console.log(somar(5, 3)); // 8
console.log(somar(10, 20)); // 30
```

#### 3. Conversão para Arrow Function

Converta a função abaixo para arrow function:

```javascript
function multiplicar(a, b) {
  return a * b;
}

// Converta para arrow function aqui

// Teste
console.log(multiplicar(4, 5)); // 20
```

#### 4. Função com parâmetro padrão

Crie uma função `potencia` que eleve um número a uma potência. Se a potência não for informada, use 2 como padrão.

```javascript
// Sua solução aqui

// Teste
console.log(potencia(5)); // 25
console.log(potencia(3, 3)); // 27
```

#### 5. Verificador de paridade

Crie uma função `ehPar` que retorne true se o número for par e false se for ímpar.

```javascript
// Sua solução aqui

// Teste
console.log(ehPar(4)); // true
console.log(ehPar(7)); // false
```

#### 6. Calculadora de área

Crie uma função `areaRetangulo` que calcule a área de um retângulo (base × altura).

```javascript
// Sua solução aqui

// Teste
console.log(areaRetangulo(5, 3)); // 15
console.log(areaRetangulo(10, 7)); // 70
```

#### 7. Conversor de temperatura

Crie uma função `celsiusParaFahrenheit` que converta temperatura de Celsius para Fahrenheit usando a fórmula: F = C × 9/5 + 32

```javascript
// Sua solução aqui

// Teste
console.log(celsiusParaFahrenheit(0)); // 32
console.log(celsiusParaFahrenheit(100)); // 212
```

#### 8. Função de máximo

Crie uma função `maximo` que retorne o maior entre dois números.

```javascript
// Sua solução aqui

// Teste
console.log(maximo(5, 3)); // 5
console.log(maximo(2, 8)); // 8
```

#### 9. Contador de caracteres

Crie uma função `contarCaracteres` que retorne o número de caracteres em uma string.

```javascript
// Sua solução aqui

// Teste
console.log(contarCaracteres('JavaScript')); // 10
console.log(contarCaracteres('Olá')); // 3
```

#### 10. Verificador de maioridade

Crie uma função `ehMaiorDeIdade` que receba uma idade e retorne true se for maior ou igual a 18.

```javascript
// Sua solução aqui

// Teste
console.log(ehMaiorDeIdade(17)); // false
console.log(ehMaiorDeIdade(18)); // true
console.log(ehMaiorDeIdade(25)); // true
```

#### 11. Inversor de string

Crie uma função `inverterString` que inverta uma string.

```javascript
// Sua solução aqui

// Teste
console.log(inverterString('JavaScript')); // "tpircSavaJ"
console.log(inverterString('abc')); // "cba"
```

#### 12. Calculadora de desconto

Crie uma função `calcularDesconto` que receba um preço e uma porcentagem de desconto, retornando o preço final.

```javascript
// Sua solução aqui

// Teste
console.log(calcularDesconto(100, 10)); // 90
console.log(calcularDesconto(50, 20)); // 40
```

#### 13. Gerador de iniciais

Crie uma função `obterIniciais` que receba nome e sobrenome e retorne as iniciais em maiúsculas.

```javascript
// Sua solução aqui

// Teste
console.log(obterIniciais('joão', 'silva')); // "JS"
console.log(obterIniciais('maria', 'santos')); // "MS"
```

#### 14. Validador de email simples

Crie uma função `emailValido` que verifique se uma string contém "@" e ".".

```javascript
// Sua solução aqui

// Teste
console.log(emailValido('user@email.com')); // true
console.log(emailValido('invalido')); // false
```

#### 15. Calculadora de média

Crie uma função `calcularMedia` que receba três números e retorne a média.

```javascript
// Sua solução aqui

// Teste
console.log(calcularMedia(10, 8, 6)); // 8
console.log(calcularMedia(5, 5, 5)); // 5
```

#### 16. Função de repetição

Crie uma função `repetir` que receba uma string e um número, retornando a string repetida n vezes.

```javascript
// Sua solução aqui

// Teste
console.log(repetir('Ha', 3)); // "HaHaHa"
console.log(repetir('!', 5)); // "!!!!!"
```

#### 17. Conversor de primeira letra

Crie uma função `primeiraLetraMaiuscula` que converta a primeira letra de uma string para maiúscula.

```javascript
// Sua solução aqui

// Teste
console.log(primeiraLetraMaiuscula('javascript')); // "Javascript"
console.log(primeiraLetraMaiuscula('olá mundo')); // "Olá mundo"
```

#### 18. Verificador de número positivo

Crie uma função `ehPositivo` que retorne true se o número for positivo, false se for negativo ou zero.

```javascript
// Sua solução aqui

// Teste
console.log(ehPositivo(5)); // true
console.log(ehPositivo(-3)); // false
console.log(ehPositivo(0)); // false
```

#### 19. Função de concatenação

Crie uma função `concatenar` que junte duas strings com um espaço entre elas.

```javascript
// Sua solução aqui

// Teste
console.log(concatenar('Olá', 'Mundo')); // "Olá Mundo"
console.log(concatenar('Java', 'Script')); // "Java Script"
```

#### 20. Calculadora de anos

Crie uma função `idadeEmDias` que receba uma idade em anos e retorne em dias (considere 365 dias por ano).

```javascript
// Sua solução aqui

// Teste
console.log(idadeEmDias(10)); // 3650
console.log(idadeEmDias(25)); // 9125
```

### 🟡 Nível Intermediário (20 exercícios)

#### 21. Função com múltiplos argumentos

Crie uma função `somarTodos` que aceite qualquer quantidade de números e retorne a soma de todos.

```javascript
// Use o objeto arguments ou rest parameters
// Sua solução aqui

// Teste
console.log(somarTodos(1, 2, 3)); // 6
console.log(somarTodos(5, 10, 15, 20)); // 50
```

#### 22. Closure contador

Crie uma função `criarContador` que retorne um objeto com métodos para incrementar, decrementar e obter o valor atual.

```javascript
// Sua solução aqui

// Teste
const contador = criarContador();
console.log(contador.incrementar()); // 1
console.log(contador.incrementar()); // 2
console.log(contador.decrementar()); // 1
console.log(contador.valor()); // 1
```

#### 23. Função de mapeamento personalizada

Crie sua própria versão da função `map` chamada `meuMap`.

```javascript
// Sua solução aqui

// Teste
const numeros = [1, 2, 3, 4];
console.log(meuMap(numeros, (x) => x * 2)); // [2, 4, 6, 8]
```

#### 24. Factory de saudações

Crie uma função `criarSaudacao` que retorne uma função personalizada de saudação.

```javascript
// Sua solução aqui

// Teste
const bomDia = criarSaudacao('Bom dia');
const boaNoite = criarSaudacao('Boa noite');
console.log(bomDia('João')); // "Bom dia, João!"
console.log(boaNoite('Maria')); // "Boa noite, Maria!"
```

#### 25. Função recursiva de fatorial

Implemente o cálculo de fatorial usando recursão.

```javascript
// Sua solução aqui

// Teste
console.log(fatorial(5)); // 120
console.log(fatorial(0)); // 1
```

#### 26. Validador com closure

Crie uma função `criarValidadorIdade` que retorne uma função validadora com idade mínima configurável.

```javascript
// Sua solução aqui

// Teste
const podeVotar = criarValidadorIdade(16);
const podeDirigir = criarValidadorIdade(18);
console.log(podeVotar(15)); // false
console.log(podeVotar(17)); // true
console.log(podeDirigir(17)); // false
```

#### 27. Função de filtro personalizada

Crie sua própria versão da função `filter` chamada `meuFilter`.

```javascript
// Sua solução aqui

// Teste
const numeros = [1, 2, 3, 4, 5, 6];
console.log(meuFilter(numeros, (x) => x % 2 === 0)); // [2, 4, 6]
```

#### 28. Calculadora com closure

Crie uma função `criarCalculadora` que mantenha um resultado acumulado.

```javascript
// Sua solução aqui

// Teste
const calc = criarCalculadora();
console.log(calc.somar(5)); // 5
console.log(calc.multiplicar(2)); // 10
console.log(calc.subtrair(3)); // 7
console.log(calc.resultado()); // 7
```

#### 29. Fibonacci recursivo

Implemente a sequência de Fibonacci usando recursão.

```javascript
// Sua solução aqui

// Teste
console.log(fibonacci(0)); // 0
console.log(fibonacci(1)); // 1
console.log(fibonacci(7)); // 13
```

#### 30. Função de composição

Crie uma função `compor` que combine duas funções em uma.

```javascript
// Sua solução aqui

// Teste
const dobrar = (x) => x * 2;
const somar10 = (x) => x + 10;
const dobrarESomar10 = compor(dobrar, somar10);
console.log(dobrarESomar10(5)); // 20 (5 * 2 + 10)
```

#### 31. Objeto com métodos usando this

Crie um objeto `pessoa` com métodos que usem `this` corretamente.

```javascript
// Sua solução aqui
const pessoa = {
  nome: 'João',
  idade: 25,
  // adicione métodos aqui
};

// Teste
console.log(pessoa.apresentar()); // "Olá, sou João e tenho 25 anos"
console.log(pessoa.aniversario()); // 26
```

#### 32. Função de reduce personalizada

Crie sua própria versão da função `reduce` chamada `meuReduce`.

```javascript
// Sua solução aqui

// Teste
const numeros = [1, 2, 3, 4];
console.log(meuReduce(numeros, (acc, val) => acc + val, 0)); // 10
```

#### 33. Gerador de ID único com closure

Crie uma função `criarGeradorId` que retorne IDs únicos incrementais.

```javascript
// Sua solução aqui

// Teste
const gerador = criarGeradorId();
console.log(gerador()); // 1
console.log(gerador()); // 2
console.log(gerador()); // 3
```

#### 34. Soma de array recursiva

Crie uma função recursiva que some todos os elementos de um array.

```javascript
// Sua solução aqui

// Teste
console.log(somaArray([1, 2, 3, 4])); // 10
console.log(somaArray([])); // 0
```

#### 35. Função de debounce simples

Crie uma função `debounce` que adie a execução de uma função.

```javascript
// Sua solução aqui

// Teste
const log = debounce(() => console.log('Executado!'), 1000);
log(); // Aguarda 1 segundo antes de executar
```

#### 36. Contador de chamadas

Crie uma função que conte quantas vezes foi chamada.

```javascript
// Sua solução aqui

// Teste
const funcao = contadorChamadas((x) => x * 2);
console.log(funcao(5)); // 10
console.log(funcao(3)); // 6
console.log(funcao.contador); // 2
```

#### 37. Palíndromo recursivo

Verifique se uma string é palíndromo usando recursão.

```javascript
// Sua solução aqui

// Teste
console.log(ehPalindromo('arara')); // true
console.log(ehPalindromo('javascript')); // false
```

#### 38. Função de memoização

Crie uma função que memorize resultados de cálculos.

```javascript
// Sua solução aqui

// Teste
const fibMemo = memoize(fibonacci);
console.time('Primeira');
console.log(fibMemo(35));
console.timeEnd('Primeira');
console.time('Segunda');
console.log(fibMemo(35)); // Muito mais rápido!
console.timeEnd('Segunda');
```

#### 39. Busca em profundidade

Crie uma função recursiva que busque um valor em uma árvore.

```javascript
const arvore = {
  valor: 10,
  esquerda: {
    valor: 5,
    esquerda: { valor: 3 },
    direita: { valor: 7 },
  },
  direita: {
    valor: 15,
    esquerda: { valor: 12 },
    direita: { valor: 20 },
  },
};

// Sua solução aqui

// Teste
console.log(buscarNaArvore(arvore, 7)); // true
console.log(buscarNaArvore(arvore, 100)); // false
```

#### 40. Pipeline de funções

Crie uma função `pipeline` que execute funções em sequência.

```javascript
// Sua solução aqui

// Teste
const resultado = pipeline(
  5,
  (x) => x * 2,
  (x) => x + 10,
  (x) => x / 2
);
console.log(resultado); // 10
```

### 🔴 Nível Avançado (5 exercícios)

#### 41. Sistema de eventos com closures

Crie um sistema de eventos completo com `on`, `emit` e `off`.

```javascript
// Sua solução aqui
function criarEventEmitter() {
  // implementar
}

// Teste
const emitter = criarEventEmitter();
const handler = (data) => console.log(`Recebido: ${data}`);
emitter.on('message', handler);
emitter.emit('message', 'Olá!'); // "Recebido: Olá!"
emitter.off('message', handler);
emitter.emit('message', 'Teste'); // Nada acontece
```

#### 42. Árvore binária com métodos recursivos

Implemente uma árvore binária com inserção e busca recursivas.

```javascript
// Sua solução aqui
class ArvoreBinaria {
  // implementar constructor, inserir, buscar
}

// Teste
const arvore = new ArvoreBinaria();
arvore.inserir(10);
arvore.inserir(5);
arvore.inserir(15);
arvore.inserir(3);
console.log(arvore.buscar(5)); // true
console.log(arvore.buscar(100)); // false
```

#### 43. Parser de expressões matemáticas

Crie um parser recursivo para expressões matemáticas simples.

```javascript
// Sua solução aqui
// Deve suportar +, -, *, / e parênteses

// Teste
console.log(calcularExpressao('2 + 3 * 4')); // 14
console.log(calcularExpressao('(2 + 3) * 4')); // 20
```

#### 44. Sistema de roteamento com closures

Crie um roteador simples para aplicações web.

```javascript
// Sua solução aqui
function criarRoteador() {
  // implementar
}

// Teste
const router = criarRoteador();
router.adicionar('/home', () => 'Página inicial');
router.adicionar('/sobre', () => 'Sobre nós');
router.adicionar('/usuario/:id', (params) => `Usuário ${params.id}`);

console.log(router.navegar('/home')); // "Página inicial"
console.log(router.navegar('/usuario/123')); // "Usuário 123"
```

#### 45. Implementação de Promises com closures

Crie uma versão simplificada de Promise.

```javascript
// Sua solução aqui
class MinhaPromise {
  // implementar constructor, then, catch
}

// Teste
const promise = new MinhaPromise((resolve, reject) => {
  setTimeout(() => resolve('Sucesso!'), 1000);
});

promise.then((resultado) => console.log(resultado));
```

### 🏆 Desafios (5 exercícios)

#### 46. Interpretador de linguagem simples

Crie um interpretador para uma linguagem de programação minimalista.

```javascript
// Sua solução deve interpretar comandos como:
// SET x 10
// SET y 20
// ADD x y
// PRINT result

// Sua solução aqui

// Teste
const programa = ['SET x 10', 'SET y 20', 'ADD x y result', 'PRINT result'];
executarPrograma(programa); // 30
```

#### 47. Motor de template recursivo

Crie um motor de template que suporte loops e condicionais.

```javascript
// Sua solução aqui

// Teste
const template = `
  {{#if logado}}
    Olá, {{nome}}!
    {{#each itens}}
      - {{this}}
    {{/each}}
  {{/if}}
`;

const dados = {
  logado: true,
  nome: 'João',
  itens: ['Item 1', 'Item 2', 'Item 3'],
};

console.log(renderizar(template, dados));
```

#### 48. Sistema de cache LRU com closures

Implemente um cache LRU (Least Recently Used) completo.

```javascript
// Sua solução aqui
function criarCacheLRU(tamanhoMaximo) {
  // implementar
}

// Teste
const cache = criarCacheLRU(3);
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('d', 4); // Remove 'a' (menos usado)
console.log(cache.get('a')); // undefined
console.log(cache.get('b')); // 2
```

#### 49. Máquina de estados com closures

Crie uma máquina de estados finitos configurável.

```javascript
// Sua solução aqui

// Teste
const semaforo = criarMaquinaDeEstados({
  inicial: 'vermelho',
  estados: {
    vermelho: { proximo: () => 'verde' },
    verde: { proximo: () => 'amarelo' },
    amarelo: { proximo: () => 'vermelho' },
  },
});

console.log(semaforo.estado()); // "vermelho"
semaforo.transicao();
console.log(semaforo.estado()); // "verde"
```

#### 50. Framework reativo miniatura

Crie um sistema reativo simples com observadores e computados.

```javascript
// Sua solução aqui

// Teste
const estado = criarEstadoReativo({
  nome: 'João',
  idade: 25,
});

const nomeCompleto = computado(() => `${estado.nome} (${estado.idade} anos)`);

observar(() => {
  console.log(`Atualizado: ${nomeCompleto.valor}`);
});

estado.idade = 26; // Dispara: "Atualizado: João (26 anos)"
```

---

## 📚 Dicas de Estudo

1. **Comece pelos básicos**: Domine os exercícios 1-20 antes de avançar
2. **Pratique diariamente**: Faça pelo menos 2-3 exercícios por dia
3. **Debugue seu código**: Use `console.log` para entender o fluxo
4. **Compare soluções**: Existem várias formas de resolver cada problema
5. **Não pule níveis**: A progressão foi pensada para construir conhecimento

## 🎯 Como verificar suas soluções

Para cada exercício:

1. Escreva sua solução
2. Execute os testes fornecidos
3. Verifique se a saída corresponde ao esperado
4. Se não funcionar, debug passo a passo

Lembre-se: o importante é entender os conceitos, não apenas fazer o código funcionar!

Boa prática e sucesso nos estudos! 🚀

Precisa de ajuda com algum exercício específico? Estou aqui para explicar e guiar você!
