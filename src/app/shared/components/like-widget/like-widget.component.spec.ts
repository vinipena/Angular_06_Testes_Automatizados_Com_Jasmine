import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
  let component: LikeWidgetComponent = null;
  let fixture: ComponentFixture<LikeWidgetComponent>;
  //Para teste de componentes não é possivel declarar uma instancia do componente, pois os módulos
  //angular que gerenciam o ciclo de vida dos componentes.
  //__ o TestBed cria um "modulo" para a criação de uma instancia do componente como se fosse o ciclo normal de vida
  //__ do metodos. O metodo deve ser compilado após declarado, devido a isso ser uma ação assincrona, toda a função que chama
  //__ o TestBed deve ser asincrone, por isso a estrutura async - await.
  //____ O Angular por debaixo dos panos faz uma requisição assincrona para o template de seus componentes, por isso o
  //____ compileComponents retorna uma Promise, o metodo await, espera a resolução da promisse para instanciar o Modulo Mock.
  //______Essa estrutura é mais segura pois não depende do webpack para ser construida.

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //  imports:[LikeWidgetModule] - é possivel importar o metodo completa para dentro do TestBed,
      // garantindo todas as dependencias para o modulo que será usado em seu teste.
      declarations: [LikeWidgetComponent],
      providers: [UniqueIdService],
      imports: [FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
    // NÃO É UMA BOA PRATICA DECLARAR A fixture.detectChanged no beforeEach(), pois ele executa o metodo NgOnInit()
    //não dando tempo de declar nossas @Input properties.
    //fixture.detectChanges();
  });

  it('SHOULD create component', () => {
    expect(component).toBeTruthy();
  });
//a Descrição do it('',()=>{}) deve ser a mais clara possivel sobre a ação do teste e o que ele verificará
  it('SHOULD auto-generate Id during NgOnInit WHEN (@Input id) is not assigned', () => {
    //É responsabilidade do desenvolvedor inforar quando ocorre uma mudaça de estado de algum componente.
    //atraves da fixture.detectChanges. É possivel sobreescrever esse comportamento, porem, não é recomendado.
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });
  it('SHOULD NOT auto-generate an Id during NgOnInit WHEN (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });
  /*
  it(`#${LikeWidgetComponent.prototype.like.name} SHOULD trigger a emission WHEN called`,done=>{
    fixture.detectChanges();
    //para o testo do @Output() property, primeiramente deve-se chamar o metodo que irá disparar a espectativa
    //para depois disparar a @Output() property
    //__ Quando se realiza a asserção de funções assincronas (como Observables) é possivel declarar uma função no it(),
    //__para certificar que a função assincrona ocorreu, após a expectativa, caso a função não seja chamada um erro do teste
    //__ocorrerá
    component.liked.subscribe(()=>{
      expect(true).toBeTrue();
      done()
    })
    component.like()
  })
  */
  it(`#${LikeWidgetComponent.prototype.like.name}
  SHOULD trigger (@Output liked) WHEN called`, () => {
    //Ao contrario da solução anterior. O spyOn é uma função do jasmine que "espiona" o objeto a ela passado e
    //o metodo a ser testado. No caso do teste, ele cria uma referencia ao liked.emit e quando o metodo é chamado no like()
    //essa referencia é chamada dando o trigger para o  spy que o  .toHaveBeenCalled() espera.
    spyOn(component.liked,'emit');
    fixture.detectChanges()
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });
});
