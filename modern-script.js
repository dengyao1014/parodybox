document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Character Data
    const characters = [
        {
            name: "Beatbox Master",
            description: "Creates amazing beat patterns",
            icon: "🎵"
        },
        {
            name: "Melody Maker",
            description: "Adds beautiful melodies",
            icon: "🎼"
        },
        {
            name: "Bass King",
            description: "Drops the bass lines",
            icon: "🎸"
        },
        {
            name: "Effect Wizard",
            description: "Adds special effects",
            icon: "✨"
        }
    ];

    // Dynamically Add Characters
    const characterGrid = document.querySelector('.character-grid');
    if (characterGrid) {
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            characterCard.innerHTML = `
                <div class="character-icon">${character.icon}</div>
                <h3>${character.name}</h3>
                <p>${character.description}</p>
            `;
            characterGrid.appendChild(characterCard);
        });
    }

    // Add Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Play Button Interaction
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            // Add your game launch logic here
            alert('Game launching soon!');
        });
    }

    // Add dynamic header behavior
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// Add some CSS styles dynamically
const style = document.createElement('style');
style.textContent = `
    .character-card {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        transition: transform 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .character-card:hover {
        transform: translateY(-10px);
    }

    .character-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .character-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    section.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .main-header {
        transition: transform 0.3s ease;
    }

    .main-header.scroll-down {
        transform: translateY(-100%);
    }

    .main-header.scroll-up {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
