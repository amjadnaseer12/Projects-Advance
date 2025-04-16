<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Black Fire Cursor Trail</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      background: #f4f4f4;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }

    h1 {
      text-align: center;
      margin-top: 20vh;
      font-size: 3rem;
      color: #333;
    }

    p {
      text-align: center;
      font-size: 1.2rem;
      color: #666;
    }

    .trail-dot {
      position: absolute;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%);
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
    }
  </style>
</head>
<body>
  <h1>Black Fire Cursor Trail</h1>
  <p>Move your mouse to see the animation effect</p>

  <!-- Cursor Trail -->
  <div id="trail-container"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script>
    const trailContainer = document.getElementById("trail-container");
    const MAX_TRAILS = 30;

    // Create Trail Dots
    for (let i = 0; i < MAX_TRAILS; i++) {
      const dot = document.createElement("div");
      dot.classList.add("trail-dot");
      trailContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".trail-dot");
    let mouseX = 0, mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.to({}, {
      duration: 0.01,
      repeat: -1,
      onUpdate: function () {
        dots.forEach((dot, index) => {
          const delay = index * 0.04; // Staggered animation
          gsap.to(dot, {
            x: mouseX,
            y: mouseY,
            opacity: 1 - index / dots.length, // Fade out effect
            scale: 1 - index / dots.length, // Shrink effect
            duration: 0.4,
            delay: delay,
            ease: "power1.out",
            onComplete: () => {
              // Reset after animation
              if (index === dots.length - 1) {
                gsap.to(dot, { opacity: 0, scale: 0, duration: 0.1 });
              }
            },
          });
        });
      },
    });
  </script>
</body>
</html>
