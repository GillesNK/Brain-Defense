// Gestionnaire d'arrière-plan joyeux et évolutif selon le niveau
const BackgroundEngine = (() => {
    let clouds = [];
    let balloons = [];
    let stars = [];
    let time = 0;

    // Initialisation des éléments décoratifs
    function init(width, height) {
        clouds = Array.from({ length: 5 }, () => ({
            x: Math.random() * width,
            y: Math.random() * (height * 0.45) + 20,
            speed: 12 + Math.random() * 15,
            scale: 0.7 + Math.random() * 0.6
        }));

        const balloonColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1'];
        balloons = Array.from({ length: 4 }, (_, i) => ({
            x: (width / 4) * i + 40,
            y: Math.random() * (height * 0.6) + 40,
            speedY: 10 + Math.random() * 12,
            swayOffset: Math.random() * Math.PI * 2,
            color: balloonColors[i % balloonColors.length]
        }));

        stars = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * (height * 0.8),
            size: 1 + Math.random() * 2.2,
            blinkSpeed: 2 + Math.random() * 4,
            phase: Math.random() * Math.PI * 2
        }));
    }

    function drawCloud(ctx, x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.arc(20, -6, 26, 0, Math.PI * 2);
        ctx.arc(42, 0, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawBalloon(ctx, b, t) {
        const swayX = b.x + Math.sin(t * 1.5 + b.swayOffset) * 14;
        ctx.save();
        // Nacelle
        ctx.fillStyle = '#835c3b';
        ctx.fillRect(swayX - 5, b.y + 22, 10, 8);
        // Cordes
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(swayX - 4, b.y + 22);
        ctx.lineTo(swayX - 8, b.y + 12);
        ctx.moveTo(swayX + 4, b.y + 22);
        ctx.lineTo(swayX + 8, b.y + 12);
        ctx.stroke();
        // Ballon
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(swayX, b.y, 16, 0, Math.PI * 2);
        ctx.fill();
        // Reflet joyeux
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.beginPath();
        ctx.arc(swayX - 5, b.y - 5, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawHills(ctx, width, height, colorBack, colorFront) {
        // Colline arrière
        ctx.fillStyle = colorBack;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, height - 55);
        ctx.quadraticCurveTo(width * 0.3, height - 110, width * 0.65, height - 50);
        ctx.quadraticCurveTo(width * 0.85, height - 20, width, height - 65);
        ctx.lineTo(width, height);
        ctx.fill();

        // Colline avant
        ctx.fillStyle = colorFront;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, height - 30);
        ctx.quadraticCurveTo(width * 0.5, height - 80, width, height - 25);
        ctx.lineTo(width, height);
        ctx.fill();
    }

    return {
        init,
        updateAndDraw(ctx, width, height, dt, score) {
            time += dt;

            // Le décor repart sur son premier biome après les deux suivants.
            // Chaque tranche de score fait avancer le cycle sans le bloquer en nuit.
            const scene = Math.floor(Math.max(0, score) / 80) % 3;
            if (scene === 0) {
                // === NIVEAU FACILE : Matin ensoleillé & Collines ===
                const grad = ctx.createLinearGradient(0, 0, 0, height);
                grad.addColorStop(0, '#38bdf8');
                grad.addColorStop(1, '#bae6fd');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);

                // Soleil rayonnant
                const sunPulse = Math.sin(time * 2) * 4;
                ctx.fillStyle = 'rgba(253, 224, 71, 0.3)';
                ctx.beginPath();
                ctx.arc(width - 55, 55, 42 + sunPulse, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#fde047';
                ctx.beginPath();
                ctx.arc(width - 55, 55, 28, 0, Math.PI * 2);
                ctx.fill();

                // Nuages qui défilent
                clouds.forEach(c => {
                    const span = width + 140;
                    c.x = -70 + ((((c.x + 70 + c.speed * dt) % span) + span) % span);
                    drawCloud(ctx, c.x, c.y, c.scale);
                });

                drawHills(ctx, width, height, '#4ade80', '#22c55e');

            } else if (scene === 1) {
                // === NIVEAU MOYEN : Coucher de soleil festif & Montgolfières ===
                const grad = ctx.createLinearGradient(0, 0, 0, height);
                grad.addColorStop(0, '#6366f1');
                grad.addColorStop(0.55, '#f43f5e');
                grad.addColorStop(1, '#fb923c');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);

                // Montgolfières qui montent doucement
                balloons.forEach(b => {
                    b.y -= b.speedY * dt;
                    if (b.y + 40 < 0) {
                        const span = height + 80;
                        b.y = -40 + ((((b.y + 40) % span) + span) % span);
                        b.x = Math.random() * (width - 60) + 30;
                    }
                    drawBalloon(ctx, b, time);
                });

                drawHills(ctx, width, height, '#7e22ce', '#581c87');

            } else {
                // === NIVEAU DIFFICILE : Nuit étoilée & Aurores boréales ===
                const grad = ctx.createLinearGradient(0, 0, 0, height);
                grad.addColorStop(0, '#090d16');
                grad.addColorStop(1, '#1e1b4b');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);

                // Aurore boréale ondulante
                ctx.save();
                const auroraGrad = ctx.createLinearGradient(0, 40, width, 180);
                auroraGrad.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
                auroraGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.28)');
                auroraGrad.addColorStop(1, 'rgba(236, 72, 153, 0.25)');
                ctx.fillStyle = auroraGrad;
                ctx.beginPath();
                ctx.moveTo(0, 120);
                for (let x = 0; x <= width; x += 25) {
                    const y = 110 + Math.sin(x * 0.015 + time * 1.8) * 30;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(width, 200);
                ctx.lineTo(0, 200);
                ctx.fill();
                ctx.restore();

                // Étoiles scintillantes
                stars.forEach(s => {
                    const alpha = 0.4 + 0.6 * Math.abs(Math.sin(time * s.blinkSpeed + s.phase));
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                drawHills(ctx, width, height, '#312e81', '#1e1b4b');
            }
        }
    };
})();
