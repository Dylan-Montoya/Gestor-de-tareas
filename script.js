import * as THREE from 'three';

const realms = [
  {
    id: 'nightmare', mood: 'LA PESADILLA', title: 'El bosque<br /><em>que olvidó</em>',
    description: 'Hay algo esperando entre los árboles torcidos.<br />No todos los sueños quieren que los despiertes.',
    caption: 'UN LUGAR QUE RECUERDAS', sky: 0x17121c, fog: 0x17121c, ground: 0x211c23, accent: 0xe75f56,
    challenge: 'Encuentra 3 brasas y evita a la Sombra.', collectible: 'brasas', monster: 'LA SOMBRA', type: 'collect', target: 3,
  },
  {
    id: 'ocean', mood: 'EL SUEÑO LÚCIDO', title: 'Donde duerme<br /><em>el océano</em>',
    description: 'Un mar suspendido sobre las nubes.<br />Aquí, hasta las estrellas tienen reflejo.',
    caption: 'EL CIELO TAMBIÉN PUEDE SER MAR', sky: 0x294e76, fog: 0x4777a0, ground: 0x397395, accent: 0x9fe5ee,
    challenge: 'Cruza 4 portales de luz en el orden de las mareas.', collectible: 'portales', monster: 'EL AHOGALUCES', type: 'checkpoint', target: 4,
  },
  {
    id: 'memory', mood: 'LA NOSTALGIA', title: 'La calle de<br /><em>los veranos</em>',
    description: 'La última tarde de agosto nunca se terminó.<br />La casa todavía deja la luz encendida.',
    caption: 'EL VERANO QUE NO SE ACABA', sky: 0x413b66, fog: 0x625276, ground: 0x54475a, accent: 0xffc18a,
    challenge: 'Toca los símbolos en orden: 2 → 1 → 3.', collectible: 'símbolos', monster: 'EL PERRO DE HUMO', type: 'sequence', target: 3, sequence: [1, 0, 2],
  },
  {
    id: 'garden', mood: 'EL JARDÍN DORADO', title: 'Un lugar<br /><em>para volver</em>',
    description: 'Todo lo que alguna vez amaste florece aquí.<br />Puedes descansar. Este sueño es amable.',
    caption: 'AQUÍ TODO VUELVE A FLORECER', sky: 0x647da0, fog: 0x8eabc0, ground: 0x597c70, accent: 0xf6d797,
    challenge: 'Sobrevive 22 segundos al Jardinero Hueco.', collectible: 'segundos', monster: 'EL JARDINERO HUECO', type: 'survive', target: 22,
  },
  {
    id: 'clockwork', mood: 'LA CIUDAD IMPOSIBLE', title: 'Las horas<br /><em>extraviadas</em>',
    description: 'Los relojes caminan por las paredes.<br />La ciudad espera que le devuelvas el tiempo.',
    caption: 'NINGÚN RELOJ MARCA LA MISMA HORA', sky: 0x393348, fog: 0x64516c, ground: 0x4c4554, accent: 0xf2bc72,
    challenge: 'Da cuerda a 3 relojes detenidos con E.', collectible: 'relojes', monster: 'EL MINUTERO', type: 'activate', target: 3,
  },
  {
    id: 'crystal', mood: 'EL DESIERTO DE CRISTAL', title: 'La luna<br /><em>enterrada</em>',
    description: 'La arena canta cuando la pisa el viento.<br />Algo brilla bajo las dunas violetas.',
    caption: 'SIGUE EL BRILLO ENTRE LAS DUNAS', sky: 0x574b70, fog: 0x9b7a99, ground: 0x927c8c, accent: 0x9be8e0,
    challenge: 'Junta 3 lunas de cristal antes del Espejismo.', collectible: 'lunas de cristal', monster: 'EL ESPEJISMO', type: 'collect', target: 3,
  },
  {
    id: 'library', mood: 'LA BIBLIOTECA VIVA', title: 'El libro<br /><em>sin final</em>',
    description: 'Los pasillos cambian cuando parpadeas.<br />El bibliotecario no quiere que leas el final.',
    caption: 'CADA LIBRO RECUERDA QUIÉN LO ABRIÓ', sky: 0x30293e, fog: 0x584457, ground: 0x453440, accent: 0xe1b77b,
    challenge: 'Activa los símbolos en orden: 3 → 1 → 2.', collectible: 'libros', monster: 'EL BIBLIOTECARIO', type: 'sequence', target: 3, sequence: [2, 0, 1],
  },
  {
    id: 'rain', mood: 'LA CIUDAD DE LLUVIA', title: 'Neón bajo<br /><em>la tormenta</em>',
    description: 'Los letreros murmuran nombres olvidados.<br />En cada charco se esconde una puerta.',
    caption: 'SIGUE LAS LUCES DE NEÓN', sky: 0x182737, fog: 0x26485a, ground: 0x263e49, accent: 0x54f1d0,
    challenge: 'Enciende los 4 faroles de la calle con E.', collectible: 'faroles', monster: 'EL PARAGUAS VACÍO', type: 'activate', target: 4,
  },
  {
    id: 'cathedral', mood: 'LA CATEDRAL INVERTIDA', title: 'El techo<br /><em>es el suelo</em>',
    description: 'Las campanas cuelgan hacia el cielo.<br />Encuentra las salidas antes que el eco.',
    caption: 'ARRIBA Y ABAJO SON LO MISMO', sky: 0x282443, fog: 0x55486e, ground: 0x40394f, accent: 0xc3a3ff,
    challenge: 'Cruza 4 arcos suspendidos sin perder el rumbo.', collectible: 'arcos', monster: 'EL ECO', type: 'checkpoint', target: 4,
  },
  {
    id: 'carnival', mood: 'EL CARNAVAL VACÍO', title: 'La última<br /><em>función</em>',
    description: 'El carrusel gira sin música ni caballos.<br />El payaso ya sabe que llegaste.',
    caption: 'NO MIRES AL PAYASO A LOS OJOS', sky: 0x49243a, fog: 0x683c54, ground: 0x59394e, accent: 0xffc15b,
    challenge: 'Aguanta 24 segundos hasta que pare la música.', collectible: 'segundos', monster: 'EL DIRECTOR', type: 'survive', target: 24,
  },
  {
    id: 'train', mood: 'EL TREN NOCTURNO', title: 'Destino<br /><em>ninguna parte</em>',
    description: 'Cada vagón abre a una noche diferente.<br />Encuentra el silbato del conductor.',
    caption: 'EL TREN NUNCA LLEGA A LA ESTACIÓN', sky: 0x202c42, fog: 0x354b62, ground: 0x393e4b, accent: 0xffd18c,
    challenge: 'Encuentra y activa 4 silbatos de estación con E.', collectible: 'silbatos', monster: 'EL REVISOR', type: 'activate', target: 4,
  },
  {
    id: 'volcano', mood: 'EL VOLCÁN DE PAPEL', title: 'La montaña<br /><em>que respira</em>',
    description: 'Lava de tinta corre por las páginas.<br />Salta entre piedras antes de que arda.',
    caption: 'LAS PÁGINAS TAMBIÉN PUEDEN ARDER', sky: 0x4b211f, fog: 0x803b2d, ground: 0x50342e, accent: 0xff784e,
    challenge: 'Salta por 5 piedras seguras para cruzar la lava.', collectible: 'piedras', monster: 'EL INKDRAGÓN', type: 'checkpoint', target: 5,
  },
  {
    id: 'aurora', mood: 'EL CIELO AURORA', title: 'La noche<br /><em>de colores</em>',
    description: 'Las auroras escriben cartas en el cielo.<br />Recoge sus fragmentos antes del alba.',
    caption: 'EL CIELO ESTÁ INTENTANDO DECIRTE ALGO', sky: 0x172b48, fog: 0x325771, ground: 0x294653, accent: 0x83ffcf,
    challenge: 'Recoge 4 fragmentos de aurora por el valle.', collectible: 'fragmentos', monster: 'EL DEVORALUZ', type: 'collect', target: 4,
  },
  {
    id: 'swamp', mood: 'EL PANTANO SUSURRANTE', title: 'Las aguas<br /><em>que llaman</em>',
    description: 'El agua pronuncia tu nombre bajito.<br />Solo la secuencia correcta abre el paso.',
    caption: 'NO RESPONDAS A LOS SUSURROS', sky: 0x1e332d, fog: 0x42604c, ground: 0x32473a, accent: 0xc5dd65,
    challenge: 'Activa los símbolos en orden: 1 → 3 → 2.', collectible: 'símbolos', monster: 'LA MADRE DEL LODO', type: 'sequence', target: 3, sequence: [0, 2, 1],
  },
  {
    id: 'moon', mood: 'LA CARA OCULTA', title: 'El jardín<br /><em>de la luna</em>',
    description: 'La gravedad cambia con cada paso.<br />Resiste hasta que regrese la luz.',
    caption: 'LA LUNA TAMBIÉN TIENE SUEÑOS', sky: 0x11172e, fog: 0x242e50, ground: 0x35354b, accent: 0xd5c8ff,
    challenge: 'Sobrevive 26 segundos a la gravedad extraña.', collectible: 'segundos', monster: 'EL ASTRÓNOMO', type: 'survive', target: 26,
  },
  {
    id: 'maze', mood: 'EL LABERINTO VIVO', title: 'Cada camino<br /><em>te recuerda</em>',
    description: 'Los muros se mueven cuando no los miras.<br />Encuentra la salida sin repetir camino.',
    caption: 'EL CAMINO DE VUELTA TAMBIÉN CAMBIA', sky: 0x263a32, fog: 0x4b6252, ground: 0x465746, accent: 0xe7d37e,
    challenge: 'Atraviesa 5 puertas en el orden de sus luces.', collectible: 'puertas', monster: 'EL DOBLE', type: 'checkpoint', target: 5,
  },
  {
    id: 'islands', mood: 'LAS ISLAS FLOTANTES', title: 'El cielo<br /><em>sin orillas</em>',
    description: 'Cada isla flota sobre una historia distinta.<br />Activa los anclajes para abrir el puente.',
    caption: 'EL VIENTO CONOCE EL CAMINO', sky: 0x477499, fog: 0x91b6ca, ground: 0x7d998a, accent: 0xffe39e,
    challenge: 'Activa 4 anclajes de nube con E.', collectible: 'anclajes', monster: 'EL PASTOR DE NUBES', type: 'activate', target: 4,
  },
  {
    id: 'toybox', mood: 'LA CAJA DE JUGUETES', title: 'Hora de<br /><em>volver a jugar</em>',
    description: 'Los juguetes despertaron primero que tú.<br />Encuentra las piezas de tu muñeco.',
    caption: 'ALGUIEN DEJÓ LA CAJA ABIERTA', sky: 0x53527b, fog: 0x8c779a, ground: 0x8d787e, accent: 0xffadbc,
    challenge: 'Encuentra 4 piezas de tu muñeco perdido.', collectible: 'piezas', monster: 'EL SOLDADO DE PLOMO', type: 'collect', target: 4,
  },
  {
    id: 'mirror', mood: 'EL PALACIO DE ESPEJOS', title: 'Al otro<br /><em>lado de ti</em>',
    description: 'Tu reflejo se mueve un instante después.<br />Descubre qué versión es la real.',
    caption: 'LOS REFLEJOS TAMBIÉN TIENEN SECRETOS', sky: 0x252b43, fog: 0x46506a, ground: 0x494959, accent: 0x9fe5ee,
    challenge: 'Activa los símbolos en orden: 3 → 1 → 4 → 2.', collectible: 'espejos', monster: 'TU REFLEJO', type: 'sequence', target: 4, sequence: [2, 0, 3, 1],
  },
  {
    id: 'dreamcore', mood: 'EL FIN DEL SUEÑO', title: 'La puerta<br /><em>que despierta</em>',
    description: 'Todo lo soñado termina en este lugar.<br />Una última prueba te espera en el centro.',
    caption: 'SOÑAR ES OTRA FORMA DE VOLVER', sky: 0x34233f, fog: 0x60455f, ground: 0x4c3a52, accent: 0xf1c4ff,
    challenge: 'Mantén la calma durante 30 segundos y llega al final.', collectible: 'segundos', monster: 'EL DESPERTADOR', type: 'survive', target: 30,
  },
];

