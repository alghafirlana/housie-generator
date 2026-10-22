import { useState } from 'react';

export function useAudio() {
  const [isSanEnabled, setIsSanEnabled] = useState(true);

   const toggleSan = () => {
      console.log("Button clicked!", isSanEnabled);

  if (isSanEnabled) {
    document.querySelectorAll('audio').forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
   }
   setIsSanEnabled(prev => !prev);
  }

  const playAudio = (number) => {
    if(!isSanEnabled) return;
    const audio = document.getElementById(`audio-${number}`);

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(console.error)
    }
  }

  return {
    isSanEnabled,
    toggleSan,
    playAudio,
  };
}