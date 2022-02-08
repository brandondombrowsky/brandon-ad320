import React from 'react';
import './App.css';
import Topbar from './components/Topbar/Topbar'
import CardNav from './components/CardNav/CardNav';
import Flashcard from './components/Flashcard/Flashcard';
import Button from './components/Button/Button';


const controls = ['Back', 'Flip', 'Next']

function App() {
  return (
    <React.Fragment>
      <Topbar />
      <div className='container'>
        <CardNav />
        <div className='card-container'>
        <Flashcard />
          <div className='card-controls'>
            {controls.map((control) => {
              return <Button className='button'>{control}</Button>
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
