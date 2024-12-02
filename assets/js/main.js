/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu=document.getElementById('nav-menu'),
      navToggle=document.getElementById('nav-toggle'),
      navClose=document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu');
    })
}


/*==================== QUALIFICATION TABS ====================*/
const tabs=document.querySelectorAll('[data-target]'),
      tabContents=document.querySelectorAll('[data-content]');

tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
        const target=document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent=>{
            tabContent.classList.remove('qualification__active');
        })
        target.classList.add('qualification__active');

        tabs.forEach(tab=>{
            tab.classList.remove('qualification__active');
        })
        tab.classList.add('qualification__active');
    })
})


/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper('.portfolio__container', {
    cssMode:true,
    loop:true,

    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },
    pagination:{
        el:'.swiper-pagination',
        clickable:true,
    },
    breakpoints:{
        568:{
            slidesPerView:1,
        },
    }
  });


  var app = document.getElementById('typewriter');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Frontend Developer')
    .pauseFor(2000)
    .deleteAll(7)
    .typeString('Backend Developer')
    .pauseFor(1500)
    .deleteAll(7)
    .typeString('Music Producer')
    .pauseFor(1000)
    .start();

// Include this after initializing other components
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form refresh

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    emailjs.send('service_id', 'template_id', {
        name: name,
        email: email,
        message: message,
    }, 'public_key').then(() => {
        alert('Message sent successfully!');
        document.getElementById('contact-form').reset();
    }).catch((error) => {
        alert('Failed to send message. Please try again later.');
        console.error('EmailJS Error:', error);
    });
});
