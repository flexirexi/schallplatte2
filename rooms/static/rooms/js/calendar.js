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
                const blocked = cell.dataset.blocked;

                const from = Math.min(selectionStartValue, currentValue);
                const to = Math.max(selectionStartValue, currentValue);
                console.log("--------  ENTER --------");
                console.log("from: ",from);
                console.log("to: ", to);
                console.log("hour: ", hour);
                console.log("half: ", half);
                console.log("currentvalue: ", currentValue);
                console.log("startvalue: ", selectionStartValue);
                console.log("selected room: ", selectedRoom);
                console.log("---------------------------");
                console.log(" ");
                console.log("Blocked:   ", blocked);

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

                // adding to the form for confirmation
                const startInput = document.getElementById("id_start");
                const endInput = document.getElementById("id_end");
                const roomSelect = document.getElementById("id_room");

                //from and to cant be used here, that's why I do it again:
                const dynamicStart = Math.min(selectionStartValue, currentValue);
                const dynamicEnd = Math.max(selectionStartValue, currentValue);

                startInput.value = formatStart(dynamicStart);
                endInput.value = formatEnd(dynamicEnd);
                roomSelect.value = selectedRoom; 

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
            sendSelectedToCursor(selectedSlots); // here's my function -> ready for my cursor
            

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


function sendSelectedToCursor(selectedSlots) {
    //check if there is only one blocked cell in the selection
    if (is_selection_blocked(selectedSlots)) {
        alert("One or multiple slots are blocked. Please chosse other time slots.");
        return;
    } 
    //click on confirmation, let the cursor add the booking

}


function is_selection_blocked(selectedSlots) {
    const blockedSlots = [];

    selectedSlots.forEach(key => {
        const [hour, half, room] = key.split("-");
        const cell = document.querySelector(`.calendar-cell[data-hour="${hour}"][data-half="${half}"][data-room="${room}"]`);
  
        if (cell && cell.dataset.blocked === "true") {
            blockedSlots.push(key);
        return;
        }
    });
  
    if (blockedSlots.length > 0) {
        return true;
    }
    return false;
}

function formatStart(selectionStartValue) {
    const hour = Math.floor(selectionStartValue / 2);
    const minutes = selectionStartValue % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  }

function formatEnd(selectionEndValue) {
    selectionEndValue = selectionEndValue + 1
    console.log("to: ", selectionEndValue);
    const hour = Math.floor(selectionEndValue / 2);
    const minutes = selectionEndValue % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
}