const sceneRoot = document.querySelector('#scene');
const title = document.querySelector('#realm-title');
const description = document.querySelector('#realm-description');
const mood = document.querySelector('#realm-mood');
const realmIndex = document.querySelector('#realm-index');
const caption = document.querySelector('#caption-text');
const realmList = document.querySelector('#realm-list');
const challengePanel = document.querySelector('#challenge-panel');
const challengeTitle = document.querySelector('#challenge-title');
const challengeProgressBar = document.querySelector('#challenge-progress-bar');
const challengeProgressText = document.querySelector('#challenge-progress-text');
const monsterName = document.querySelector('#monster-name');
const monsterWarning = document.querySelector('#monster-warning');
const flashButton = document.querySelector('#flash-button');
const challengeButton = document.querySelector('#challenge-button');
const prompt = document.querySelector('#prompt');
const toast = document.querySelector('#toast');
const count = document.querySelector('#dream-count');
const intro = document.querySelector('#intro');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
sceneRoot.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(realms[0].sky);
scene.fog = new THREE.FogExp2(realms[0].fog, 0.018);
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 180);
camera.position.set(0, 1.65, 5);
const player = new THREE.Group();
player.position.set(0, 0, 6);
scene.add(player);
player.add(camera);
camera.position.set(0, 1.65, 0);

const hemisphere = new THREE.HemisphereLight(0xb9c3e6, 0x211b29, 1.25);
scene.add(hemisphere);
const keyLight = new THREE.DirectionalLight(0xffdfbb, 1.7);
keyLight.position.set(-5, 12, 4);
scene.add(keyLight);

const clock = new THREE.Clock();
const keys = new Set();
const interactiveGates = [];
const animated = [];
const found = new Set();
found.add(0);
const challengeProgress = Array.from({ length: realms.length }, () => 0);
const challengeElapsed = Array.from({ length: realms.length }, () => 0);
const challengeCollected = realms.map(() => new Set());
const challengeItems = [];
let activeRealm = 0;
let started = false;
let locked = false;
let nearGate = null;
let yaw = 0;
let pitch = 0;
let toastTimer;
let audioContext = null;
let soundEnabled = false;
let drone = null;
let touchLook = null;
let monster = null;
let flashReadyAt = 0;

const material = (color, roughness = 0.8, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, ...extra });
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(1, 16, 12);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 8);

function addMesh(geometry, mat, parent, position, scale, rotation) {
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.set(...position);
  if (scale) mesh.scale.set(...scale);
  if (rotation) mesh.rotation.set(...rotation);
  parent.add(mesh);
  return mesh;
}

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function randomBetween(rng, min, max) { return min + rng() * (max - min); }

function clearEnvironment() {
  while (scene.children.length > 3) {
    const child = scene.children[scene.children.length - 1];
    scene.remove(child);
  }
  scene.add(hemisphere, keyLight, player);
  interactiveGates.length = 0;
  animated.length = 0;
  challengeItems.length = 0;
  monster = null;
  nearGate = null;
  monsterWarning.classList.remove('visible');
}

function makeGround(realm, rng) {
  const mat = material(realm.ground, 0.95);
  const floor = addMesh(new THREE.PlaneGeometry(180, 180, 44, 44), mat, scene, [0, -0.07, 0], [1, 1, 1], [-Math.PI / 2, 0, 0]);
  const positions = floor.geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    positions.setZ(i, (Math.sin(x * 0.14 + rng()) + Math.cos(y * 0.11) * .8) * (realm.id === 'ocean' ? .4 : .12));
  }
  positions.needsUpdate = true;
  floor.geometry.computeVertexNormals();
}

