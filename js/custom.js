var body = document.querySelector('body'),
    nav = document.querySelector('.nav'),
    navBar = document.querySelector('.nav--bar'),
    navToggle = document.querySelector('.nav--toggle'),
    navMenuIsOpen = false,
    navMenu = document.querySelector('.nav--menu'),
    navMenuBG = document.querySelector('.nav--menu-bg'),
    introInitials = document.querySelector('.intro-initials span'),
    introTitle = document.querySelector('.intro-title span'),
    introArrow = document.querySelector('.intro-arrow'),
    introArrowLine = document.querySelector('.intro-arrow--line'),
    introArrowTipRight = document.querySelector('.intro-arrow--tip-right'),
    introArrowTipLeft = document.querySelector('.intro-arrow--tip-left'),
    mainTL = new TimelineMax(),
    introTextTL = new TimelineMax(),
    introArrowTL = new TimelineMax();


  // TODO: scroll debounce
  var windowHeight = window.innerHeight,
      navBarHeight = navBar.offsetHeight,
      windowNavOffset = windowHeight-navBarHeight;

// ----- INIT ----- //

set();
init();

// smooth scroll
var scroll = new SmoothScroll('a[href*="#"]');


// ----- FUNCTIONS ----- //

function set() {
  // intro text
  introTextTL
    .set(introInitials, {autoAlpha:0, scale:2}, 0)
    .set(introTitle, {autoAlpha:0, scale:0}, 0);

  // intro arrow
  introArrowTL
    .set(introArrow, {autoAlpha:0}, 0)
    .set(introArrowLine, {scaleY:0}, 0)
    .set([introArrowTipRight, introArrowTipLeft], {scaleX:0}, 0);
}

function init() {
  
  mainTL
    .to(body, .3, {autoAlpha:1}, 0)
    .addCallback(animateIntroText, 0)
    .addCallback(animateIntroArrow, 2);
}

// intro
function animateIntroText() {
  introTextTL
    .to(introInitials, .5, {autoAlpha:1, scale:1, ease:Power4.easeIn}, 0)
    .to(introTitle, .5, {autoAlpha:1, scale:1, ease:Power4.easeOut}, .5)
    .to(introTitle, 1, {scrambleText:{text:'Web Design &amp; Development.', chars:'abcdefghijklmnopqrstuvwxyz ', speed:.15, revealDelay:.4}}, .7);

  console.log('animate intro text');
}

function animateIntroArrow() {
  introArrowTL
    .to(introArrow, 0, {autoAlpha:1}, 0)
    .to(introArrowLine, .3, {scaleY:1, ease:Power2.easeOut}, 0)
    .to([introArrowTipRight, introArrowTipLeft], .3, {scaleX:1, ease:Power2.easeOut}, .3);

  console.log('animate intro arrow');
}

// nav
function showNav() {
  navMenuIsOpen = true;

  body.classList.add('nav--is-visible');
  navToggle.classList.add('active');
  navMenu.classList.add('active');
  navMenuBG.classList.add('active');

  console.log('show nav');
}

function hideNav() {
  navMenuIsOpen = false;

  body.classList.remove('nav--is-visible');
  navToggle.classList.remove('active');
  navMenu.classList.remove('active');
  navMenuBG.classList.remove('active');

  console.log('hide nav');
}

// resize
var resizeDebounce = _.debounce(function() {
	
  // TODO: scroll debounce
  var windowHeight = window.innerHeight,
      navBarHeight = navBar.offsetHeight,
      windowNavOffset = windowHeight-navBarHeight;

  console.log('windowHeight', windowHeight);
  console.log('navBarHeight', navBarHeight);
  
}, 250);


// ----- EVENT HANDLERS ----- //

// intro - for testing only
introTitle.addEventListener('click', function(e) {
  // animateIntroText();
  // animateIntroArrow();

  introTextTL.restart();
  introArrowTL.restart();
});

// nav
navToggle.addEventListener('click', function(e) {
  !navMenuIsOpen ? showNav() : hideNav();
  console.log('navMenuIsOpen', navMenuIsOpen);  
}); 

// intro arrow
introArrow.addEventListener('click', function(e) {
  console.log('intro arrow click');
});

// keyboard controls
document.addEventListener('keydown', function(e) {
  var keyboardKeyCode = e.keyCode,
      keyboardKey = e.key;

  switch(keyboardKeyCode) {
    case 27: // esc
      if (navMenuIsOpen) {
        hideNav();
      }
      break;
  }
});

// show navbar on page scroll
document.addEventListener('scroll', function(e) {
  var scrollPosition = pageYOffset;

  if (scrollPosition > windowNavOffset) {
    nav.classList.add('nav--solid');
  } else {
    nav.classList.remove('nav--solid');
  }
});

// resize
window.addEventListener('resize', resizeDebounce);

// enable hover on touch
document.addEventListener('touchstart', function(){}, true);










// text slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
window.onload= function () {
 setInterval(function(){ 
     plusSlides(1);
 }, 3000);
 }
