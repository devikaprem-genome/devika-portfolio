/**
 * Genomics Portfolio — scripts.js
 * Smooth scroll, mobile nav, scroll-spy, and card reveal animations.
 */

(function () {
  'use strict';

  const siteHeader = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const navSections = document.querySelectorAll('main section[id]');
  const yearEl = document.getElementById('year');

  function getHeaderHeight() {
    return siteHeader ? siteHeader.offsetHeight : 64;
  }

  /* --- Footer year --- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --- Mobile menu toggle --- */
  function closeNav() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function openNav() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    document.addEventListener('click', function (e) {
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        closeNav();
      }
    });
  }

  /* --- Active nav highlight --- */
  function setActiveNav(sectionId) {
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + sectionId);
    });
  }

  function clearActiveNav() {
    navLinks.forEach(function (link) {
      link.classList.remove('active');
    });
  }

  function updateActiveSection() {
    const scrollPos = window.scrollY + getHeaderHeight() + 120;
    let currentId = '';

    navSections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    if (currentId && currentId !== 'hero') {
      setActiveNav(currentId);
    } else {
      clearActiveNav();
    }
  }

  let scrollTicking = false;
  window.addEventListener(
    'scroll',
    function () {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(function () {
          updateActiveSection();
          scrollTicking = false;
        });
      }
    },
    { passive: true }
  );

  window.addEventListener('resize', updateActiveSection);
  updateActiveSection();

  /* --- Smooth scroll for anchor links --- */
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top =
        target.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight();

      window.scrollTo({ top: top, behavior: 'smooth' });
      closeNav();

      if (link.classList.contains('nav-link')) {
        setActiveNav(href.slice(1));
      } else if (href === '#hero') {
        clearActiveNav();
      }
    });
  });

})();