function makeTree(x, z, height, realm, rng) {
  const trunkMaterial = material(realm.id === 'nightmare' ? 0x19151b : realm.id === 'memory' ? 0x40313c : 0x354948);
  const trunk = addMesh(cylinderGeometry, trunkMaterial, scene, [x, height / 2, z], [.22 + rng() * .12, height, .22 + rng() * .12], [0, 0, (rng() - .5) * .3]);
  trunk.castShadow = true;
  for (let branch = 0; branch < 4; branch++) {
    const y = height * (.45 + rng() * .45);
    const limb = addMesh(cylinderGeometry, trunkMaterial, scene, [x + (rng() - .5) * 1.8, y, z + (rng() - .5) * 1.5], [.1, height * .38, .1], [0, 0, (rng() - .5) * 1.1 + (x > 0 ? .4 : -.4)]);
    limb.castShadow = true;
    if (realm.id !== 'nightmare') {
      const crown = addMesh(sphereGeometry, material(realm.id === 'memory' ? 0x725471 : 0x91a67c), scene, [limb.position.x, y + height * .2, limb.position.z], [1.1, .8, 1.1]);
      animated.push({ object: crown, phase: rng() * 6, amount: .08 });
    }
  }
}

function makeHouse(rng) {
  const house = new THREE.Group();
  house.position.set(-9, 0, -22);
  scene.add(house);
  const walls = material(0x9f8277);
  const roof = material(0x342c44);
  const door = material(0x44333b);
  addMesh(boxGeometry, walls, house, [0, 3.2, 0], [8, 6.4, 7]);
  const gable = addMesh(new THREE.ConeGeometry(5.8, 3.7, 4), roof, house, [0, 8.15, 0], [1, 1, .9], [0, Math.PI / 4, 0]);
  gable.rotation.y = Math.PI / 4;
  addMesh(boxGeometry, door, house, [0, 1.35, 3.55], [1.5, 2.7, .15]);
  const windowMat = new THREE.MeshStandardMaterial({ color: 0xffcf91, emissive: 0xffa64c, emissiveIntensity: 1.7 });
  for (const x of [-2.5, 2.5]) {
    addMesh(boxGeometry, windowMat, house, [x, 3.9, 3.57], [1.15, 1.45, .12]);
    addMesh(boxGeometry, material(0x6a484b), house, [x, 3.9, 3.67], [.07, 1.5, .04]);
    addMesh(boxGeometry, material(0x6a484b), house, [x, 3.9, 3.67], [1.2, .07, .04]);
  }
  const chimney = addMesh(boxGeometry, material(0x56434a), house, [2.4, 8, -1.5], [1, 3.6, 1]);
  chimney.rotation.z = .08 + rng() * .08;
}

function makeLantern(x, z, color, height = 3.3) {
  addMesh(cylinderGeometry, material(0x282b3c, .45, { metalness: .5 }), scene, [x, height / 2, z], [.09, height, .09]);
  const lampMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2 });
  const lamp = addMesh(sphereGeometry, lampMat, scene, [x, height + .12, z], [.23, .27, .23]);
  const light = new THREE.PointLight(color, 2.1, 8);
  light.position.set(x, height + .2, z);
  scene.add(light);
  animated.push({ object: lamp, phase: x + z, amount: .4, light });
}

function makeNightmare(rng, realm) {
  for (let i = 0; i < 38; i++) {
    const angle = rng() * Math.PI * 2;
    const radius = 11 + rng() * 39;
    makeTree(Math.cos(angle) * radius, Math.sin(angle) * radius - 4, 5 + rng() * 7, realm, rng);
  }
  for (let i = 0; i < 13; i++) {
    const x = randomBetween(rng, -35, 35);
    const z = randomBetween(rng, -45, 28);
    const spire = addMesh(new THREE.ConeGeometry(.7 + rng() * 1.4, 3 + rng() * 8, 5), material(0x242027), scene, [x, 1.5, z], [1, 1, 1], [0, rng() * 2, randomBetween(rng, -.3, .3)]);
    spire.position.y = spire.geometry.parameters.height / 2;
    spire.castShadow = true;
  }
  const moon = addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xc36d5f }), scene, [17, 27, -65], [3.2, 3.2, 3.2]);
  animated.push({ object: moon, phase: 0, amount: .18 });
  for (let i = 0; i < 7; i++) {
    const eye = addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xff594a }), scene, [randomBetween(rng, -22, 22), randomBetween(rng, 2, 7), randomBetween(rng, -28, -10)], [.12, .055, .05]);
    animated.push({ object: eye, phase: rng() * 4, amount: 1.5 });
  }
  const glow = new THREE.PointLight(0xe34539, 3.2, 25);
  glow.position.set(0, 2.2, -15);
  scene.add(glow);
}

function makeOcean(rng) {
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x45abc0, roughness: .3, metalness: .2, transparent: true, opacity: .8 });
  addMesh(new THREE.PlaneGeometry(160, 160, 2, 2), waterMat, scene, [0, 8, -30], [1, 1, 1], [Math.PI / 2, 0, 0]);
  const moon = addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xffe6c4 }), scene, [-12, 25, -58], [4, 4, 4]);
  animated.push({ object: moon, phase: 1, amount: .2 });
  for (let i = 0; i < 18; i++) {
    const x = randomBetween(rng, -38, 38);
    const z = randomBetween(rng, -57, 14);
    const height = 2 + rng() * 11;
    const rock = addMesh(new THREE.DodecahedronGeometry(1, 0), material(0x667f9a), scene, [x, 4 + rng() * 7, z], [1.2 + rng() * 2, .7 + rng() * 1.5, 1.1 + rng()], [rng(), rng(), rng()]);
    animated.push({ object: rock, phase: rng() * 7, amount: .7 });
    for (let j = 0; j < 3; j++) {
      const star = addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xd8f7ff }), scene, [x + rng() * 5, height + j * 1.3, z], [.11, .11, .11]);
      animated.push({ object: star, phase: rng() * 6, amount: .24 });
    }
  }
  for (let i = 0; i < 24; i++) {
    const x = randomBetween(rng, -45, 45);
    const z = randomBetween(rng, -60, 5);
    makeLantern(x, z, 0x7cecff, 1.5 + rng() * 3);
  }
  const island = addMesh(new THREE.DodecahedronGeometry(1, 0), material(0x778477), scene, [0, 2.8, -20], [5, 2, 4]);
  island.rotation.set(.2, .4, .1);
}

function makeMemory(rng) {
  makeHouse(rng);
  for (let i = 0; i < 25; i++) {
    const side = i % 2 ? 1 : -1;
    const x = side * (11 + rng() * 22);
    const z = randomBetween(rng, -49, 26);
    makeTree(x, z, 4 + rng() * 5, realms[2], rng);
  }
  for (let i = 0; i < 14; i++) {
    const x = (i - 7) * 6;
    makeLantern(x, -10 - rng() * 24, 0xffbf79, 3.2 + rng());
  }
  for (let i = 0; i < 30; i++) {
    const leaf = addMesh(sphereGeometry, material(i % 2 ? 0xf3ad79 : 0x94759a), scene, [randomBetween(rng, -35, 35), 2 + rng() * 10, randomBetween(rng, -46, 22)], [.12 + rng() * .12, .055, .18]);
    animated.push({ object: leaf, phase: rng() * 9, amount: .35 });
  }
  const sun = addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xffbd82 }), scene, [30, 18, -62], [5, 5, 5]);
  animated.push({ object: sun, phase: 0, amount: .28 });
}

function makeGarden(rng) {
  const hillMaterial = material(0x648779);
  for (let i = 0; i < 18; i++) {
    const x = randomBetween(rng, -48, 48);
    const z = randomBetween(rng, -54, 25);
    addMesh(sphereGeometry, hillMaterial, scene, [x, -1.2, z], [5 + rng() * 8, 1.8 + rng() * 3, 5 + rng() * 8]);
  }
  for (let i = 0; i < 55; i++) {
    const x = randomBetween(rng, -39, 39);
    const z = randomBetween(rng, -42, 18);
    const stem = addMesh(cylinderGeometry, material(0x77a786), scene, [x, .55, z], [.045, 1.1, .045], [0, 0, (rng() - .5) * .3]);
    const colors = [0xffd695, 0xffb5c3, 0xe0c1ff, 0xfff0ce];
    const flower = addMesh(sphereGeometry, material(colors[i % colors.length], .5, { emissive: colors[i % colors.length], emissiveIntensity: .12 }), scene, [x + .12, 1.08, z], [.25, .16, .25]);
    animated.push({ object: stem, phase: rng() * 6, amount: .18 }, { object: flower, phase: rng() * 6, amount: .24 });
  }
  for (let i = 0; i < 13; i++) {
    makeTree(randomBetween(rng, -36, 36), randomBetween(rng, -48, 20), 5 + rng() * 4, { id: 'garden' }, rng);
  }
  for (let i = 0; i < 16; i++) makeLantern(randomBetween(rng, -30, 30), randomBetween(rng, -36, 12), 0xffdf9a, 2 + rng() * 2);
  const sun = addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xffe5b3 }), scene, [-25, 30, -60], [5.5, 5.5, 5.5]);
  animated.push({ object: sun, phase: .4, amount: .2 });
}

