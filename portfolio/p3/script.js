'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-03-31T23:36:17.929Z',
    '2022-04-04T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatDate = (date, locale) => {
    
    const calcDays = (date1, date2) => Math.round(Math.abs(date1-date2)/ (1000*60*60*24));

    const numdays =calcDays(new Date(), date);

    if(numdays === 0) return 'Today';
    if(numdays === 1) return 'Yesterday';
    if(numdays <= 7) return `${numdays} days ago`;
    else
    {
    // const year= date.getFullYear();
    // const month= `${date.getMonth() + 1}`.padStart(2, 0);
    // const day=`${date.getDate()}`.padStart(2, 0);
    // return `${day}-${month}-${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
    }
};
const options = {
  style: 'currency',
  currency: 'INR',
};
const dispcurrency = num => new Intl.NumberFormat('hi-IN',options).format(num);

const displayMovements = function (acc, sort = false)
{
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;

 
  // console.log(movs);

  movs.forEach(function (mov, i){
    const type = mov>0 ? 'deposit' : 'withdrawal';

    const date=new Date( acc.movementsDates[i]);
    
    const displayDate= formatDate(date, acc.locale);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${dispcurrency(mov)}</div>
  </div>`;

  containerMovements.insertAdjacentHTML('afterbegin',html);
   });
}

const thebalance = function(acc) {
  acc.balance = acc.movements.reduce((ac, val) =>ac  += val, 0);
  labelBalance.textContent = dispcurrency(acc.balance);
}

const totalSummary = function(cacc) {
  labelSumIn.textContent=  `${dispcurrency(cacc.movements.filter(x => x > 0).reduce((sum, v) => sum+v))}`;
  labelSumOut.textContent=  `${dispcurrency(Math.abs(cacc.movements.filter(x => x < 0).reduce((sum, v) => sum+v)))}`;
  labelSumInterest.textContent= `${dispcurrency(cacc.movements.filter(a => a>0).map(dep => dep*cacc.interestRate/100).reduce((sum,a)=> sum + a))}`;
 }

 const showtimer= function () {
  let time= 300;
    const thetimer = function () {
      labelTimer.textContent=`${`${Math.trunc(time/60)}`.padStart(2,0)} : ${`${time%60}`.padStart(2,0)}`;
     
     if(time=== 0)  {
       containerApp.style.opacity = 0;
       labelWelcome.textContent = 'Log in to get started';
       clearInterval(timer);
     }
     time--;
   };
  thetimer();
  timer=   setInterval(thetimer,1000);  
  return timer;
}

 function updateUI (cacc) {
 // Display movements
 displayMovements(cacc);
 // Display summary
 totalSummary(cacc);
 //Display balance
 thebalance(cacc); }

const calcusername = function (accs) {

    accs.forEach(function (acc) {
      acc.username= acc.owner.toLowerCase().split(' ').map(x => x[0]).join('');
    });
}
// Login funbctionality
let currentacc, timer;

btnLogin.addEventListener('click', function (ev) {
  ev.preventDefault();

  // Checking the credentials
  currentacc= accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentacc?.pin=== +inputLoginPin.value)
  {
     // Display UI & welcome message
    labelWelcome.textContent = `Welcome, ${currentacc.owner.split(' ')[0]}!`;
    containerApp.style.opacity = 100;

    // Creating current Date
    const date=new Date();
    // const year= date.getFullYear();
    // const month= `${date.getMonth() + 1}`.padStart(2, 0);
    // const day=`${date.getDate()}`.padStart(2, 0);
    // const hrs = `${date.getHours()}`.padStart(2, 0);
    // const mins = `${date.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent= `${day}-${month}-${year}  ${hrs}:${mins}`;
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(currentacc.locale,options).format();

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    updateUI(currentacc);
    // document.querySelector('.login').innerHTML ='';
    // document.querySelector('.login').insertAdjacentHTML('afterbegin',`<button class="logout__btn">Logout</button>`);

    if(timer) clearInterval(timer);
     timer = showtimer();
  }


});

// Transfer functionality
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  if(amount > 0 && receiverAcc && currentacc.balance > amount && receiverAcc?.username !== currentacc.username) {
    receiverAcc.movements.push(amount);
    currentacc.movements.push(-amount);
    currentacc.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentacc);

    clearInterval(timer);
     timer = showtimer();
  }
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
});

//Taking a loan when a deposit worth atleast 10% of the loan is done
btnLoan.addEventListener('click', function(e) {
 e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if(amount > 0 && currentacc.movements.some(a => a> amount * 0.1)) {
    currentacc.movements.push(amount);
    currentacc.movementsDates.push(new Date().toISOString());
    
    setTimeout(updateUI, 3000, currentacc);

    clearInterval(timer);
     timer = showtimer();
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

});

// Delete the account
btnClose.addEventListener('click', function(e) {
  e.preventDefault(0);

  if(inputCloseUsername.value=== currentacc.username && currentacc.pin === Number(inputClosePin.value)) {
    const a= accounts.findIndex(acc => acc.username === inputCloseUsername);
    accounts.splice(a,1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value= inputClosePin.value = '';
  inputCloseUsername.blur();
});
let tosort = true;
btnSort.addEventListener('click', function(e)
{
    e.preventDefault();
    displayMovements(currentacc, tosort);
    tosort = !tosort;
})

calcusername(accounts);
// console.log(accounts);


labelBalance.addEventListener('click', function() {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => el.textContent.replace('€', ''));
  console.log(movementsUI);
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
