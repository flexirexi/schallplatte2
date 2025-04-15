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

    calendarUX(wrapper)
});

// The heavy stuff - selecting time slots in the calendar interface
function calendarUX(wrapper) {
    let isSelecting = false;
    let selectionStartValue = null;
    let selectedRoom = null;
    let selectedSlots = new Set();

    document.querySelectorAll(".calendar-cell").forEach(cell => {
        cell.addEventListener("mousedown", (e) => {
            removeHighlights();   
            isSelecting = true;
            const hour = parseInt(cell.dataset.hour);
            const half = parseInt(cell.dataset.half);
            selectedRoom = cell.dataset.room;
            selectionStartValue = hour * 2 + half;
            selectedSlots.clear();
            highlightCell(cell);
            console.log("DOWN --------");
        });
      
        cell.addEventListener("mouseenter", (e) => {
            if (isSelecting && cell.dataset.room === selectedRoom) {
                const hour = parseInt(cell.dataset.hour);
                const half = parseInt(cell.dataset.half);
                const currentValue = hour * 2 + half;

                const from = Math.min(selectionStartValue, currentValue);
                const to = Math.max(selectionStartValue, currentValue);
                // console.log("--------  ENTER --------");
                // console.log("from: ",from);
                // console.log("to: ", to);
                // console.log("hour: ", hour);
                // console.log("half: ", half);
                // console.log("currentvalue: ", currentValue);
                // console.log("selected room: ", selectedRoom);
                // console.log("---------------------------");
                // console.log(" ");

                document.querySelectorAll(`.calendar-cell[data-room="${selectedRoom}"]`).forEach(c => {
                    const h = parseInt(c.dataset.hour);
                    const m = parseInt(c.dataset.half);
                    const val = h * 2 + m;

                    if (val >= from && val <= to) {
                        highlightCell(c);
                        console.log("HIGHLIGHT THE CELL!!!");
                    } else {
                        c.classList.remove("selected-slot");
                    }
                });

                // clear
                selectedSlots.clear();
                for (let i = from; i <= to; i++) {
                    const h = Math.floor(i / 2);
                    const m = i % 2;
                    selectedSlots.add(`${h}-${m}-${selectedRoom}`);
                }
            }
        });
      
        cell.addEventListener("mouseup", () => {
            isSelecting = false;
            selectedRoom = null;
            selectionStartValue = null;
            sendSelectedToCursor(); // here's my function -> ready for my cursor
        });
    }); 
      
    document.addEventListener("mouseup", () => {
        isSelecting = false;
    });
      
    function highlightCell(cell) {
        cell.classList.add("selected-slot");
    }

    function removeHighlights() {
        document.querySelectorAll(".calendar-cell").forEach(c => {
            c.classList.remove("selected-slot");
        });
    }
}


function sendSelectedToCursor() {

}