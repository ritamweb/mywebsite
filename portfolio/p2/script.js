'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

const current1 = document.getElementById('current--1');
let currentScore, activePlayer, scores, playing;

const init = function () {
   currentScore = 0;
   activePlayer = 0;
   scores = [0,0];
   playing = true;

   dice.classList.add('hidden');
   for (let i=0; i<=1; i++)
   {   
      document.querySelector(`#score--${i}`).textContent = '0';
      document.getElementById(`current--${i}`).textContent = 0;
      document.querySelector(`.player--${i}`).classList.remove('player--winner');
   }

   document.querySelector('.player--0').classList.add('player--active');
   document.querySelector(`.player--1`).classList.remove('player--active');
}

init();

score0.textContent = 0;
score1.textContent = 0;

dice.classList.add('hidden');

function switchPlayer () {
         currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');  
        activePlayer = activePlayer === 0? 1 : 0;
        document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
}


document.querySelector('.btn--roll').addEventListener('click', function () {
   if(playing) {
   const num = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');

    // switch (num)
    // {
    //     case 1: 
    //         dice.src = 'dice-1.png';
    //         document.querySelector('.player--active current--score').textContent += num;
    //         break;
    //     case 2:
    //         dice.src = 'dice-2.png';
    //         break;
    //     case 3:
    //         dice.src = 'dice-3.png';
    //         break;
    //     case 4:
    //         dice.src = 'dice-4.png';
    //         break;
    //     case 5:
    //         dice.src = 'dice-5.png';
    //         break;
    //     case 6: 
    //         dice.src = 'dice-6.png';  
    //         break;             
    // }

    dice.src = `dice-${num}.png`;

    if(num !== 1)
       {
        currentScore += num;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
       }
    else 
       { 
         switchPlayer();
       } 
      }   
});

document.querySelector('.btn--hold').addEventListener('click', function () {
   if(playing) {
   scores[activePlayer] += currentScore;
   document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
   if (scores[activePlayer] >= 100) {
      playing=false;
      dice.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
   }   else 
      {
         switchPlayer();
      }
   }
});

document.querySelector('.btn--new').addEventListener('click', init);