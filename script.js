// ===== DOM Elements =====
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// ===== Navbar Scroll Effect =====
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Add/remove scrolled class for background change
  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ===== Mobile Menu Toggle =====
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
})

// ===== Close menu on link click =====
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = ""
  })
})

// ===== Smooth scroll for navigation links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===== Intersection Observer for Animations =====
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// ===== Active Navigation Highlight =====
const sections = document.querySelectorAll("section[id]")

function highlightNav() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) navLink.classList.add("active")
    }
  })
}

window.addEventListener("scroll", highlightNav)

// ===== Typing Effect for Hero Section =====
const heroTitle = document.querySelector(".hero-title")
const titles = ["ML Research Engineer", "AI Enthusiast", "Problem Solver", "Data Scientist"]
let titleIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

function typeEffect() {
  const currentTitle = titles[titleIndex]

  if (isDeleting) {
    heroTitle.textContent = currentTitle.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    heroTitle.textContent = currentTitle.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 100
  }

  if (!isDeleting && charIndex === currentTitle.length) {
    isDeleting = true
    typingSpeed = 2000 // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    titleIndex = (titleIndex + 1) % titles.length
    typingSpeed = 500 // Pause before typing next
  }

  setTimeout(typeEffect, typingSpeed)
}

// Start typing effect after page loads
window.addEventListener("load", () => {
  setTimeout(typeEffect, 1000)
})

// ===== Parallax Effect for Hero =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
    heroContent.style.opacity = 1 - scrolled / window.innerHeight
  }
})

// ===== Project Cards Tilt Effect =====
const projectCards = document.querySelectorAll(".project-card")

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
  })
})

// ===== Console Easter Egg =====
console.log("%c👋 Hello there!", "font-size: 24px; font-weight: bold; color: #64ffda;")
console.log("%cInterested in my code? Check out my GitHub!", "font-size: 14px; color: #8892b0;")
console.log("%chttps://github.com/tejaswiraj", "font-size: 14px; color: #64ffda;")
