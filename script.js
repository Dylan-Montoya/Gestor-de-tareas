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
    challenge: 'Atrav
