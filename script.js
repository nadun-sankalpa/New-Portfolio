// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")

  // Hide loading screen after 2 seconds
  setTimeout(() => {
    loadingScreen.classList.add("fade-out")
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)
})

// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const sunIcon = document.getElementById("sunIcon")
const moonIcon = document.getElementById("moonIcon")
const html = document.documentElement

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem("theme") || "dark"
html.classList.add(currentTheme)

// Update icons based on current theme
function updateThemeIcons() {
  if (html.classList.contains("dark")) {
    sunIcon.classList.add("hidden")
    moonIcon.classList.remove("hidden")
  } else {
    sunIcon.classList.remove("hidden")
    moonIcon.classList.add("hidden")
  }
}

updateThemeIcons()

themeToggle.addEventListener("click", () => {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark")
    html.classList.add("light")
    localStorage.setItem("theme", "light")
  } else {
    html.classList.remove("light")
    html.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
  updateThemeIcons()
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-slide-up")
    }
  })
}, observerOptions)

// Observe all sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav")
  if (window.scrollY > 50) {
    navbar.classList.add("bg-background/95")
  } else {
    navbar.classList.remove("bg-background/95")
  }
})

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".animate-float")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name") || this.querySelector('input[type="text"]').value
  const email = formData.get("email") || this.querySelector('input[type="email"]').value
  const subject = formData.get("subject") || this.querySelectorAll('input[type="text"]')[1].value
  const message = formData.get("message") || this.querySelector("textarea").value

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitButton = this.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    this.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Add hover effects to project cards
document.querySelectorAll(".bg-background.rounded-lg").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
    this.style.boxShadow = "0 20px 40px rgba(0, 191, 255, 0.1)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
    this.style.boxShadow = "none"
  })
})

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect after loading screen
setTimeout(() => {
  const heroTitle = document.querySelector("h1")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ""), 50)
  }
}, 2500)

// Add glowing effect to buttons on hover
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 0 20px rgba(0, 191, 255, 0.5)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.boxShadow = "none"
  })
})

// Mobile menu toggle (if needed)
const mobileMenuButton = document.createElement("button")
mobileMenuButton.className = "md:hidden p-2 rounded-lg bg-card hover:bg-accent transition-colors duration-300"
mobileMenuButton.innerHTML = `
    <svg class="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
`

// Add mobile menu functionality
const navbar = document.querySelector("nav .flex")
const navLinks = document.querySelector(".hidden.md\\:block")

if (window.innerWidth < 768) {
  navbar.appendChild(mobileMenuButton)

  mobileMenuButton.addEventListener("click", () => {
    navLinks.classList.toggle("hidden")
    navLinks.classList.toggle("absolute")
    navLinks.classList.toggle("top-16")
    navLinks.classList.toggle("left-0")
    navLinks.classList.toggle("w-full")
    navLinks.classList.toggle("bg-background")
    navLinks.classList.toggle("border-t")
    navLinks.classList.toggle("border-border")
  })
}

// Add scroll progress indicator
const progressBar = document.createElement("div")
progressBar.className = "fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
progressBar.style.width = "0%"
document.body.appendChild(progressBar)

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.offsetHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  progressBar.style.width = scrollPercent + "%"
})

// Animate skills bars and circles on load
window.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const fill = bar.querySelector('.bar-fill');
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            fill.style.width = width + '%';
        }, 400);
    });
    // Animate circle SVGs
    document.querySelectorAll('.circle-skill').forEach(circleSkill => {
        const percent = circleSkill.getAttribute('data-percent');
        const circle = circleSkill.querySelector('.circle-anim');
        if (circle && percent) {
            const offset = 251.2 - (251.2 * parseInt(percent, 10) / 100);
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 700);
        }
    });
});

// Modern Contact Form Animation Logic
const modernForm = document.getElementById('modernContactForm');
const btn = modernForm.querySelector('.submit-btn');
const btnText = btn.querySelector('.btn-text');
const btnLoader = btn.querySelector('.btn-loader');
const btnSuccess = btn.querySelector('.btn-success');
const successMsg = document.getElementById('formSuccessMessage');

modernForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Start loader animation
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline-block';
  btnSuccess.style.display = 'none';
  btn.disabled = true;

  setTimeout(() => {
    btnLoader.style.display = 'none';
    btnSuccess.style.display = 'inline-block';
    btn.classList.add('success');
    successMsg.style.display = 'block';
    modernForm.reset();
    setTimeout(() => {
      btnText.style.display = 'inline-block';
      btnSuccess.style.display = 'none';
      btn.classList.remove('success');
      btn.disabled = false;
      successMsg.style.display = 'none';
    }, 2300);
  }, 1400);
});

// --- Footer Live Particle Animation ---
(function() {
  const canvas = document.querySelector('.footer-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = 100;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = 100;
  }
  window.addEventListener('resize', resize);

  const particles = [];
  const colors = ['#facc15', '#fde047', '#fffbe7'];
  for (let i = 0; i < 36; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 2 + Math.random() * 2.5,
      d: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.6 + Math.random() * 0.3,
      dx: -0.4 + Math.random() * 0.8,
      dy: -0.2 + Math.random() * 0.4,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  }
  function update() {
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    }
  }
  function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
  }
  loop();
})();

console.log("🚀 Nadun Sankalpa Portfolio Loaded Successfully!")
