export const themes = {
  classic: {
    name: 'Classic Arena',
    background: 'black',
    paddleColor: 'white',
    ballColor: 'white',
    netColor: 'white',
    fontColor: 'white',
    paddleStyle: 'solid',
  },
  cosmic: {
    name: 'Cosmic Field',
    background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
    paddleColor: '#00bfff',
    ballColor: '#ffeb3b',
    netColor: 'rgba(255, 255, 255, 0.5)',
    fontColor: '#00bfff',
    paddleStyle: 'glow',
  },
  volcano: {
    name: 'Volcano Lair',
    background: 'linear-gradient(to top, #ff416c, #ff4b2b)',
    paddleColor: '#333',
    ballColor: '#fff200',
    netColor: 'rgba(255, 255, 255, 0.3)',
    fontColor: '#fff',
    paddleStyle: 'striped',
  },
};

export const getThemeForLevel = (level) => {
  if (level <= 5) {
    return themes.classic;
  } else if (level <= 10) {
    return themes.cosmic;
  } else {
    return themes.volcano;
  }
};
