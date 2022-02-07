import React from 'react';
import './App.css';
import Topbar from './components/Topbar/Topbar'
import CardNav from './components/CardNav/CardNav';
import Flashcard from './components/Flashcard/Flashcard';

function App() {
  return (
    <React.Fragment>
      <Topbar />
      <div className='container'>
        <CardNav />
        <Flashcard />
      </div>
    </React.Fragment>
  );
}

export default App;