function makeClockwork(rng) {
  const buildingColors = [0x62545e, 0x74605d, 0x514b63, 0x80695d];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const height = 8 + rng() * 15;
      const x = side * (11 + rng() * 11);
      const z = -4 - i * 8;
      const building = addMesh(boxGeometry, material(buildingColors[i % buildingColors.length]), scene, [x, height / 2, z], [5 + rng() * 4, height, 5 + rng() * 3]);
      building.castShadow = true;
      for (let window = 0; window < 5; window++) {
        const light = material(window % 2 ? 0xf3cb87 : 0xb5b7df, .5, { emissive: window % 2 ? 0xf3cb87 : 0xb5b7df, emissiveIntensity: .65 });
        addMesh(boxGeometry, light, scene, [x, 2 + window * 2.4, z + 2.7], [.45, .8, .08]);
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    const x = (i - 2) * 7;
    const z = -14 - i * 7;
    const face = addMesh(new THREE.TorusGeometry(2.5, .15, 8, 40), material(0xd3a66d, .4, { metalness: .6 }), scene, [x, 12 + i % 2 * 4, z]);
    face.rotation.z = .13 * i;
    const hand = addMesh(boxGeometry, material(0x302a39), scene, [x, 12 + i % 2 * 4, z + .08], [.09, 1.65, .12]);
    hand.rotation.z = .5 + i * .45;
    animated.push({ object: face, phase: i, amount: .22, spin: .08 + rng() * .12 });
    animated.push({ object: hand, phase: i + 2, amount: .15, spin: .14 });
  }
}

function makeCrystalDesert(rng) {
  for (let i = 0; i < 22; i++) {
    const x = randomBetween(rng, -42, 42);
    const z = randomBetween(rng, -53, 24);
    addMesh(sphereGeometry, material(i % 2 ? 0xa1849b : 0x806f91), scene, [x, -1.1, z], [6 + rng() * 7, 1.5 + rng() * 2, 5 + rng() * 6]);
  }
  const crystalColors = [0x91e7e2, 0xc3a7ff, 0xf3b5d3, 0xb8edff];
  for (let i = 0; i < 42; i++) {
    const x = randomBetween(rng, -38, 38);
    const z = randomBetween(rng, -46, 22);
    const height = 1.8 + rng() * 6;
    const crystal = addMesh(new THREE.ConeGeometry(.5 + rng() * .8, height, 5), material(crystalColors[i % crystalColors.length], .23, { metalness: .35, emissive: crystalColors[i % crystalColors.length], emissiveIntensity: .19 }), scene, [x, height / 2, z], [1, 1, .7], [randomBetween(rng, -.2, .2), rng() * 3, randomBetween(rng, -.15, .15)]);
    crystal.castShadow = true;
    animated.push({ object: crystal, phase: rng() * 6, amount: .12 });
  }
  addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xf4deff }), scene, [0, 24, -60], [4, 4, 4]);
}

function makeLibrary(rng) {
  const wood = material(0x594455, .86);
  const bookColors = [0xb47770, 0x617c91, 0xd1a66e, 0x77927e, 0x8c74a3];
  for (const x of [-21, -11, 0, 11, 21]) {
    for (let row = 0; row < 3; row++) {
      const z = -9 - row * 14;
      addMesh(boxGeometry, wood, scene, [x, 5.2, z], [5.8, 10.4, .75]);
      for (let shelf = 0; shelf < 4; shelf++) {
        const y = 1.6 + shelf * 2.2;
        addMesh(boxGeometry, material(0x9a7766), scene, [x, y, z + .65], [5.9, .18, 1.1]);
        let bookX = x - 2.5;
        while (bookX < x + 2.25) {
          const width = .28 + rng() * .28;
          const height = 1.1 + rng() * .8;
          const book = addMesh(boxGeometry, material(bookColors[Math.floor(rng() * bookColors.length)]), scene, [bookX + width / 2, y + .14 + height / 2, z + .55], [width, height, .5]);
          book.rotation.z = randomBetween(rng, -.06, .06);
          bookX += width + .12;
        }
      }
    }
  }
  for (let i = 0; i < 13; i++) {
    const book = addMesh(boxGeometry, material(bookColors[i % bookColors.length]), scene, [randomBetween(rng, -18, 18), 4 + rng() * 11, randomBetween(rng, -39, 3)], [1.1, .22, .85], [rng() * .3, rng() * 3, rng() * .4]);
    animated.push({ object: book, phase: rng() * 6, amount: .55, spin: .08 });
  }
  for (const x of [-27, 27]) {
    addMesh(new THREE.TorusGeometry(5, .22, 8, 40), material(0xb99976, .4, { metalness: .3 }), scene, [x, 12, -28]);
  }
}

