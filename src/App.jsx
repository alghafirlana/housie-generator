import './App.css'
import words from './housie.json'
import { House, CircleHelp} from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const{
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
  } =useGameLogic();

  return (
    <>
    <div className={`container ${showComplete ? 'scale-out' : ''}`}>

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

export default App;