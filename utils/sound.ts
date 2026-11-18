import { createAudioPlayer, type AudioPlayer, type AudioSource } from 'expo-audio';

/** Spelar upp ett ljud en gång och frigör spelaren när det är klart. */
export function playOnce(source: AudioSource): void {
  try {
    const player = createAudioPlayer(source);
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (status.didJustFinish) {
        subscription.remove();
        player.remove();
      }
    });
    player.play();
  } catch (error) {
    console.log('Error playing sound:', error);
  }
}

/** Startar ett loopande ljud och returnerar spelaren så att den kan stoppas med stopPlayer. */
export function playLoop(source: AudioSource, volume = 0.8): AudioPlayer | null {
  try {
    const player = createAudioPlayer(source);
    player.loop = true;
    player.volume = volume;
    player.play();
    return player;
  } catch (error) {
    console.log('Error playing looping sound:', error);
    return null;
  }
}

/** Stoppar och frigör en spelare. */
export function stopPlayer(player: AudioPlayer | null | undefined): void {
  if (!player) return;
  try {
    player.pause();
    player.remove();
  } catch (error) {
    console.log('Error stopping sound:', error);
  }
}
