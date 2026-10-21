import { Component, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AsoftyServiceService } from 'src/app/Services/asofty-service.service';
import { DataService } from 'src/app/Services/data.service';
import { dataUser } from 'src/app/model/dataUserModel';

type FaroPose = 'wave' | 'plan' | 'team' | 'leader' | 'data' | 'support' | 'security' | 'device' | 'gear' | 'save' | 'celebrate';

interface FaroPoseConfig {
  l: number;        // rotación del brazo izquierdo (grados)
  r: number;        // rotación del brazo derecho (grados)
  face: 'normal' | 'happy' | 'wink' | 'alert';
  prop?: string;    // objeto que acompaña a Faro
  wave?: boolean;   // brazo derecho saludando
  beam?: boolean;   // luz del faro encendida
}

interface TutorialStep {
  pose: FaroPose;
  title: string;
  text: string;
  say: string;
  short?: string;
}

const POSES: Record<FaroPose, FaroPoseConfig> = {
  wave: { l: 12, r: -150, face: 'happy', wave: true, beam: true },
  plan: { l: 40, r: -14, face: 'normal', prop: 'calendar' },
  team: { l: 12, r: -62, face: 'happy', prop: 'team' },
  leader: { l: 12, r: -160, face: 'normal', prop: 'flag' },
  data: { l: 18, r: -104, face: 'normal', prop: 'chart' },
  support: { l: 12, r: -12, face: 'wink', prop: 'headset' },
  security: { l: 58, r: -170, face: 'alert', prop: 'shield' },
  device: { l: 12, r: -44, face: 'normal', prop: 'laptop' },
  gear: { l: -26, r: 26, face: 'normal', prop: 'gear' },
  save: { l: 12, r: -62, face: 'happy', prop: 'save' },
  celebrate: { l: 150, r: -150, face: 'happy', prop: 'party', beam: true },
};

const RECOMMENDATIONS: TutorialStep[] = [
  {
    pose: 'plan', title: 'Arma un plan de trabajo', short: 'Plan de trabajo con cronograma',
    say: '¡Primero lo primero! Un buen plan evita sorpresas.',
    text: 'Antes de iniciar la implementación, desarrollen un plan de trabajo que les permita planificar el tiempo que tomará adaptarse al software FORWARTY. Sugerimos un cronograma de actividades.',
  },
  {
    pose: 'team', title: 'Elige tu equipo de implementación', short: 'Equipo con líderes de cada área',
    say: 'Nadie implementa solo. ¡Arma tu tripulación!',
    text: 'Puede estar integrado por los líderes de cada área. Esto les permitirá definir tareas específicas dentro del proceso y cumplir a tiempo con el plan de trabajo.',
  },
  {
    pose: 'leader', title: 'Nombra un líder de implementación', short: 'Líder con habilidades tecnológicas',
    say: 'Todo barco necesita a alguien al timón.',
    text: 'Se encarga de supervisar el cumplimiento de las actividades. Este líder debe contar con habilidades informáticas y tecnológicas.',
  },
  {
    pose: 'data', title: 'La información es responsabilidad tuya', short: 'Parametrizar y administrar bien',
    say: 'Datos bien configurados, resultados confiables.',
    text: 'El manejo de la información es responsabilidad exclusiva del usuario. El éxito de la plataforma depende de una adecuada parametrización y de su gestión como administrador del sistema.',
  },
  {
    pose: 'support', title: 'No estás solo', short: 'Soporte y opción de outsourcing',
    say: '¿Dudas? Mi equipo y yo estamos aquí para ayudarte.',
    text: 'Nuestro equipo humano los acompaña durante la implementación. También pueden pedir el servicio de outsourcing para una atención más personalizada, comunicándose con nuestros canales de atención.',
  },
  {
    pose: 'security', title: 'Cuida el acceso de administrador', short: 'No compartir la clave de admin',
    say: '¡Alto! La clave del administrador no se comparte.',
    text: 'Eviten compartir los datos de acceso del perfil de administrador. Si olvidan las credenciales, diríjanse a soporte: los guiarán en la recuperación a través de los canales oficiales.',
  },
  {
    pose: 'device', title: 'Conéctate desde equipos seguros', short: 'Computadores y redes seguras',
    say: 'Mi luz te avisa: evita las redes públicas.',
    text: 'Procuren acceder siempre a FORWARTY desde computadores seguros y eviten ingresar desde equipos con redes públicas.',
  },
  {
    pose: 'gear', title: '¿Necesitas algo más?', short: 'I+D para funciones adicionales',
    say: '¿Una función nueva? ¡Mis ingenieros la evalúan!',
    text: 'Somos una empresa con soluciones tecnológicas para el sector logístico. Si necesitan funcionalidades adicionales, nuestro equipo de investigación y desarrollo evalúa sus necesidades y les ofrece alternativas.',
  },
  {
    pose: 'save', title: 'Guarda siempre tus cambios', short: 'Guardar registros y ediciones',
    say: 'Lo que no se guarda, se pierde. ¡Guarda siempre!',
    text: 'Al ser una solución web, todos los registros que realicen y deseen conservar deben guardarse, incluidas sus ediciones. Esto se controla desde su gestión como administrador del sistema.',
  },
];

