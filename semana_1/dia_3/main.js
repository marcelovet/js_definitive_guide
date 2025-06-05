const pessoa1 = {
  nome: 'João',
  hobbies: ['ler', 'correr', 'cozinhar'],

  listarHobbies: function () {
    // this aqui é 'pessoa1'
    console.log(`${this.nome} gosta de:`);

    this.hobbies.forEach(function (hobby) {
      // this aqui é undefined (ou window no browser)
      console.log(`${this.nome} gosta de ${hobby}`); // Erro!
    });
  },
};

// Solução 1: Guardar referência
const pessoa2 = {
  nome: 'Maria',
  hobbies: ['ler', 'correr', 'cozinhar'],

  listarHobbies: function () {
    const self = this; // Guardamos a referência

    this.hobbies.forEach(function (hobby) {
      console.log(`${self.nome} gosta de ${hobby}`);
    });
  },
};

// Solução 2: Arrow function (binding léxico)
const pessoa3 = {
  nome: 'Pedro',
  hobbies: ['ler', 'correr', 'cozinhar'],

  listarHobbies: function () {
    // Arrow function herda o this do contexto
    this.hobbies.forEach((hobby) => {
      console.log(`${this.nome} gosta de ${hobby}`);
    });
  },
};

// Comparação: this em diferentes contextos
const exemploThis = {
  nome: 'Exemplo',

  metodoRegular: function () {
    console.log('Regular:', this.nome); // "Exemplo"

    setTimeout(function () {
      console.log('Regular timeout:', this.nome); // undefined
    }, 100);
  },

  metodoArrow: function () {
    console.log('Com arrow:', this.nome); // "Exemplo"

    setTimeout(() => {
      console.log('Arrow timeout:', this.nome); // "Exemplo"
    }, 100);
  },
};

const pessoas = [
  { nome: 'Bruno', idade: 30 },
  { nome: 'Ana', idade: 25 },
  { nome: 'Carlos', idade: 20 },
];

// Encadeamento com retorno implícito
const nomesMaiores25 = pessoas
  .filter((p) => p.idade > 20)
  .map((p) => p.nome)
  .sort((a, b) => a.localeCompare(b));

console.log(nomesMaiores25); // ["Bruno"]
