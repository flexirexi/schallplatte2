document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("calendarWrapper");
    document.getElementById("booking-submit").disabled = "true";
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
            const blocked = cell.dataset.blocked;
            if (blocked=="true") {
                booking_blocked();
            } else {
                booking_not_blocked();
            }
        });
      
        cell.addEventListener("mouseenter", (e) => {
            if (isSelecting && cell.dataset.room === selectedRoom) {
                const hour = parseInt(cell.dataset.hour);
                const half = parseInt(cell.dataset.half);
                const currentValue = hour * 2 + half;
                const blocked = cell.dataset.blocked;
                console.log(blocked);

                const from = Math.min(selectionStartValue, currentValue);
                const to = Math.max(selectionStartValue, currentValue);
                if (blocked=="true") {
                    booking_blocked();
                } 


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
                const roomSelectFake = document.getElementById("id_room_fake");

                //from and to cant be used here, that's why I do it again:
                const dynamicStart = Math.min(selectionStartValue, currentValue);
                const dynamicEnd = Math.max(selectionStartValue, currentValue);

                startInput.value = formatStart(dynamicStart);
                endInput.value = formatEnd(dynamicEnd);
                roomSelect.value = selectedRoom; 
                roomSelectFake.value = selectedRoom;

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

function booking_blocked() {
    const btn = document.getElementById("booking-submit");
    const msg = document.getElementById("form-error-msg");
    btn.disabled = true;
    msg.innerHTML = "No booking possible. Your selection overlaps with existing bookings.";
}

function booking_not_blocked() {
    const btn = document.getElementById("booking-submit");
    const msg = document.getElementById("form-error-msg");
    btn.disabled = false;
    msg.innerHTML = "";
}


function sendSelectedToCursor(selectedSlots) {
    console.log(selectedSlots);
    //click on confirmation, let the cursor add the booking

}




function formatStart(selectionStartValue) {
    const hour = Math.floor(selectionStartValue / 2);
    const minutes = selectionStartValue % 2 === 0 ? "00" : "30";
    let dateform = document.getElementById("myDatePicker");
    console.log("date: ", dateform.value);
    return `${dateform.value}T${ hour.toString().padStart(2, "0")}:${minutes}`;
  }

function formatEnd(selectionEndValue) {
    selectionEndValue = selectionEndValue + 1
    console.log("to: ", selectionEndValue);
    let dateform = document.getElementById("myDatePicker");
    const hour = Math.floor(selectionEndValue / 2);
    const minutes = selectionEndValue % 2 === 0 ? "00" : "30";
    return `${dateform.value}T${hour.toString().padStart(2, "0")}:${minutes}`;
}



document.getElementById("booking-submit").addEventListener("click", function (e) {
    
    const realRoom = document.getElementById("id_room");
    const fakeRoom = document.getElementById("id_room_fake");
    realRoom.value = fakeRoom.value;

    
    document.getElementById("id_start").readOnly = false;
    document.getElementById("id_end").readOnly = false;
});