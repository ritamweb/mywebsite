'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  };

  btnsOpenModal.forEach(btn=> btn.addEventListener('click', openModal));
//   console.log(btnsOpenModal);
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo= document.querySelector('.btn--scroll-to');
const section1= document.querySelector('#section--1');
const sections = document.querySelectorAll('.section');
const btnsScrollTo= document.querySelectorAll('.nav__link');
const operationContainer = document.querySelector('.operations__tab-container');
const btnsoperation = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

// Adding scrolling feature to Lean more button

btnScrollTo.addEventListener('click', function(e) {
  //const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(window.pageYOffset);

//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//      top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth',
// });

section1.scrollIntoView({behavior: 'smooth'});
});


// btnsScrollTo.forEach(btn =>
//   btn.addEventListener('click', function (e) {
//   //  const sec = btn.getAttribute('href');
// e.preventDefault();
//   const sectn=  document.querySelector(btn.getAttribute('href'));
 
//  sectn.scrollIntoView({behavior: 'smooth'});

// //   window.scrollTo({
// //     left: coords.left + window.pageXOffset,
// //     top: coords.top + window.pageYOffset,
// //     behavior: 'smooth',
// // });

//   } ));

// Adding eventlistener to a common parent element for the navitgation scrolling 

document.querySelector('.nav__links').addEventListener('click', function(e){
    e.preventDefault();
  // console.log(e.target);
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'}); }
});

//Adding tabbed functonality (3 tabs)
operationContainer.addEventListener('click', function(e){

  const clicked = e.target.closest('.operations__tab');


  if(!clicked) return;
  // console.log(clicked);

  //removing active class
  btnsoperation.forEach(btn => btn.classList.remove('operations__tab--active'));
  operationsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  clicked.classList.add('operations__tab--active');
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

const handlehover = function(e,opacity) {
  if(e.target.classList.contains('nav__link'))
  {
  const link= e.target;
  const siblings =  link.closest('.nav').querySelectorAll('.nav__link');
  const logo= link.closest('.nav').querySelector('img');
 
  siblings.forEach(el => {
    if(el!== link) el.style.opacity = this;
  });
 
  logo.style.opacity =this;
}
 }

nav.addEventListener('mouseover', handlehover.bind(0.5));

nav.addEventListener('mouseout',  handlehover.bind(1));

/* to make the header stick after the header gets out of view*/
const stickyNav = function(entries) {
  const [entry]= entries;
  // console.log(entry);
  
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  };
  const navHeight= nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(
  stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
  }
);

headerObserver.observe(header);

/*Revealing each section as we scroll through */
const appear = function(entries) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target);
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appear, {
  root: null,
  threshold: 0.15,
  });

  sections.forEach(sec => {

  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
}
  );

/* Revealing pictures/elements when scrolling */
// const lazyimgs = document.querySelectorAll('feature__img');
const lazyimgs = document.querySelectorAll('img[data-src]');

const lazy = function(entries) {
const [entry] = entries;
// console.log(entry);
  if(entry.isIntersecting)
    entry.target.src = (entry.target.dataset.src) ;
   entry.target.addEventListener('load', function () {
     entry.target.classList.remove('lazy-img');
   });
  headerObserver.unobserve(entry.target);
// else  entry.target.classList.add('lazy-img');
};

const featureObserver = new IntersectionObserver(lazy, {
  root: null,
  threshold: 0.1,
});

lazyimgs.forEach(image => featureObserver.observe(image) );
//*************************************************************/

// Slider component animation
const slides = document.querySelectorAll('.slide');
const sliderbtn = document.querySelectorAll(".slider__btn");

let curSlide = 0;
// Creating the dots 
const dotContainer = document.querySelector('.dots');

const createDots = function() {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  });
};

createDots();
const dots = document.querySelectorAll('.dots__dot');
dots[0].classList.add('dots__dot--active');

const dotActive = function(active) {
  dots.forEach(d =>{
    d.classList.remove('dots__dot--active');
    if(d.dataset.slide === String(active)) 
    {
      d.classList.add('dots__dot--active');
      //gotoSlide(d.dataset.slide);
    }
});
}

slides.forEach((s,i) => {
  // console.log(i*100);
  s.style.transform = `translateX(${i*100}%)`;
});


function gotoSlide (slide) {
  slides.forEach(function (a,i) {
    a.style.transform = `translateX(${(i-slide)*100}%)`;
}); 
dotActive(slide);
}

function nextSlide()  {  curSlide = curSlide < (slides.length-1) ? ++curSlide : 0;
  // console.log(curSlide);
 //dotActive(curSlide);
  gotoSlide(curSlide);
}

function prevSlide() {
  curSlide = curSlide > 0 ? --curSlide : (slides.length-1);
 // dotActive(curSlide);
gotoSlide(curSlide);
}

gotoSlide(0);

sliderbtn.forEach(btn => {
  btn.addEventListener('click', function (e) {
     if(e.target.classList.contains('slider__btn--right'))
   nextSlide();
    else if(e.target.classList.contains('slider__btn--left')) 
    prevSlide();
  });
});

document.addEventListener('keydown', function(e) {

  if(e.key === 'ArrowLeft') prevSlide();
  else if(e.key === 'ArrowRight') nextSlide();

});

// IMplementing dots 
dotContainer.addEventListener('click', function (e) {

 //e.target.closest('.dots__dot') ;
//  console.log(e.target.dataset.slide);
if(e.target.closest('.dots__dot')){
  const active = e.target.dataset.slide;
  //dotActive(active);
  gotoSlide(active);
}
});

// window.addEventListener('beforeunload', function(e){
// e.returnValue = '';
// });