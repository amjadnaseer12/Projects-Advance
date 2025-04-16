// Navbar animation
function navBar() {
  const tl1 = gsap.timeline();
  // Animate logo and menu open button
  tl1.from(".logo, .menu-open", {
    duration: 1,
    y: -100,
    opacity: 0,
    stagger: { amount: 0.4 },
  });

  const tl = gsap.timeline({ paused: true });
  // Animate menu opening sequence
  tl.to(".menu-container", { duration: 1, x: 0 })
    .from(".menu-close", { opacity: 0, rotate: "180deg" }, "-=.2")
    .from(".line", { duration: 1, stagger: { amount: 0.5 }, width: "0%" }, "-=.2")
    .from(".menu-item-number", { duration: 1, stagger: { amount: 0.5 }, y: 100 }, "-=1.5")
    .from(".menu-item-name", { duration: 1, stagger: { amount: 0.5 }, y: 100 }, "-=1.3")
    .from(".menu-item-sub", { duration: 1, stagger: { amount: 0.5 }, y: 100 }, "-=1.1")
    .from(".menu-item-icon", { duration: 1, stagger: { amount: 0.5 }, y: 100 }, "-=1");

  // Menu open and close functions
  window.menuOpen = function () { tl.play(); };
  window.menuClose = function () { tl.reverse(); };
}
navBar();

// Hero section animations
function heroContent() {
  document.addEventListener("DOMContentLoaded", function () {
    splitTextIntoSpans(".counter p");
    splitTextIntoSpans(".hero-copy h1");
    splitTextIntoSpans(".hero-text-body p");

    // Image layer animation
    gsap.to(".img-holder .layers", { left: 0, stagger: 0.1, ease: "power4.out", duration: 1.5, delay: 4 });
    gsap.to(".img-holder .layers", { left: "110%", stagger: -0.1, ease: "power4.out", duration: 1, delay: 8 });

    startLoader();
  });

  // Splitting text into spans for animation
  function splitTextIntoSpans(selector) {
    var element = document.querySelector(selector);
    if (element) {
      var text = element.innerText;
      var splitText = text.split("").map((char) => `<span style="position:relative; top:200px;">${char}</span>`).join("");
      element.innerHTML = splitText;
    }
  }

  // Loader animation function
  function startLoader() {
    var counterElement = document.querySelector(".counter p");
    var currentValue = 0;

    function updateCounter() {
      if (currentValue === 100) {
        animateText();
        return;
      }
      currentValue += Math.floor(Math.random() * 10) + 1;
      currentValue = currentValue > 100 ? 100 : currentValue;
      counterElement.innerHTML = currentValue.toString().split("").map((char) => `<span>${char}</span>`).join("") + "<span>%</span>";

      var delay = Math.floor(Math.random() * 200) + 100;
      setTimeout(updateCounter, delay);
    }

    function animateText() {
      setTimeout(() => {
        gsap.to(".counter p span", { top: "-400px", stagger: 0.1, ease: "power3.inOut", duration: .8 });
        gsap.to(".overlay", { opacity: 0, x: "-100%", ease: "power3.inOut", duration: 1, delay: 4 });
        gsap.to(".hero-copy h1 span", { top: "0px", stagger: 0.1, ease: "power3.inOut", duration: 1.5, delay: 4 });
        gsap.to(".hero-text-body p span", { top: "0px", stagger: 0.01, ease: "power3.inOut", duration: .01, delay: 5 });
      }, 300);
    }
    updateCounter();
  }
}
heroContent();

// Portfolio gallery filtering and animations
function filterGallery() {
  $(document).ready(function () {
    var $portfolioIsotope = $('.portfolio-container').isotope({ itemSelector: '.portfolio-item', layoutMode: 'fitRows', transitionDuration: '0.6s' });
    $('#portfolio-filter li').on('click', function () {
      $('#portfolio-filter li').removeClass('filter-active');
      $(this).addClass('filter-active');
      var filterValue = $(this).attr('data-filter');
      $portfolioIsotope.isotope({ filter: filterValue });
    });
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.portfolio-item').forEach((item) => {
    gsap.fromTo(item, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 80%", end: "bottom 60%", toggleActions: "play none none reverse" }
    });
  });

  $('.portfolio-img img').hover(
    function () { gsap.to(this, { scale: 1.1, duration: 0.5, ease: "power2.out" }); },
    function () { gsap.to(this, { scale: 1, duration: 0.5, ease: "power2.out" }); }
  );
}
filterGallery();

// Card overlapping animation
function cardsOvelap() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  let timeln = gsap.timeline({
    scrollTrigger: {
      trigger: ".cards",
      pin: true,
      pinSpacing: true,
      start: "left-=120px left",
      end: "+=3000", // Increase end value
      scrub: 1
    }
  });

  timeln.addLabel('card1').to('.card-1', { xPercent: 0, opacity: 1 });
  timeln.from('.card-2', { xPercent: 75, opacity: 0 }).addLabel("card2");
  timeln.to(".card-1", { scale: 0.95, xPercent: -0.5, opacity: 0.5 }, "-=0.3");
  timeln.to('.card-2', { xPercent: 0, opacity: 1 });
  timeln.from('.card-3', { xPercent: 75, opacity: 0 }).addLabel('card3');
  timeln.to(".card-2", { scale: 0.98, xPercent: -0.4, opacity: 0.6 }, "-=0.3");
  timeln.to(".card-3", { xPercent: 0, opacity: 1 });
}
cardsOvelap();
// Add this to your main.js or inline script tag
gsap.utils.toArray('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: this.getAttribute('href'), offsetY: 70 }, // adjust offset as per your need
      ease: 'power2.inOut'
    });
  });
});


// contact us page
function contactContainer() {
  // GSAP Animation for Contact Section
  gsap.registerPlugin(ScrollTrigger);

  // Animate the contact section on scroll
  gsap.from(".contact-section", {
    scrollTrigger: {
      trigger: ".contact-section", // Element to trigger the animation
      start: "top 80%", // Start animation when the top of the section hits 80% of the viewport
      end: "bottom 20%", // End animation when the bottom of the section hits 20% of the viewport
      toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
    },
    opacity: 0, // Start with opacity 0
    y: 50, // Start 50px below
    duration: 1, // Animation duration
    ease: "power2.out", // Easing function
  });

  // Form Submission Logic
  document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // Simulate form submission (you can replace this with an AJAX call or other logic)
    console.log('Form Submitted!');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Clear the form
    document.getElementById('contactForm').reset();

    // Show a success message
    alert('Thank you for contacting us! We will get back to you soon.');
  });
}
contactContainer();
// Footer animation
function footerAnimation() {
  gsap.from(".footer-content", {
    scrollTrigger: {
      trigger: ".footer-content",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });
}
footerAnimation();

// Smooth Scroll for Buttons
// document.querySelectorAll('.pricing .btn').forEach(button => {
//   button.addEventListener('click', function (e) {
//       e.preventDefault();
//       document.querySelector(this.getAttribute('href')).scrollIntoView({
//           behavior: 'smooth',
//       });
//   });
// });