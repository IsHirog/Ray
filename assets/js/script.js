function updateCountup() {
    const startDate = new Date("March 06, 2024 06:35:09").getTime();
    const now = new Date();
    const elapsed = now.getTime() - startDate;

    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = `${days} `;
    document.getElementById("hours").innerText = `${hours}`;
    document.getElementById("minutes").innerText = `${minutes}`;
    document.getElementById("seconds").innerText = `${seconds}`;

    checkAno(now);
}

function checkAno(date) {
    const day = date.getDate();

    if (day === 6) {
        startConfettiAndHearts();
    }
}
function startConfettiAndHearts() {
    const colors = ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1b9', '#f9bec7'];
    const hearts = ['❤️', '💖', '💘', '💕', '💝'];

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.overflow = 'hidden';
    container.style.zIndex = 9999;
    document.body.appendChild(container);

    function createParticle() {
        const isHeart = Math.random() < 0.5;
        const particle = document.createElement('div');

        particle.style.position = 'absolute';
        particle.style.fontSize = `${Math.random() * 20 + 10}px`;
        particle.style.userSelect = 'none';
        particle.style.willChange = 'transform';
        particle.style.pointerEvents = 'none';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = '-30px';
        particle.style.opacity = Math.random() + 0.5;

        if (isHeart) {
            particle.innerText = hearts[Math.floor(Math.random() * hearts.length)];
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.filter = 'drop-shadow(0 0 2px rgba(0,0,0,0.2))';
        }

        container.appendChild(particle);

        let fallDuration = 4000 + Math.random() * 3000;
        let start = null;

        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percent = progress / fallDuration;

            particle.style.top = `${percent * 100}vh`;
            particle.style.left = `calc(${parseFloat(particle.style.left)}vw + ${(Math.sin(percent * 10) * 5)}vw)`;
            particle.style.opacity = `${1 - percent}`;

            if (percent < 1) {
                requestAnimationFrame(animate);
            } else {
                container.removeChild(particle);
            }
        }

        requestAnimationFrame(animate);
    }

    const interval = setInterval(createParticle, 300);

    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
            document.body.removeChild(container);
        }, 5000);
    }, 10000);
}

setInterval(updateCountup, 1000);
updateCountup();
