document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('myDatePicker').value = today;
    const dateInput = document.getElementById('myDatePicker');
    
    document.querySelector('.handle').addEventListener('click', () => {
        const slide = document.getElementById('mobile-slideup');
        const up = slide.style.transform === 'translateY(30%)';
        slide.style.transform = up ? 'translateY(80%)' : 'translateY(30%)';
    });

    document.getElementById("myDatePicker").addEventListener("change", function() {
        const selectedDate = this.value;
    
        fetch(`/rooms/calendar-data/?selected_date=${selectedDate}`)
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              alert(data.error);
              return;
            }
    
            // Beispiel: Buchungen in der Konsole ausgeben
            console.log(data.bookings);
    
            // TODO: Grid aktualisieren
            updateCalendarGrid(data.bookings);
        });
    });


    // Verhindert Tastatureingaben
    dateInput.addEventListener('keydown', function(e) {
      e.preventDefault();
    });
  
    // Optional: Auch Copy/Paste verhindern
    dateInput.addEventListener('paste', function(e) {
      e.preventDefault();
    });
  
    dateInput.addEventListener('drop', function(e) {
      e.preventDefault();
    });

    function updateCalendarGrid(bookings) {
      alert("funzt");
      // Deine Logik, um das Grid mit neuen Buchungen zu füllen
      // z. B. alle Zellen leeren → dann die belegten markieren
    }
});

    
