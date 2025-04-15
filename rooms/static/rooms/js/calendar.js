document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("calendarWrapper");
    if (wrapper) {
        wrapper.scrollTo({
            top: wrapper.scrollHeight * (2 / 3),
            behavior: "smooth"
          });
    }
    
    document.querySelector('.handle').addEventListener('click', () => {
        const slide = document.getElementById('mobile-slideup');
        const up = slide.style.transform === 'translateY(30%)';
        slide.style.transform = up ? 'translateY(80%)' : 'translateY(30%)';
    });

    document.getElementById("myDatePicker").addEventListener("change", function() {
        document.getElementById("dateForm").submit();
    });


});

