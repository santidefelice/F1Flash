import { useState } from 'react';
import './App.css';

const cardSet = [
  {question: "Which driver has won the most World Championships?", answer:"Lewis Hamilton" },
  {question: "What team has competed in every season of F1?", answer:"Ferrari" },
  {question: "Who is the youngest driver to win a Grand Prix?", answer:"Max Verstappen" },
  {question: "What track is known as the Temple Of Speed?", answer:"Monza" },
  {question: "What color is associated with Ferrari", answer:"The Color Red" }
];

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const getRandomCard = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cardSet.length);
    } while (newIndex === currentCardIndex);
    setCurrentCardIndex(newIndex);
    setIsFlipped(false);
  };

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

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
          </div>
        </div>
          
        
      </div>
      <button onClick={getRandomCard} type='next' className='nextCard'>⭢</button>
      
    </>
  )
}

export default App