function makeAdditionalMap(realm, rng) {
  const palettes = [0x495969, 0x72658a, 0xbf7b78, 0x566879, 0xa4553b, 0x377b7a, 0x596c47, 0x73768d, 0x637b69, 0x66849a, 0xc4748e, 0x8aa9b0, 0xa274a2];
  const stone = material(palettes[realms.indexOf(realm)], .76);
  const glow = new THREE.MeshStandardMaterial({ color: realm.accent, emissive: realm.accent, emissiveIntensity: .65, roughness: .34 });
  const colors = [0xffdc91, 0xd4a8ff, 0x89e2d5, 0xff9f9e, 0xb7e6ff];
  const addPillar = (x, z, height, color = stone) => addMesh(cylinderGeometry, color, scene, [x, height / 2, z], [.65, height, .65]);

  if (realm.id === 'rain') {
    for (const side of [-1, 1]) for (let i = 0; i < 10; i++) {
      const x = side * (11 + rng() * 14), z = -i * 7 - 3, h = 8 + rng() * 12;
      addMesh(boxGeometry, material([0x293848, 0x344351, 0x3c4658][i % 3]), scene, [x, h / 2, z], [5 + rng() * 4, h, 5]);
      for (let row = 0; row < 3; row++) addMesh(boxGeometry, glow, scene, [x, 2 + row * 2.5, z + 2.55], [.32, 1, .06]);
    }
    for (let i = 0; i < 12; i++) {
      const puddle = addMesh(new THREE.CircleGeometry(1, 20), material(0x3c9b9f, .22, { metalness: .65 }), scene, [randomBetween(rng, -10, 10), .03, randomBetween(rng, -41, 12)], [1 + rng() * 3, 1, .45], [-Math.PI / 2, 0, rng()]);
      animated.push({ object: puddle, phase: rng() * 5, amount: .02 });
    }
    for (let i = 0; i < 9; i++) makeLantern(randomBetween(rng, -9, 9), -i * 5 - 2, colors[i % colors.length], 3);
  } else if (realm.id === 'cathedral') {
    for (let i = 0; i < 12; i++) {
      const x = (i % 2 ? 1 : -1) * (8 + Math.floor(i / 2) * 2);
      const z = -Math.floor(i / 2) * 7 - 5;
      addPillar(x, z, 17);
      const arch = addMesh(new THREE.TorusGeometry(5, .28, 8, 24, Math.PI), glow, scene, [x / 2, 12, z], [1, 1, 1], [0, 0, Math.PI]);
      animated.push({ object: arch, phase: i, amount: .25, spin: .03 });
    }
    for (let i = 0; i < 12; i++) addMesh(new THREE.ConeGeometry(1.4, 6, 4), stone, scene, [randomBetween(rng, -24, 24), 14, randomBetween(rng, -43, 0)]);
  } else if (realm.id === 'carnival') {
    for (let i = 0; i < 7; i++) {
      const x = (i - 3) * 7, z = -15 - (i % 2) * 15;
      const tent = addMesh(new THREE.ConeGeometry(4, 6, 8), material(colors[i % colors.length]), scene, [x, 3, z]);
      addMesh(cylinderGeometry, material(0x463648), scene, [x, 1, z], [2.4, 2, 2.4]);
      animated.push({ object: tent, phase: i, amount: .1 });
    }
    const wheel = addMesh(new THREE.TorusGeometry(7, .3, 8, 32), glow, scene, [0, 12, -32]);
    wheel.rotation.y = Math.PI / 2;
    for (let i = 0; i < 8; i++) addPillar(Math.sin(i * Math.PI / 4) * 7, -32, 12 + Math.cos(i * Math.PI / 4) * 7, material(colors[i % colors.length]));
    animated.push({ object: wheel, phase: 0, amount: .1, spin: .035 });
  } else if (realm.id === 'train') {
    for (let i = 0; i < 6; i++) {
      const z = -i * 10 - 5, color = material(colors[i % colors.length], .55, { metalness: .28 });
      addMesh(boxGeometry, color, scene, [0, 2.3, z], [8, 4.5, 8.5]);
      addMesh(boxGeometry, glow, scene, [0, 4.7, z], [7, .15, 7.8]);
      for (const side of [-1, 1]) for (let j = 0; j < 3; j++) addMesh(boxGeometry, material(0xffdfae, .28, { emissive: 0xffc66c, emissiveIntensity: 1 }), scene, [side * 4.05, 2.7, z - 2.8 + j * 2.7], [.08, 1.15, 1.2]);
    }
    for (const x of [-5, 5]) {
      addMesh(boxGeometry, material(0x292a35), scene, [x, .12, -25], [.4, .25, 100]);
      for (let i = 0; i < 28; i++) addMesh(boxGeometry, stone, scene, [x, -.03, 7 - i * 3.5], [2.2, .22, .45]);
    }
  } else if (realm.id === 'volcano') {
    for (let i = 0; i < 14; i++) {
      const x = randomBetween(rng, -38, 38), z = randomBetween(rng, -48, 20), h = 8 + rng() * 18;
      const peak = addMesh(new THREE.ConeGeometry(5 + rng() * 5, h, 7), stone, scene, [x, h / 2 - 1, z]);
      peak.rotation.z = randomBetween(rng, -.15, .15);
      addMesh(new THREE.TorusGeometry(1.5, .18, 8, 20), glow, scene, [x, h - 1, z]);
    }
    for (let i = 0; i < 8; i++) {
      const stream = addMesh(new THREE.BoxGeometry(1.1 + rng(), .12, 12 + rng() * 10), glow, scene, [randomBetween(rng, -18, 18), .1, -6 - i * 5], [1, 1, 1], [0, rng(), 0]);
      animated.push({ object: stream, phase: i, amount: .08 });
    }
  } else if (realm.id === 'aurora') {
    for (let i = 0; i < 16; i++) {
      const hill = addMesh(sphereGeometry, stone, scene, [randomBetween(rng, -40, 40), -1.5, randomBetween(rng, -48, 22)], [8 + rng() * 8, 2 + rng() * 3, 8 + rng() * 8]);
      hill.material = material(colors[i % colors.length]);
    }
    for (let i = 0; i < 9; i++) {
      const curtain = addMesh(new THREE.PlaneGeometry(7, 18), new THREE.MeshBasicMaterial({ color: colors[i % colors.length], transparent: true, opacity: .14, side: THREE.DoubleSide }), scene, [-30 + i * 7, 16, -35], [1, 1, 1], [0, 0, randomBetween(rng, -.2, .2)]);
      animated.push({ object: curtain, phase: i, amount: .7 });
    }
  } else if (realm.id === 'swamp') {
    addMesh(new THREE.PlaneGeometry(100, 100), material(0x284d43, .22, { metalness: .24, transparent: true, opacity: .78 }), scene, [0, .05, -18], [1, 1, 1], [-Math.PI / 2, 0, 0]);
    for (let i = 0; i < 36; i++) {
      const x = randomBetween(rng, -42, 42), z = randomBetween(rng, -48, 20), h = 3 + rng() * 8;
      addPillar(x, z, h, material(0x283831));
      for (let side = -1; side <= 1; side += 2) addMesh(cylinderGeometry, stone, scene, [x + side * 1.2, h * .78, z], [.11, h * .38, .11], [0, 0, side * .7]);
    }
    for (let i = 0; i < 15; i++) makeLantern(randomBetween(rng, -34, 34), randomBetween(rng, -38, 15), 0xc9f178, 1 + rng() * 2);
  } else if (realm.id === 'moon') {
    for (let i = 0; i < 18; i++) {
      const crater = addMesh(new THREE.TorusGeometry(2 + rng() * 3, .45, 6, 20), stone, scene, [randomBetween(rng, -40, 40), .12, randomBetween(rng, -48, 22)], [1, .45, 1]);
      crater.rotation.x = Math.PI / 2;
    }
    for (let i = 0; i < 28; i++) {
      const rock = addMesh(new THREE.DodecahedronGeometry(1, 0), material(0x6e6c83), scene, [randomBetween(rng, -40, 40), 1 + rng() * 3, randomBetween(rng, -45, 17)], [1 + rng() * 2, .8 + rng() * 2, 1 + rng()], [rng(), rng(), rng()]);
      animated.push({ object: rock, phase: rng() * 8, amount: .15 });
    }
    addMesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0x78a9cc }), scene, [22, 29, -59], [5, 5, 5]);
  } else if (realm.id === 'maze') {
    for (let row = 0; row < 9; row++) for (let col = 0; col < 9; col++) {
      if ((row === 0 || row === 8 || col === 0 || col === 8) && !(row === 8 && col === 4)) continue;
      if ((row * 3 + col * 5) % 4 === 1 || (row === 4 && col > 1 && col < 7)) {
        const x = (col - 4) * 5.2, z = -row * 5 - 2;
        const wall = addMesh(boxGeometry, stone, scene, [x, 2.3, z], [4.8, 4.6, .6]);
        if ((row + col) % 2) wall.rotation.y = Math.PI / 2;
        if ((row + col) % 3 === 0) addMesh(new THREE.TorusGeometry(.8, .08, 6, 16), glow, scene, [x, 2.3, z - .36]);
      }
    }
  } else if (realm.id === 'islands') {
    for (let i = 0; i < 25; i++) {
      const x = randomBetween(rng, -38, 38), z = randomBetween(rng, -48, 18), y = 2 + rng() * 10;
      const island = addMesh(new THREE.DodecahedronGeometry(1, 0), material([0x779984, 0x8e899e, 0x7394a4][i % 3]), scene, [x, y, z], [2 + rng() * 5, 1.3 + rng() * 2, 2 + rng() * 4], [rng(), rng(), rng()]);
      animated.push({ object: island, phase: rng() * 9, amount: .4 });
    }
    for (let i = 0; i < 12; i++) makeLantern(randomBetween(rng, -35, 35), randomBetween(rng, -42, 12), colors[i % colors.length], 2 + rng() * 5);
  } else if (realm.id === 'toybox') {
    for (let i = 0; i < 32; i++) {
      const x = randomBetween(rng, -35, 35), z = randomBetween(rng, -42, 17), size = 1 + rng() * 3;
      const block = addMesh(boxGeometry, material(colors[i % colors.length], .48), scene, [x, size / 2, z], [size, size, size], [0, rng(), randomBetween(rng, -.1, .1)]);
      animated.push({ object: block, phase: rng() * 9, amount: .12 });
    }
    for (let i = 0; i < 9; i++) {
      const x = randomBetween(rng, -30, 30), z = randomBetween(rng, -38, 12);
      addMesh(cylinderGeometry, material(0xf0cd91), scene, [x, 1.2, z], [.16, 2.4, .16]);
      addMesh(new THREE.ConeGeometry(1.1, 1.2, 8), material(colors[i % colors.length]), scene, [x, 2.6, z]);
    }
  } else if (realm.id === 'mirror') {
    for (let i = 0; i < 18; i++) {
      const x = (i % 2 ? 1 : -1) * (7 + Math.floor(i / 2) * 3);
      const z = -Math.floor(i / 2) * 6 - 4;
      const mirror = addMesh(boxGeometry, new THREE.MeshPhysicalMaterial({ color: colors[i % colors.length], metalness: .92, roughness: .08, transparent: true, opacity: .55 }), scene, [x, 5, z], [.18, 10, 3]);
      mirror.rotation.y = randomBetween(rng, -.25, .25);
      addPillar(x, z, 10, glow);
    }
  } else if (realm.id === 'dreamcore') {
    for (let i = 0; i < 13; i++) {
      const ring = addMesh(new THREE.TorusGeometry(4 + i % 4, .12, 8, 56), new THREE.MeshBasicMaterial({ color: colors[i % colors.length], transparent: true, opacity: .72 }), scene, [randomBetween(rng, -27, 27), 3 + rng() * 18, -8 - i * 4]);
      ring.rotation.set(rng() * 2, rng() * 2, rng() * 2);
      animated.push({ object: ring, phase: i, amount: .3, spin: .05 + rng() * .1 });
    }
    for (let i = 0; i < 20; i++) {
      const star = addMesh(new THREE.OctahedronGeometry(.35 + rng() * .65), glow, scene, [randomBetween(rng, -38, 38), randomBetween(rng, 1, 15), randomBetween(rng, -50, 20)]);
      animated.push({ object: star, phase: rng() * 8, amount: .55, spin: .22 });
    }
  }
}

