const nav = document.querySelector('.nav');
const menu = nav.querySelectorAll('a');
const sections= document.querySelectorAll('.section');

function togglebtn () 
{aside.classList.toggle('open');
    navtoggle.classList.toggle('open');
    sections.forEach((sec) => sec.classList.toggle('open')); 
}


// ---------------------------------Active tab --------------------------
nav.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if(!target) return;
    // console.log(target.getAttribute('href'));
    menu.forEach((item,i) =>{
        if(sections[i].classList.contains('active')) 
        sections[i].classList.add('backsection');
        else   
        sections[i].classList.remove('backsection');
        
        if(item.getAttribute('href') === target.getAttribute('href'))
        {
            item.classList.add('active');
            sections[i].classList.add('active');
        }
        
        else
        {
            item.classList.remove('active');
            sections[i].classList.remove('active');
        }
    });
    if(window.innerWidth < 1200)  togglebtn();
});

//------------Typing animation--------------------
let typed = new Typed(".typing", {
    strings: ["","", "Senior Mechanical Engineer", "Web Developer"] ,
    typeSpeed: 60,
    backSpeed: 20,
    loop: true,
});


//-----------Navigation toggler------

const navtoggle= document.querySelector('.nav-toggler');
const aside= document.querySelector('.aside');

navtoggle.addEventListener('click', togglebtn);

//-------------Hire me button---------
const hireme = document.querySelector('.hire-me');
hireme.addEventListener('click', (e) => {
    // console.log(e.target.getAttribute('href'));
    sections.forEach((el,i) => {
        el.classList.remove('active');
        el.classList.remove('backsection');
        menu[i].classList.remove('active');
        // console.log(el);
        if(e.target.getAttribute('href')=== `#${el.getAttribute('id')}`) {
            // console.log('helloaaaa');
            el.classList.add('active');
            menu[i].classList.add('active');
        }
        sections[1].classList.add('backsection');
    })
});
