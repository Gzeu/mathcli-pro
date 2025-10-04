// Interactive functionality for MathCLI Pro showcase

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const copyBtns = document.querySelectorAll('.copy-btn');

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Demo Tabs Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabBtns.forEach(tb => tb.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Copy to Clipboard functionality
copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Visual feedback
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#48bb78';
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.background = '';
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy text: ', err);
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Visual feedback
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#48bb78';
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.background = '';
            }, 2000);
        }
    });
});

// Terminal Animation
class TerminalAnimator {
    constructor(element) {
        this.element = element;
        this.commands = [
            { 
                command: 'mathcli-pro calculate "sin(pi/2) + sqrt(16)"',
                output: '5',
                delay: 1000
            },
            {
                command: 'mathcli-pro convert "100 cm to m"',
                output: '1 m',
                delay: 2000
            },
            {
                command: 'mathcli-pro plot-chart 3 1 4 1 5 9',
                output: `9 ┤     █
8 ┤     ║
7 ┤     ║
6 ┤     ║
5 ┤     ██
4 ┤ █   ║║
3 ██    ║║
2 ║║    ║║
1 ║██   ║║
0 └┴┴┴┴┴┴┘`,
                delay: 3000
            }
        ];
        this.currentIndex = 0;
    }
    
    typeWriter(element, text, speed = 50) {
        return new Promise(resolve => {
            let i = 0;
            element.textContent = '';
            
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }
    
    async animate() {
        const lines = this.element.querySelectorAll('.terminal-line');
        const outputs = this.element.querySelectorAll('.terminal-output');
        
        for (let i = 0; i < this.commands.length; i++) {
            if (lines[i] && outputs[i]) {
                const commandElement = lines[i].querySelector('.command');
                
                await new Promise(resolve => setTimeout(resolve, this.commands[i].delay));
                await this.typeWriter(commandElement, this.commands[i].command, 30);
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (this.commands[i].output.includes('┤')) {
                    outputs[i].innerHTML = this.commands[i].output.replace(/\n/g, '<br>');
                } else {
                    outputs[i].textContent = this.commands[i].output;
                }
            }
        }
    }
}

// Initialize terminal animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTerminal = document.querySelector('.hero .terminal-body');
    if (heroTerminal) {
        const animator = new TerminalAnimator(heroTerminal);
        // Start animation after a delay
        setTimeout(() => animator.animate(), 2000);
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .command-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Particle background animation (optional enhancement)
class ParticleBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Add particle background to hero (optional)
// Uncomment the following lines to enable particle background
/*
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(canvas);
        new ParticleBackground(canvas);
    }
});
*/

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'C' to copy install command
    if (e.key === 'c' || e.key === 'C') {
        const installCommand = 'npm install -g mathcli-pro';
        navigator.clipboard.writeText(installCommand).then(() => {
            console.log('Install command copied to clipboard!');
        });
    }
    
    // Press 'D' to go to demo section
    if (e.key === 'd' || e.key === 'D') {
        const demoSection = document.getElementById('demo');
        if (demoSection) {
            demoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        }, 0);
    });
}

// Error handling for missing elements
const handleMissingElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
};

// Progressive enhancement checks
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsClipboard = 'clipboard' in navigator;

if (!supportsIntersectionObserver) {
    console.warn('IntersectionObserver not supported, falling back to immediate animations');
}

if (!supportsClipboard) {
    console.warn('Clipboard API not supported, using fallback method');
}