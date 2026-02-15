const container = document.getElementById('animation-container');
        const loveBtn = document.getElementById('love-btn');

        /**
         * Creates a floating element (emoji or paper).
         * @param {string} type - 'emoji' or 'paper'
         * @param {string} direction - 'up' or 'down'
         */
        function createFloatingElement(type = 'emoji', direction = 'up') {
            const el = document.createElement('div');
            el.classList.add('floating-element');
            
            if (type === 'emoji') {
                const emojis = ['❤️', '💖', '✨', '🎂', '🥳', '🎈', '🎁'];
                el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
                el.style.fontSize = (Math.random() * 15 + 20) + 'px';
            } else {
                // Celebration paper (confetti)
                el.style.width = (Math.random() * 10 + 8) + 'px';
                el.style.height = (Math.random() * 15 + 10) + 'px';
                el.style.backgroundColor = `hsl(${Math.random() * 360}, 75%, 65%)`;
                el.style.borderRadius = Math.random() > 0.5 ? '2px' : '0px';
            }
            
            el.style.left = Math.random() * 100 + 'vw';
            const duration = (Math.random() * 2 + 3);
            el.style.animationDuration = duration + 's';
            
            // Set the animation based on direction
            if (direction === 'down') {
                el.style.animationName = 'fallDown';
                el.style.top = '-10vh'; // Start above screen
            } else {
                el.style.animationName = 'floatUp';
                el.style.top = '100vh'; // Start below screen
            }
            
            container.appendChild(el);
            setTimeout(() => el.remove(), duration * 1000);
        }

        function triggerCelebration() {
            // Burst of 60 falling papers and emojis
            for(let i = 0; i < 60; i++) {
                setTimeout(() => {
                    const type = Math.random() > 0.4 ? 'paper' : 'emoji';
                    createFloatingElement(type, 'down');
                }, i * 40);
            }
        }

        // Periodic gentle floating items going UP (ambience)
        setInterval(() => createFloatingElement('emoji', 'up'), 1500);

        // Click event triggers falling celebration
        loveBtn.addEventListener('click', triggerCelebration);

        // Initial celebration on load
        window.addEventListener('load', () => {
            setTimeout(triggerCelebration, 800);
        });

        // Parallax effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header img');
            const scrolled = window.pageYOffset;
            if (scrolled < 500) {
                header.style.transform = `translateY(${scrolled * 0.35}px)`;
            }
        });