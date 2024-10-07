import { useState } from 'react';
import './App.css';

const initialCardSet = [
  {question: "Which driver has won the most World Championships?", answer:"Lewis Hamilton" },
  {question: "What team has competed in every season of F1?", answer:"Ferrari" },
  {question: "Who is the youngest driver to win a Grand Prix?", answer:"Max Verstappen" },
  {question: "What track is known as the Temple Of Speed?", answer:"Monza" },
  {question: "What color is associated with Ferrari", answer:"The Color Red" }
];

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardHistory, setCardHistory] = useState([0]);
  const [cardSet, setCardSet] = useState(initialCardSet);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);

  const getRandomCard = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cardSet.length);
    } while (newIndex === currentCardIndex);
    setCurrentCardIndex(newIndex);
    setIsFlipped(false);
    setCardHistory(prevHistory => [...prevHistory, newIndex]);
    resetCard();
  };

  const goToPreviousCard = () => {
    if(cardHistory.length > 1) {
      const newHistory = cardHistory.slice(0, -1);
      setCardHistory(newHistory);
      setCurrentCardIndex(newHistory[newHistory.length - 1]);
      setIsFlipped(false)
      resetCard();
    }
  }

  

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const shuffleCards = () => {
    const shuffled = [...cardSet];
    for(let i  = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCardSet(shuffled);
    setCurrentCardIndex(0);
    setCardHistory([0]);
    setIsFlipped(false);
    resetCard();
  };


  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const submitGuess = () => {
    const isCorrect = guess.toLowerCase() === cardSet[currentCardIndex].answer.toLowerCase();
    setFeedback(isCorrect);
    setIsFlipped(true);
  };


  const resetCard = () => {
    setIsFlipped(false);
    setGuess('');
    setFeedback(null);
  }

  return (
    <>
      <div>
      </div>
      <h1>F1 Trivia Challenge</h1>
      <h4>How much do you know about Formula 1!</h4>
      <p>Number of cards: {cardSet.length}</p>
      <div onClick={toggleCard} className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="inner">
          <div className='front'>
            <p>{cardSet[currentCardIndex].question}</p>
          </div>
          <div className="Back">
          <p>{cardSet[currentCardIndex].answer}</p>
          {feedback !== null && (
              <p className={feedback ? 'correct' : 'incorrect'}>
                {feedback ? 'Correct!' : 'Incorrect. Try again!'}
              </p>
            )}
          </div>
        </div>
          
        
      </div>
      <button onClick={goToPreviousCard} type='prev' className='nextCard'>Back</button>
      <button onClick={getRandomCard} type='next' className='nextCard'>Next</button>
      <button onClick={shuffleCards} type='button' className='nextCard'>Shuffle</button>
      
      <div className="guess-section">
        <input 
          type="text" 
          value={guess} 
          onChange={handleGuessChange} 
          placeholder="Enter your guess"
        />
        <button onClick={submitGuess}>Submit</button>
      </div>
      
    </>
  )
}

export default App