const CONFETTI_COLORS = ['#ff9500', '#ffb300', '#5fd8ff', '#2fd27a', '#ff6b5a'];

@Component({
  selector: 'app-admin-tutorials',
  templateUrl: './admin-tutorials.component.html',
  styleUrls: ['./admin-tutorials.component.css']
})
export class AdminTutorialsComponent implements AfterViewInit, OnDestroy {
  @Output() closeTutorial = new EventEmitter
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  user: dataUser | undefined;

  readonly recommendations = RECOMMENDATIONS;
  readonly steps: TutorialStep[] = [
    {
      pose: 'wave', title: '¡Bienvenidos a FORWARTY ERP Cloud!',
      say: '¡Hola! Soy Faro. Voy a iluminar tu camino en FORWARTY.',
      text: 'A partir de este momento forman parte de nuestra propuesta de transformación tecnológica. Algunos cambios parecen difíciles, pero esta innovación es sencilla e intuitiva. Te acompaño con 9 recomendaciones.',
    },
    ...RECOMMENDATIONS,
    {
      pose: 'celebrate', title: '¡Felicitaciones!',
      say: '¡Lo lograste! Ya estás listo para navegar.',
      text: 'Ahora puede dar inicio a su gestión empresarial a través de nuestra útil solución tecnológica.',
    },
  ];
  readonly confetti = Array.from({ length: 46 }, (_, i) => ({
    x: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    duration: 1.6 + Math.random() * 1.6,
    delay: Math.random() * 0.6,
  }));

  index = 0;
  sayText = '';
  typing = false;
  private typer: any;
  private readonly reducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  constructor(private service: AsoftyServiceService, private dataService: DataService) {
    let key = window.sessionStorage.getItem("_ucdk");
    this.dataService.setEncryptionKey(key !== null ? key : undefined);
    this.dataService.setStorageKey("_user_data");
    this.dataService.getDataAsync().then((userData: dataUser | undefined) => {
      this.user = userData;
      return this.dataService.getDataAsync();
    }).catch(error => {
      console.error(error);
    });
    this.speak();
  }

  get step(): TutorialStep { return this.steps[this.index]; }
  get pose(): FaroPoseConfig { return POSES[this.step.pose]; }
  get isFirst(): boolean { return this.index === 0; }
  get isLast(): boolean { return this.index === this.steps.length - 1; }
  get isRecommendation(): boolean { return !this.isFirst && !this.isLast; }
  get progress(): number { return this.index / (this.steps.length - 1) * 100; }
  get progressLabel(): string {
    if (this.isFirst) return 'Bienvenida';
    if (this.isLast) return '¡Listo!';
    return `Recomendación ${this.index} de ${this.recommendations.length}`;
  }

  next() {
    if (this.isLast) {
      this.firstlogging();
      return;
    }
    this.goTo(this.index + 1);
  }

  back() {
    if (!this.isFirst) this.goTo(this.index - 1);
  }

  skip() {
    this.goTo(this.steps.length - 1);
  }

  private goTo(index: number) {
    this.index = index;
    this.speak();
  }

  // Escribe el globo de Faro letra por letra
  private speak() {
    clearInterval(this.typer);
    const text = this.step.say;
    if (this.reducedMotion) {
      this.sayText = text;
      this.typing = false;
      return;
    }
    let i = 0;
    this.sayText = '';
    this.typing = true;
    this.typer = setInterval(() => {
      this.sayText = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(this.typer);
        this.typing = false;
      }
    }, 22);
  }

  firstlogging() {
    if (this.user) {
      let loginDto = {
        CompanyCode: this.user.companyCode,
        Username: this.user.username,
        Password: "",
      }
      this.service.connectApiPost("Auth/UpdateUserField?field=FirstLogin&value=0", loginDto, (res: any) => {
      })
    }
    setTimeout(() => {
      this.closeTutorial.emit()
    }, 700);
  }

  // La capa se mueve al <body> para que los contenedores del padre no la recorten ni la desplacen
  ngAfterViewInit() {
    document.body.appendChild(this.overlay.nativeElement);
  }

  ngOnDestroy() {
    clearInterval(this.typer);
    this.overlay?.nativeElement.remove();
  }
}
