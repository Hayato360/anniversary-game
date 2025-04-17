document.getElementById('add-memory').addEventListener('click', function() {
    const date = prompt('Enter the date (YYYY-MM-DD):');
    const pictureUrl = prompt('Enter the picture URL:');
    addMemory(date, pictureUrl);
});

function addMemory(date, pictureUrl) {
    const timeline = document.getElementById('timeline');
    const memoryItem = document.createElement('div');
    memoryItem.classList.add('memory-item');

    const img = document.createElement('img');
    img.src = pictureUrl;
    memoryItem.appendChild(img);

    const dateElement = document.createElement('span');
    dateElement.classList.add('date');
    dateElement.textContent = date;
    memoryItem.appendChild(dateElement);

    timeline.appendChild(memoryItem);
}

function revealMemory() {
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.style.display = 'block';
}
