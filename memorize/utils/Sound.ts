import Sound from 'react-native-sound';


export const soundSelectCard = new Sound('click_select.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Impossible de charger le fichier audio', error);
    }
  });

  export const soundSuccesAnswer = new Sound('coin_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Impossible de charger le fichier audio', error);
    }
  });

  export const soundGameWin = new Sound('success_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Impossible de charger le fichier audio', error);
    }
  });

  export const soundFailAnswer = new Sound('fail_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Impossible de charger le fichier audio', error);
    }
  });

  export const soundCardMovement = new Sound('start.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Impossible de charger le fichier audio', error);
    }
  });

  export const soundStartGame = new Sound('start_game.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Impossible de charger le fichier audio', error);
    }
  });

  export const soundBonusWin = new Sound('joker_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Impossible de charger le fichier audio', error);
    }
  });