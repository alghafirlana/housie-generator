import { useState, useEffect, useRef } from 'react';
import './App.css'
import words from './housie.json'
import { House, CircleHelp} from 'lucide-react';

function App() {

  const grid = {
    columns: 3, 
    rows: 10
  }

  const [currentNumber, setCurrentNumber] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isSanEnabled, setIsSanEnabled] = useState(true);
  const [showComplete, setIsComplete] = useState(false);
  const [showInstructions, setshowInstructions] = useState(false);
  const housieListSa = words.housieListSa
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

  return (
    <>
    <div className={`container ${showComplete ? 'scale-out' : ''} `}>

    <div className='nav-top'>
       <h2>🔢 Housie Number Generator</h2>
       <button className ='homeBtn' onClick={()=> window.location.href='https://zat.am/'} aria-label="homeBtn">
        <House size={20} color="black" />
       </button>
       <button className ='show-instructions' onClick={instruction} aria-label="show-instructions">
        <CircleHelp size={20} color="black" />
        </button>
      </div>
       <div className='line-seperator'></div>

  <div className='displayed-btn'>
     <div className="bigNumberDisplay">
        <h4>{currentNumber}</h4>
            <button 
            className="san-tts"
            onClick={toggleSan}
            type="button"
            >
            {isSanEnabled ? '🔈' : '🔇'}
          </button>
    </div>
    </div>

   {currentNumber !== 0 && (
   <div className='san-generator'>
   <h2>{getSanskritWord(currentNumber)}</h2>
    </div>
  )}



<div>
  <div className='btn-container'>
 <button className='btnGenerate' onClick={handleGenerate}
  >Generate 🎲</button>
<button className='btnReset' onClick={handleRestart}
>Reset ⟲</button>
</div>

<div className="numberTable">
  {Array.from({
    length: grid.rows * grid.columns
  }).map((_, index) => {

    const row = Math.floor(index / grid.columns);
    const column = index % grid.columns;

    const number = column * grid.rows + row;
    // const freeNumber = column === 0 ? number - 1 : number;
    const freeCell = index === 0;

    const selected =
      number >= 1 &&
      number <= 28 && 
      selectedNumbers.includes(number);

    return (
      <div
        key={index}
        className={`cell ${freeCell ? 'free' : selected ?  'selected' : ''}`}
        onClick={() => {
          if (selected && !freeCell){
            playAudio(getDisplayNumber(number));
          }
        }}
      >
        {freeCell ? '' : selected ? getDisplayNumber(number) : ''}
      </div>
    );
  })}
</div>

    {showInstructions && (
    <div className="popup-instructions">
    <button className='instructionXBtn'onClick={closeInstructions}>
      X 
    </button>
    <h2>INSTRUCTIONS</h2>
    <div className='instruct-line-seperator'></div>
    <div className='instructions-list'>
    <p>The computer will Generate a number 🎲</p>
    <p>Generated Numbers are marked on the grid 🔢 </p>
    <p>Toggle the audio to hear Sanskrit 🔊</p>
    <p>Fill up the Housie Board 📋</p>
    <p>Click Reset to try again 🔄</p>
    </div>
    </div>
   )}


  {showComplete && (
  <div className='popup' ref={popRef}>
    <button className='completeXBtn'onClick={closeIsComplete}>
      X
    </button>
    <h2>⭐ All Numbers Filled ⭐</h2>
    <p> Click Reset to try again</p>
  </div>
  )}

<div className='audioFiles'>

  {[
    ...Array.from({length: 20}, (_, i) => i+1), 
    30, 40, 50, 60, 70, 80, 90, 100
  ]. map((number) => (
  <audio
  key={number}
  id={`audio-${number}`}
  preload="none" 
  >

    <source src={`/audio/${number}.mp3`}
     type="audio/mpeg" 
    />
  </audio>
  ))}
  </div>
  </div>
 </div>
 

 </>
 );
}

export default App