function makeChallenge(index) {
  const realm = realms[index];
  if (realm.type === 'survive') return;
  const target = realm.target;
  const placements = [[-7, -8], [8, -18], [-2, -31], [-12, -35], [3, -45]];
  const color = realm.accent;
  const colors = [0xf3cb87, 0x9fe5ee, 0xe7a6d7, 0xc3e8a7];
  for (let i = 0; i < target; i++) {
    if (challengeCollected[index].has(i)) continue;
    const [x, z] = placements[i];
    const group = new THREE.Group();
    group.position.set(x, 1.25, z);
    scene.add(group);
    const sequenceIndex = realm.sequence ? realm.sequence.indexOf(i) : i;
    const itemColor = realm.type === 'sequence' ? colors[sequenceIndex % colors.length] : color;
    const glowMaterial = material(itemColor, .28, { emissive: itemColor, emissiveIntensity: .8, metalness: .2 });
    const sequenceGeometry = [sphereGeometry, new THREE.ConeGeometry(.48, .9, 6), new THREE.OctahedronGeometry(.5), boxGeometry];
    const geometry = realm.type === 'activate' ? new THREE.BoxGeometry(.8, .8, .8)
      : realm.type === 'sequence' ? sequenceGeometry[i % sequenceGeometry.length]
        : new THREE.OctahedronGeometry(.48);
    const crystal = addMesh(geometry, glowMaterial, group, [0, 0, 0], [1, 1.2, 1], realm.type === 'activate' ? [.45, .45, .45] : undefined);
    const halo = addMesh(new THREE.TorusGeometry(.72, .035, 6, 24), new THREE.MeshBasicMaterial({ color: itemColor }), group, [0, 0, 0]);
    halo.rotation.x = Math.PI / 2;
    if (realm.type === 'checkpoint') {
      const gate = addMesh(new THREE.TorusGeometry(1, .12, 8, 24), new THREE.MeshBasicMaterial({ color: itemColor }), group, [0, 0, 0]);
      gate.scale.y = 1.5;
    }
    const light = new THREE.PointLight(itemColor, realm.type === 'checkpoint' && i > 0 ? .22 : 1.2, 6);
    group.add(light);
    animated.push({ object: crystal, phase: i, amount: .24, spin: .7 }, { object: halo, phase: i + 1, amount: .13, spin: -.35 });
    challengeItems.push({ group, name: realm.collectible, step: i, index: i, sequenceIndex, light });
  }
}

function makeMonster(index) {
  const realm = realms[index];
  const group = new THREE.Group();
  const bodyColor = new THREE.Color(realm.accent).multiplyScalar(.28);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: .52, emissive: realm.accent, emissiveIntensity: .18 });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: index === 0 ? 0xff433f : 0xffe6a3 });
  addMesh(sphereGeometry, bodyMaterial, group, [0, 1.5, 0], [1.15, 1.55, .82]);
  addMesh(sphereGeometry, bodyMaterial, group, [0, 2.75, .1], [.88, .85, .72]);
  for (const side of [-1, 1]) {
    addMesh(sphereGeometry, eyeMaterial, group, [side * .34, 2.82, .76], [.13, .16, .08]);
    addMesh(new THREE.ConeGeometry(.3, 1.1, 5), bodyMaterial, group, [side * .62, 3.55, .05], [.7, 1, .7], [0, 0, side * -.28]);
    addMesh(cylinderGeometry, bodyMaterial, group, [side * .88, 1.05, 0], [.2, 1.45, .2], [0, 0, side * .62]);
  }
  for (let i = 0; i < 3; i++) {
    const tendril = addMesh(cylinderGeometry, bodyMaterial, group, [(i - 1) * .55, .05, -.25], [.12, 1.6 + i * .2, .12], [0, 0, (i - 1) * .35]);
    tendril.rotation.x = Math.PI / 2;
  }
  const spawn = new THREE.Vector3(index % 2 ? 25 : -25, 0, -34);
  group.position.copy(spawn);
  scene.add(group);
  const speed = realm.type === 'survive' ? 1.85 : realm.type === 'sequence' ? 1.35 : 1.15;
  monster = { group, spawn, speed, stunnedUntil: 0, phase: index * .9, name: realm.monster };
}

function makePortal(realm, index) {
  const angle = index * Math.PI * 2 / realms.length - Math.PI / 2;
  const x = Math.sin(angle) * 18;
  const z = -Math.cos(angle) * 18;
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.y = angle;
  scene.add(group);
  const archMat = material(index === 0 ? 0x473b46 : 0x8d7b76, .35, { metalness: .28 });
  addMesh(cylinderGeometry, archMat, group, [-1.45, 2.15, 0], [.23, 4.3, .23]);
  addMesh(cylinderGeometry, archMat, group, [1.45, 2.15, 0], [.23, 4.3, .23]);
  const lintel = addMesh(boxGeometry, archMat, group, [0, 4.2, 0], [3.15, .3, .42]);
  lintel.rotation.z = .08;
  const portalMat = new THREE.MeshBasicMaterial({ color: realm.accent, transparent: true, opacity: .36, side: THREE.DoubleSide });
  const plane = addMesh(new THREE.PlaneGeometry(2.55, 3.65), portalMat, group, [0, 2.06, .04]);
  const ring = addMesh(new THREE.TorusGeometry(1.66, .045, 8, 40), new THREE.MeshBasicMaterial({ color: realm.accent }), group, [0, 2.12, .1]);
  ring.scale.y = 1.13;
  const glow = new THREE.PointLight(realm.accent, 2, 8);
  glow.position.set(0, 2.1, 1);
  group.add(glow);
  const rune = addMesh(new THREE.OctahedronGeometry(.25), new THREE.MeshBasicMaterial({ color: realm.accent }), group, [0, 4.8, 0]);
  animated.push({ object: plane, phase: index * 1.2, amount: .17 }, { object: rune, phase: index, amount: .35 }, { object: ring, phase: index * .7, amount: .08, spin: .12 });
  interactiveGates.push({ group, realm: index, x, z, label: realms[index].mood, glow });
}

