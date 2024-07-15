document.addEventListener('DOMContentLoaded', () => {
    populateYears();
    populateDays();
    loadRoutine();
});

function populateYears() {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    const endYear = 2030;

    for (let year = currentYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

function populateDays() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const selectedYear = yearSelect.value;
    const selectedMonth = monthSelect.value;

    daySelect.innerHTML = '';

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
}

function loadRoutine() {
    const selectedDay = document.getElementById('day').value;
    const selectedMonth = document.getElementById('month').value;
    const selectedYear = document.getElementById('year').value;
    const dateKey = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    const routineData = JSON.parse(localStorage.getItem(dateKey)) || {};

    for (let i = 1; i <= 9; i++) {
        const doneCheckbox = document.getElementById(`done${i}`);
        const notDoneCheckbox = document.getElementById(`notDone${i}`);
        const card = document.getElementById(`card${i}`);

        doneCheckbox.checked = routineData[`card${i}`] === true;
        notDoneCheckbox.checked = routineData[`card${i}`] === false;

        if (routineData[`card${i}`] === true) {
            card.classList.add('done');
            card.classList.remove('not-done');
        } else if (routineData[`card${i}`] === false) {
            card.classList.add('not-done');
            card.classList.remove('done');
        } else {
            card.classList.remove('done');
            card.classList.remove('not-done');
        }
    }
}

function markAsDone(cardId, isDone) {
    const selectedDay = document.getElementById('day').value;
    const selectedMonth = document.getElementById('month').value;
    const selectedYear = document.getElementById('year').value;
    const dateKey = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    const routineData = JSON.parse(localStorage.getItem(dateKey)) || {};
    routineData[cardId] = isDone;

    localStorage.setItem(dateKey, JSON.stringify(routineData));

    const card = document.getElementById(cardId);
    if (isDone) {
        card.classList.add('done');
        card.classList.remove('not-done');
        document.getElementById(`notDone${cardId.slice(-1)}`).checked = false;
    } else {
        card.classList.add('not-done');
        card.classList.remove('done');
        document.getElementById(`done${cardId.slice(-1)}`).checked = false;
    }
}
