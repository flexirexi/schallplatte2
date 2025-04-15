document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.handle').addEventListener('click', () => {
        const slide = document.getElementById('mobile-slideup');
        const up = slide.style.transform === 'translateY(30%)';
        slide.style.transform = up ? 'translateY(80%)' : 'translateY(30%)';
      });
});