function buildEnvironment(index) {
  const realm = realms[index];
  clearEnvironment();
  scene.background = new THREE.Color(realm.sky);
  scene.fog.color.setHex(realm.fog);
  scene.fog.density = realm.id === 'nightmare' ? .024 : realm.id === 'ocean' ? .012 : .016;
  hemisphere.color.setHex(realm.sky);
  hemisphere.groundColor.setHex(realm.ground);
  keyLight.color.setHex(realm.accent);
  keyLight.intensity = realm.id === 'nightmare' ? .85 : 1.55;
  const rng = seeded(510 + index * 39);
  makeGround(realm, rng);
  const ambient = new THREE.PointLight(realm.accent, index === 0 ? 1.2 : 1.7, 36);
  ambient.position.set(0, 4, -18);
  scene.add(ambient);
  if (realm.id === 'nightmare') makeNightmare(rng, realm);
  if (realm.id === 'ocean') makeOcean(rng);
  if (realm.id === 'memory') makeMemory(rng);
  if (realm.id === 'garden') makeGarden(rng);
  if (realm.id === 'clockwork') makeClockwork(rng);
  if (realm.id === 'crystal') makeCrystalDesert(rng);
  if (realm.id === 'library') makeLibrary(rng);
  if (index >= 7) makeAdditionalMap(realm, rng);
  makeChallenge(index);
  makeMonster(index);
  realms.forEach((destination, gateIndex) => makePortal(destination, gateIndex));
  player.position.set(0, 0, 6);
  yaw = 0;
  pitch = 0;
  updateLook();
  updateHud();
}

function updateHud() {
  const realm = realms[activeRealm];
  mood.textContent = realm.mood;
  realmIndex.textContent = `SUEÑO ${String(activeRealm + 1).padStart(2, '0')}`;
  title.innerHTML = realm.title;
  description.innerHTML = realm.description;
  caption.textContent = realm.caption;
  count.textContent = found.size;
  document.querySelector('#dream-total').textContent = realms.length;
  const complete = challengeProgress[activeRealm] >= realm.target;
  challengeTitle.textContent = complete ? 'Reto cumplido. El sueño te deja continuar.' : realm.challenge;
  if (realm.type === 'survive') {
    challengeProgressText.textContent = `${Math.floor(challengeElapsed[activeRealm])} / ${realm.target} SEGUNDOS`;
  } else if (realm.type === 'sequence') {
    const steps = realm.sequence.map((item) => item + 1).join(' → ');
    challengeProgressText.textContent = `ORDEN ${steps} · ${challengeProgress[activeRealm]} / ${realm.target}`;
  } else {
    challengeProgressText.textContent = `${challengeProgress[activeRealm]} / ${realm.target} ${realm.collectible.toUpperCase()}`;
  }
  challengeProgressBar.style.width = `${Math.min(challengeProgress[activeRealm] / realm.target, 1) * 100}%`;
  monsterName.textContent = realm.monster;
  challengePanel.classList.toggle('complete', complete);
  realmList.innerHTML = realms.map((item, index) => {
    const classes = ['realm-entry', index === activeRealm ? 'active' : '', found.has(index) ? 'found' : ''].filter(Boolean).join(' ');
    const shortName = item.mood.replace(/^(EL|LA|LAS|LOS)\s/, '');
    return `<div class="${classes}"><span class="realm-num">${String(index + 1).padStart(2, '0')}</span><span>${shortName}</span><span class="realm-status"></span></div>`;
  }).join('');
}

function updateLook() {
  player.rotation.y = yaw;
  camera.rotation.x = pitch;
}

function announce(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function enterRealm(index) {
  if (index === activeRealm) {
    announce('Ya estás en este sueño. Mira a tu alrededor.');
    return;
  }
  if (challengeProgress[activeRealm] < realms[activeRealm].target) {
    announce('El portal está sellado. Completa el reto de este sueño para cruzar.');
    return;
  }
  const firstVisit = !found.has(index);
  found.add(index);
  activeRealm = index;
  prompt.classList.remove('visible');
  buildEnvironment(activeRealm);
  updateDrone();
  announce(firstVisit ? `Recuerdo descubierto: ${realms[index].mood.toLowerCase()}` : `Has vuelto a ${realms[index].mood.toLowerCase()}`);
}

function interact() {
  const item = nearestChallengeItem();
  if (item && ['activate', 'sequence'].includes(realms[activeRealm].type)) {
    activateChallengeItem(item);
    return;
  }
  if (nearGate) enterRealm(nearGate.realm);
}

function nearestChallengeItem() {
  let nearest = 3.2;
  let target = null;
  for (const item of challengeItems) {
    if (!item.group.visible) continue;
    const distance = Math.hypot(player.position.x - item.group.position.x, player.position.z - item.group.position.z);
    if (distance < nearest) {
      nearest = distance;
      target = item;
    }
  }
  return target;
}

function activateChallengeItem(item) {
  const realm = realms[activeRealm];
  if (realm.type === 'sequence' && item.index !== realm.sequence[challengeProgress[activeRealm]]) {
    announce('Ese símbolo no va todavía. Revisa el orden del reto.');
    return;
  }
  item.group.visible = false;
  challengeCollected[activeRealm].add(item.index);
  challengeProgress[activeRealm] += 1;
  updateHud();
  const complete = challengeProgress[activeRealm] >= realm.target;
  announce(complete ? '¡Reto cumplido! La criatura se desvanece.' : `Mecanismo activado: ${challengeProgress[activeRealm]} de ${realm.target}.`);
}

function useFlash() {
  if (!monster || challengeProgress[activeRealm] >= realms[activeRealm].target) return;
  const now = clock.elapsedTime;
  if (now < flashReadyAt) {
    announce(`El destello necesita ${Math.ceil(flashReadyAt - now)} s para recargarse.`);
    return;
  }
  const away = monster.group.position.clone().sub(player.position).setY(0).normalize();
  monster.group.position.addScaledVector(away, 8);
  monster.stunnedUntil = now + 4;
  flashReadyAt = now + 8;
  const overlay = document.querySelector('#flash-overlay');
  overlay.classList.add('active');
  window.setTimeout(() => overlay.classList.remove('active'), 220);
  announce(`¡Destello! ${monster.name} retrocede.`);
}

function updateChallenge(delta, elapsed) {
  if (!started || !monster) return;
  const realm = realms[activeRealm];
  if (realm.type === 'survive' && challengeProgress[activeRealm] < realm.target) {
    const previousSecond = Math.floor(challengeElapsed[activeRealm]);
    challengeElapsed[activeRealm] = Math.min(challengeElapsed[activeRealm] + delta, realm.target);
    challengeProgress[activeRealm] = challengeElapsed[activeRealm];
    if (Math.floor(challengeElapsed[activeRealm]) !== previousSecond) updateHud();
    if (challengeElapsed[activeRealm] >= realm.target) {
      announce('¡Reto cumplido! Sobreviviste hasta que terminó el sueño.');
    }
  }
  for (const item of challengeItems) {
    if (!item.group.visible) continue;
    const distance = Math.hypot(player.position.x - item.group.position.x, player.position.z - item.group.position.z);
    if (distance < 1.8) {
      if (realm.type === 'activate' || realm.type === 'sequence') continue;
      if (realm.type === 'checkpoint' && item.index !== challengeProgress[activeRealm]) continue;
      item.group.visible = false;
      challengeCollected[activeRealm].add(item.index);
      challengeProgress[activeRealm] += 1;
      if (realm.type === 'checkpoint') {
        const nextCheckpoint = challengeItems.find((candidate) => candidate.index === challengeProgress[activeRealm]);
        if (nextCheckpoint) nextCheckpoint.light.intensity = 1.8;
      }
      updateHud();
      const completed = challengeProgress[activeRealm] >= realm.target;
      announce(completed ? '¡Reto cumplido! La criatura se desvanece.' : `Encontraste ${item.name}: ${challengeProgress[activeRealm]} de ${realm.target}.`);
    }
  }
  if (challengeProgress[activeRealm] >= realm.target) {
    monster.group.visible = false;
    monsterWarning.classList.remove('visible');
    return;
  }
  monster.group.visible = true;
  const dx = player.position.x - monster.group.position.x;
  const dz = player.position.z - monster.group.position.z;
  const distance = Math.hypot(dx, dz);
  if (distance > 2.7 && elapsed >= monster.stunnedUntil) {
    monster.group.position.x += dx / distance * monster.speed * delta;
    monster.group.position.z += dz / distance * monster.speed * delta;
  }
  monster.group.position.y = Math.sin(elapsed * 3.2 + monster.phase) * .16;
  monster.group.rotation.y = Math.atan2(dx, dz);
  if (distance < 13) {
    monsterWarning.textContent = `¡${monster.name} TE SIGUE! · PULSA F`;
    monsterWarning.classList.add('visible');
  } else {
    monsterWarning.classList.remove('visible');
  }
  if (distance < 2) {
    player.position.set(0, 0, 6);
    monster.group.position.copy(monster.spawn);
    monster.stunnedUntil = elapsed + 1.5;
    announce(`${monster.name} te encontró. Vuelve a empezar; conservaste tus hallazgos.`);
  }
}

function setStarted() {
  if (started) return;
  started = true;
  intro.classList.add('hidden');
  requestPointerLock();
  announce('Encuentra los portales brillantes para viajar entre sueños.');
}

function requestPointerLock() {
  if (!started || window.innerWidth < 700) return;
  renderer.domElement.requestPointerLock?.();
}

function updateDrone() {
  if (!drone) return;
  const frequencies = [55, 73.42, 65.41, 82.41, 98, 110, 87.31];
  drone.low.frequency.setTargetAtTime(frequencies[activeRealm], audioContext.currentTime, .8);
  drone.high.frequency.setTargetAtTime(frequencies[activeRealm] * 1.5, audioContext.currentTime, .8);
}

async function toggleSound() {
  if (!audioContext) {
    const AudioContextType = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextType) {
      announce('El audio ambiental no está disponible en este navegador.');
      return;
    }
    audioContext = new AudioContextType();
    const low = audioContext.createOscillator();
    const high = audioContext.createOscillator();
    const gain = audioContext.createGain();
    low.type = 'sine';
    high.type = 'sine';
    low.frequency.value = 55;
    high.frequency.value = 82.5;
    gain.gain.value = 0;
    low.connect(gain);
    high.connect(gain);
    gain.connect(audioContext.destination);
    low.start();
    high.start();
    drone = { low, high, gain };
    updateDrone();
  }
  if (soundEnabled) {
    soundEnabled = false;
    drone.gain.gain.setTargetAtTime(0, audioContext.currentTime, .2);
  } else {
    await audioContext.resume();
    soundEnabled = true;
    drone.gain.gain.setTargetAtTime(.018, audioContext.currentTime, .35);
  }
  const button = document.querySelector('#sound-button');
  button.setAttribute('aria-label', soundEnabled ? 'Desactivar ambiente' : 'Activar ambiente');
  button.title = soundEnabled ? 'Desactivar ambiente' : 'Activar ambiente';
  button.classList.toggle('sound-on', soundEnabled);
}

