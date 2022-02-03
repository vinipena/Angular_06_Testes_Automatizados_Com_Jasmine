import { UniqueIdService } from './unique-id.service';
//Estrutura minima para o teste de um artefato
//Describe nos informa qual elemento ou compenente iremos testar
//__Sempre evitar adotar o nome da classe como string, usar a declaração dinamicam para evitar falhas no futuro
describe(UniqueIdService.name, () => {
  //O beforeEach, cria uma instancia propria da classe UniqueIdService para cada teste
  //isso evita a duplicação de código e garante que cada teste tenha sua instancia exclusiva
  //da classe testada.
  let service: UniqueIdService = null;
  beforeEach(() => {
    service = new UniqueIdService();
  });

  //Cada "it" é uma função ou metodo que iremos testar, testa as condições serem verdadeiras ou falsas
  //__Tambem deve-se declarar dinamicamente o nome do metodo quando escrever o teste
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  SHOULD generate id WHEN called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');
    //Expect é a função que mostra a espectativa do retorno do teste
    //no caso o "id" deve conter "app-"
    //expect(id).toContain('app-');
    //__Melhorando a precsao do nosso teste, garantindo que o PREFIXO esteja correto.
    expect(id.startsWith('app-')).toBeTrue();
    /*
      expect(true).toBeTrue() - apenas testa tipos literais -> x = true  expect(x).toBeTrue() -- true

      expect(true).toBe(true) - Apenas testa mesma referencia -> x = new Boolean(true) - expect(x).toBe(x)

      expect(true).toBeTrusthy() - Se pelo runtime do JS for verdadeiro ele passa. bastante generico.

    */

  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    SHOULD not generate duplicate ids WHEN called multiple times`, () => {
    //Set gera um conjunto de dados, que não podem ser duplicados,
    //caso haja uma duplicata ela é ignorada e não adicionada no Set
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    //O expect espera que as 50 chamadas do for sejam unicas, sendo assim o Set tem 50 ids unicos
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}
  SHOULD return the number of generated ids WHEN called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');

    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  SHOULD throw  WHEN called with empty`, () => {
    const emptyValues = [null, undefined, '', '0', '1'];
    emptyValues.forEach((emptyValue) => {
      //Para verificarmos que um metodo pretente lançar um exceção, é preciso chamar o metodo dentro de uma função
      //para verificarmos o retorno da função a qual chamou o metodo testado.
      //__ .withContext da o contesto para qual das multiplas expressões testadas ocorrerá a falha no teste.
      //__ dessa forma auxiliando no entendimento de expects que testas diversas condições.
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value: ${emptyValue}`)
        .toThrow();
    });
  });
});
