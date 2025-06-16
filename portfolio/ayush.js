/* ----- NAVIGATION BAR FUNCTION ----- */
function toggleMenu() {
  const navMenu = document.getElementById("myNavMenu");
  navMenu.classList.toggle("responsive");
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() { addHeaderShadow(); };

function addHeaderShadow() {
  const navHeader = document.getElementById("header");
  const isScrolled = document.body.scrollTop > 50 || document.documentElement.scrollTop > 50;

  if (isScrolled) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
  } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
const typingEffect = new Typed(".typedText", {
  strings: ["Designer", "Developer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
});

/* ----- SCROLL REVEAL ANIMATION ----- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});

// Home Section
sr.reveal('.featured-text-card', {});
sr.reveal('.featured-name', { delay: 100 });
sr.reveal('.featured-text-info', { delay: 200 });
sr.reveal('.featured-text-btn', { delay: 200 });
sr.reveal('.social_icons', { delay: 200 });
sr.reveal('.featured-image', { delay: 300 });

// Project Box
sr.reveal('.project-box', { interval: 200 });

// Headings
sr.reveal('.top-header', {});

/* ----- SCROLL REVEAL LEFT/RIGHT ANIMATION ----- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
});

srLeft.reveal('.about-info', { delay: 100 });
srLeft.reveal('.contact-info', { delay: 100 });

const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
});

srRight.reveal('.skills-box', { delay: 100 });
srRight.reveal('.form-control', { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector('.nav-menu a[href*="' + sectionId + '"]').classList.add('active-link');
      } else {
          document.querySelector('.nav-menu a[href*="' + sectionId + '"]').classList.remove('active-link');
      }
  });
}

window.addEventListener('scroll', updateActiveLink);a