document.querySelector('#start-button').addEventListener('click', setStarted);
document.querySelector('#look-button').addEventListener('click', () => {
  if (!started) setStarted();
  else if (window.innerWidth < 700) {
    if (nearGate) interact();
    else announce('Acércate a un portal brillante para entrar a otro sueño.');
  } else if (!locked) requestPointerLock();
});
document.querySelector('#sound-button').addEventListener('click', toggleSound);
flashButton.addEventListener('click', useFlash);
challengeButton.addEventListener('click', interact);
renderer.domElement.addEventListener('click', () => {
  if (started && !locked && window.innerWidth >= 700) requestPointerLock();
});
renderer.domElement.addEventListener('pointerdown', (event) => {
  if (started && event.pointerType === 'touch') {
    touchLook = { id: event.pointerId, x: event.clientX, y: event.clientY };
    renderer.domElement.setPointerCapture(event.pointerId);
  }
});
renderer.domElement.addEventListener('pointermove', (event) => {
  if (!touchLook || touchLook.id !== event.pointerId) return;
  yaw -= (event.clientX - touchLook.x) * .006;
  pitch = THREE.MathUtils.clamp(pitch - (event.clientY - touchLook.y) * .005, -1.15, 1.15);
  touchLook.x = event.clientX;
  touchLook.y = event.clientY;
  updateLook();
});
renderer.domElement.addEventListener('pointerup', () => { touchLook = null; });
renderer.domElement.addEventListener('pointercancel', () => { touchLook = null; });
document.querySelectorAll('.touch-controls button[data-move]').forEach((button) => {
  const key = button.dataset.move;
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    keys.add(key);
    button.setPointerCapture(event.pointerId);
  });
  const release = () => keys.delete(key);
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', release);
});

document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === renderer.domElement;
});
document.addEventListener('mousemove', (event) => {
  if (!locked) return;
  yaw -= event.movementX * .0022;
  pitch = THREE.MathUtils.clamp(pitch - event.movementY * .0018, -1.15, 1.15);
  updateLook();
});
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
  keys.add(key);
  if (key === 'e' && !event.repeat) interact();
  if (key === 'f' && !event.repeat) useFlash();
  if (key === 'enter' && !started) setStarted();
  if (key === 'escape' && !started) return;
});
document.addEventListener('keyup', (event) => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());

function update(delta, elapsed) {
  const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
  const direction = new THREE.Vector3();
  if (keys.has('w') || keys.has('arrowup')) direction.add(forward);
  if (keys.has('s') || keys.has('arrowdown')) direction.sub(forward);
  if (keys.has('d') || keys.has('arrowright')) direction.add(right);
  if (keys.has('a') || keys.has('arrowleft')) direction.sub(right);
  if (direction.lengthSq()) {
    direction.normalize();
    player.position.addScaledVector(direction, delta * (keys.has('shift') ? 8 : 4.5));
    camera.position.y = 1.65 + Math.sin(elapsed * 9) * .035;
  } else {
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.65, delta * 5);
  }
  if (!locked && window.innerWidth < 700 && started) {
    if (keys.has('arrowleft')) yaw += delta * 1.5;
    if (keys.has('arrowright')) yaw -= delta * 1.5;
    if (keys.has('arrowup')) pitch = Math.max(-1.1, pitch - delta);
    if (keys.has('arrowdown')) pitch = Math.min(1.1, pitch + delta);
    updateLook();
  }
  updateChallenge(delta, elapsed);
  const dx = player.position.x;
  const dz = player.position.z;
  nearGate = null;
  let nearest = 3.2;
  for (const gate of interactiveGates) {
    const distance = Math.hypot(dx - gate.x, dz - gate.z);
    gate.glow.intensity = 1.4 + Math.sin(elapsed * 2 + gate.realm) * .45;
    if (distance < nearest) {
      nearest = distance;
      nearGate = gate;
    }
  }
  if (nearGate && started) {
    prompt.classList.add('visible');
  }
  const nearbyItem = nearestChallengeItem();
  if (nearbyItem && started && ['activate', 'sequence'].includes(realms[activeRealm].type)) {
    prompt.innerHTML = `<kbd>E</kbd> ${realms[activeRealm].type === 'sequence' ? `Activar símbolo ${nearbyItem.index + 1}` : `Activar ${nearbyItem.name}`}`;
    prompt.classList.add('visible');
  } else if (nearGate && started) {
    prompt.innerHTML = challengeProgress[activeRealm] < realms[activeRealm].target
      ? `<kbd>E</kbd> Reto pendiente: ${Math.floor(challengeProgress[activeRealm])} / ${realms[activeRealm].target}`
      : `<kbd>E</kbd> Atravesar ${nearGate.label.toLowerCase()}`;
    prompt.classList.add('visible');
  } else prompt.classList.remove('visible');
  for (const item of animated) {
    item.object.position.y += Math.sin(elapsed * .7 + item.phase) * item.amount * delta;
    if (item.spin) item.object.rotation.z += item.spin * delta;
    if (item.light) item.light.intensity = 1.5 + (Math.sin(elapsed * 3 + item.phase) + 1) * .55;
    if (item.object.material && item.object.material.transparent) {
      item.object.material.opacity = .28 + (Math.sin(elapsed * 1.8 + item.phase) + 1) * .13;
    }
  }
}

function frame() {
  const delta = Math.min(clock.getDelta(), .05);
  update(delta, clock.elapsedTime);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
});

buildEnvironment(activeRealm);
frame();
