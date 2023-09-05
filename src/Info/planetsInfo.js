const planets = {
  earth: {
    name: 'Earth',
    description:
      'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is the densest planet in the Solar System and is sometimes referred to as the World or the Blue Planet due to its abundant water.',
    texture: '/textures/earthlights1k.jpg',
    type:"planet",
  },
  mars: {
    name: 'Mars',
    description:
      'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, after Mercury. Often referred to as the "Red Planet," Mars is a terrestrial planet with diverse landscapes.',
    texture: '/textures/mars_1k_color.jpg',
    type:"planet",

  },
  jupiter: {
    name: 'Jupiter',
    description:
      'Jupiter is the largest planet in the Solar System and is primarily composed of hydrogen and helium. It has a strong magnetic field and a complex system of rings and moons.',
    texture: '/textures/jupitermap.jpg',
    type:"planet",

  },
  saturn: {
    name: 'Saturn',
    description:
      'Saturn is known for its stunning ring system, which consists of nine continuous main rings and three discontinuous arcs. It is the sixth planet from the Sun.',
    texture: '/textures/saturnmap.jpg',
    ringsTexture:"/textures/saturnringcolor.jpg",
    type:"planet",

  },
  uranus: {
    name: 'Uranus',
    description:
      'Uranus is the seventh planet from the Sun and is unique among the planets because it rotates on its side. It is often referred to as an "ice giant" due to its composition.',
    texture: '/textures/uranusmap.jpg',
    ringsTexture:"/textures/uranusringcolour.jpg",
    type:"planet",


  },
  neptune: {
    name: 'Neptune',
    description:
      'Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is a gas giant and is often referred to as the "Blue Giant" because of its blue appearance.',
    texture: '/textures/neptunemap.jpg',
    type:"planet",

    
  },
  voyager1: {
    name: 'Voyager1',
    description:
      'Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is a gas giant and is often referred to as the "Blue Giant" because of its blue appearance.',
    texture: '/textures/Voyager.glb',
    type:"ship",

    
  },
};

export default planets;
