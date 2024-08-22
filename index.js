/*js*/
let array = [];
let intervalId;
let isSorting = false;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateArray = (size) => {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
};

const renderArray = () => {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`; // Scale the bar height
        container.appendChild(bar);
    });
};

const swap = (i, j) => {
    [array[i], array[j]] = [array[j], array[i]];
};

const bubbleSort = async () => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                renderArray();
                await delay(100 / document.getElementById('speed').value);
            }
        }
    }
};

const insertionSort = async () => {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            renderArray();
            await delay(100 / document.getElementById('speed').value);
        }
        array[j + 1] = key;
        renderArray();
    }
};

// Add more sorting algorithms here...

const sort = async () => {
    if (isSorting) return;
    isSorting = true;
    const selectedAlgorithm = document.getElementById('algorithm').value;
    switch (selectedAlgorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        // Add cases for other algorithms
    }
    isSorting = false;
};

const startSorting = () => {
    if (!isSorting) {
        sort();
    }
};

const pauseSorting = () => {
    if (intervalId) {
        clearInterval(intervalId);
        isSorting = false;
    }
};

const reset = () => {
    if (isSorting) pauseSorting();
    generateArray(parseInt(document.getElementById('size').value));
};

document.getElementById('generateArray').addEventListener('click', () => {
    generateArray(parseInt(document.getElementById('size').value));
});

document.getElementById('startSorting').addEventListener('click', startSorting);
document.getElementById('pauseSorting').addEventListener('click', pauseSorting);
document.getElementById('reset').addEventListener('click', reset);

window.onload = () => {
    generateArray(parseInt(document.getElementById('size').value));
};
