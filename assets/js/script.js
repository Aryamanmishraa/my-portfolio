'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// =============================================
// SCROLL-REVEAL ANIMATIONS
// =============================================

/**
 * Applies reveal classes to elements within a given page article.
 * Sections get "reveal", list children get staggered delays.
 */
function applyRevealClasses(article) {
  // Reveal sections (about-text, service, timeline, skill, projects, contact-form, mapbox)
  const sections = article.querySelectorAll(
    '.about-text, .service, .timeline, .skill, section.projects, .contact-form, .mapbox, .resume-download'
  );
  sections.forEach(function (section) {
    if (!section.classList.contains('reveal')) {
      section.classList.add('reveal');
    }
  });

  // Reveal the article title with a left-slide
  const titles = article.querySelectorAll('.article-title');
  titles.forEach(function (title) {
    if (!title.classList.contains('reveal-left')) {
      title.classList.add('reveal-left');
    }
  });

  // Stagger service items
  const serviceItems = article.querySelectorAll('.service-item');
  serviceItems.forEach(function (item, index) {
    if (!item.classList.contains('reveal-scale')) {
      item.classList.add('reveal-scale');
    }
    const staggerClass = 'stagger-' + Math.min(index + 1, 8);
    if (!item.classList.contains(staggerClass)) {
      item.classList.add(staggerClass);
    }
  });

  // Stagger timeline items
  const timelineItems = article.querySelectorAll('.timeline-item');
  timelineItems.forEach(function (item, index) {
    if (!item.classList.contains('reveal')) {
      item.classList.add('reveal');
    }
    const staggerClass = 'stagger-' + Math.min(index + 1, 8);
    if (!item.classList.contains(staggerClass)) {
      item.classList.add(staggerClass);
    }
  });

  // Stagger skill items
  const skillItems = article.querySelectorAll('.skills-item');
  skillItems.forEach(function (item, index) {
    if (!item.classList.contains('reveal')) {
      item.classList.add('reveal');
    }
    const staggerClass = 'stagger-' + Math.min(index + 1, 8);
    if (!item.classList.contains(staggerClass)) {
      item.classList.add(staggerClass);
    }
  });

  // Stagger project items
  const projectItems = article.querySelectorAll('.project-item');
  projectItems.forEach(function (item, index) {
    if (!item.classList.contains('reveal-scale')) {
      item.classList.add('reveal-scale');
    }
    const staggerClass = 'stagger-' + Math.min(index + 1, 8);
    if (!item.classList.contains(staggerClass)) {
      item.classList.add(staggerClass);
    }
  });
}

/**
 * Resets all reveal elements inside an article so they can animate again
 * when the page is visited again.
 */
function resetReveals(article) {
  const revealEls = article.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealEls.forEach(function (el) {
    el.classList.remove('visible');
  });
}

/**
 * IntersectionObserver to trigger "visible" class when elements scroll into view.
 */
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

/**
 * Observe all reveal elements in a given article.
 */
function observeReveals(article) {
  const revealEls = article.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });
}

// Apply reveal classes to ALL articles on load
const allArticles = document.querySelectorAll('[data-page]');
allArticles.forEach(function (article) {
  applyRevealClasses(article);
});

// Observe reveals on the currently active article
const activeArticle = document.querySelector('[data-page].active');
if (activeArticle) {
  // Small delay so the page slide-in animation plays first
  setTimeout(function () {
    observeReveals(activeArticle);
  }, 100);
}



// =============================================
// PAGE NAVIGATION (with animations)
// =============================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const selectedPage = this.textContent.trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      if (selectedPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);

        // Reset and re-observe reveals so they animate in fresh
        resetReveals(pages[j]);
        setTimeout(function () {
          observeReveals(pages[j]);
        }, 150); // slight delay to let the page slide-in start

      } else {
        pages[j].classList.remove("active");
        resetReveals(pages[j]);
      }
    }

    for (let j = 0; j < navigationLinks.length; j++) {
      if (navigationLinks[j] === this) {
        navigationLinks[j].classList.add("active");
      } else {
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}


// Position the "Show Contacts" button centered at the top of the viewport
// only while the About section is visible on small screens.
function positionContactBtnOverAbout() {
  const btn = document.querySelector('.info_more-btn');
  const about = document.querySelector('.about');
  if (!btn || !about) return;

  const MOBILE_MAX = 480;
  let aboutObserver = null;
  let mutationObservers = [];

  function enableObserver() {
    if (aboutObserver) return;

    aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When About is visible on mobile, pin button to top-right of viewport
          btn.style.position = 'fixed';
          btn.style.top = '20px';
          btn.style.right = '12px';
          btn.style.left = 'auto';
          btn.style.transform = 'none';
          btn.style.zIndex = '9999';
        } else {
          // When About is not visible, revert to sidebar position
          btn.style.position = '';
          btn.style.top = '';
          btn.style.left = '';
          btn.style.right = '';
          btn.style.transform = '';
          btn.style.zIndex = '';
        }
      });
    }, { threshold: 0.25 });

    aboutObserver.observe(about);

    // Observe page class changes (active page) so the observer can be re-applied
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => {
      const mo = new MutationObserver(() => {
        if (aboutObserver) {
          aboutObserver.disconnect();
          aboutObserver.observe(about);
        }
      });
      mo.observe(page, { attributes: true, attributeFilter: ['class'] });
      mutationObservers.push(mo);
    });
  }

  function disableObserver() {
    if (aboutObserver) {
      aboutObserver.disconnect();
      aboutObserver = null;
    }
    mutationObservers.forEach(mo => mo.disconnect());
    mutationObservers = [];
    // ensure styles are cleared
    btn.style.position = '';
    btn.style.top = '';
    btn.style.left = '';
    btn.style.transform = '';
    btn.style.zIndex = '';
  }

  function checkResize() {
    if (window.innerWidth <= MOBILE_MAX) {
      enableObserver();
    } else {
      disableObserver();
    }
  }

  checkResize();
  window.addEventListener('resize', checkResize);
}

// Initialize after DOM ready
document.addEventListener('DOMContentLoaded', positionContactBtnOverAbout);
