import { useState } from 'react';
import './App.css'

function App() {

  const grid = {
    columns: 3, 
    rows: 10
  }

  const [currentNumber, setCurrentNumber] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isSanEnabled, setIsSanEnabled] = useState(true);

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
      alert("All Numbers Filled");
       return null;
    }
  
let random = generateRandom();

    while (selectedNumbers.includes(random)){
      random = generateRandom();
    }
    
    setSelectedNumbers(prev=> [...prev, random]);
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
     
  }

  const toggleSan = () => {
  setIsSanEnabled(prev => !prev);
};

  const playAudio = (number) => {
    if(!isSanEnabled) return;
    const audio = document.getElementById(`audio-${number}`);

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(console.error)
    }
  }

  return (
    <>
    <div className="container">

    <div>
        <h2>Housie Number Generator</h2>
       <div className='line-seperator'></div>

    </div>

  <div className='displayed-btn'>
     <div className="bigNumberDisplay">
        <h4>{currentNumber}</h4>
            <button className={`san-tts ${isSanEnabled ? 'listening' : ''}`}
            onClick={toggleSan}
            aria-label={isSanEnabled ? 'Disable sanskrit tts' : 'Enable sanskrit tts'}>
            {isSanEnabled ? '🔈' : '🔇'}
          </button>
    </div>
    </div>


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

<div className='audioFiles'>

  {[
    ...Array.from({length: 20}, (_, i) => i+1), 
    30, 40, 50, 60, 70, 80, 90, 100
  ]. map((number) => (
  <audio
  key={number}
  id={`audio-${number}`}
  preload="auto" 
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
