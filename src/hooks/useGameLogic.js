import { useEffect, useState, useRef } from 'react';
import words from '../housie.json';
import { useAudio } from './useAudio';

export function useGameLogic() {

  const{
    isSanEnabled,
    toggleSan,
    playAudio
  } = useAudio ();
 
  const grid = words.grid; 
  const housieListSa = words.housieListSa;

  const [currentNumber, setCurrentNumber] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showComplete, setIsComplete] = useState(false);
  const [showInstructions, setshowInstructions] = useState(false);
  const popRef = useRef(null);

  useEffect(() => {
     if(showComplete){
      popRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
     }
  }, [showComplete]);

  const generateRandom =() => {
    const min = 1;
    const max = 28;
  

  const random = Math.floor(
    Math.random() * (max - min +1)
  ) + min

  return random;

};

 const generateNextRandom = () => {
    if (selectedNumbers.length >= 28) {
      completion ()
      return null;
    }

  
let random = generateRandom();

    while (selectedNumbers.includes(random)){
      random = generateRandom();
    }
    
    setSelectedNumbers(prev=> [...prev, random]);
    if (selectedNumbers.length === 27){
      setIsComplete(true);
    }
    return random;
  };

    const getDisplayNumber = (number) => {

    if (number === 21) return 30; 
    if (number === 22) return 40; 
    if (number === 23) return 50; 
    if (number === 24) return 60; 
    if (number === 25) return 70;
    if (number === 26) return 80;
    if (number === 27) return 90;
    if (number === 28) return 100;

    return number;
  }

  const handleGenerate = () => {
      const random = generateNextRandom();

      if (random === null) return; 

      const displayNumber = getDisplayNumber(random);

      setCurrentNumber(getDisplayNumber(random));
      playAudio(displayNumber)
  }

  const handleRestart = () => {
     setCurrentNumber(0);
     setSelectedNumbers([]);
     setIsComplete(false);
  }

  const getSanskritWord = (number) => {
    if (number >= 1 && number <= 20) {
      return housieListSa[number -1];
    }

    const indexMap = {
      30: 20, 
      40: 21,
      50: 22,
      60: 23,
      70: 24,
      80: 25,
      90: 26,
      100: 27
    };

    return housieListSa[indexMap[number]] ?? '';
  };


    const instruction =  () => {
    setshowInstructions(true);
    }
  
    const closeInstructions = () => {
    setshowInstructions(false);
    };

    const completion = () => {
    setIsComplete(true);
    }    

    const closeIsComplete = () => {
    setIsComplete(false);
    } 


  return {
    grid,
    currentNumber,
    selectedNumbers,
    isSanEnabled,
    showComplete,
    showInstructions,
    popRef,
    getDisplayNumber,
    getSanskritWord,
    playAudio,
    toggleSan,
    handleGenerate,
    handleRestart,
    instruction,
    closeInstructions,
    closeIsComplete
  };
}
