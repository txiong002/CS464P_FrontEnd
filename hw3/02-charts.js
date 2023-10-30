const backgroundColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(40, 159, 64, 0.8)',
    'rgba(210, 199, 199, 0.8)',
    'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(159, 159, 159, 1)',
    'rgba(83, 102, 255, 1)',
    'rgba(40, 159, 64, 1)',
    'rgba(210, 199, 199, 1)',
    'rgba(78, 52, 199, 1)',
];

// url for the Thrones API
const getApi = 'https://thronesapi.com/api/v2/Characters';

// Fetch data from API
const fetchData = async (url) => {
    let promise = new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((err) => reject(err));
    });
    try {
        let data = await promise;
        return data;
    } catch (err) {
        console.log(err);
    }
};

async function renderChart() {
    try {
        const donutChart = document.querySelector('.donut-chart');
        const houseName = await getHouseMembers();

        new Chart(donutChart, {
            type: 'doughnut',
            data: {
                labels: Object.keys(houseName),
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: Object.values(houseName),
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 2,
                    },
                ],
            },
        });
    } catch (error) {
        console.error('Unable to render chart');
    }
}

renderChart();

// fetchData(getApi);
async function getHouseMembers() {
    try {
        const characters = await fetchData(getApi);
        const houseMembers = {};

        // Count characters in each house
        characters.forEach((character) => {
            const houseName = character.family;
            let nameOfHouse;
            const threshold = 2; // Limit on how many letters could be misspelled, when comparing family names
            let isSimilar = false;

            // If no family name, place in Unknown family
            if (houseName === '') {
                nameOfHouse = 'Unknown';
            } else {
                // this RegExp is used to remove "House" from family names, we just want the Family name itself for comparison
                nameOfHouse = houseName
                    .replace(new RegExp('\\b' + 'House' + '\\b', 'gi'), '')
                    .trim();
            }

            // Loops through houseMembers object
            for (const existingHouseName in houseMembers) {
                // Compares spelling of name and returns a value, lower values = similar and/or same
                const distance = levenshteinDistance(
                    existingHouseName,
                    nameOfHouse,
                );
                // If value is less than threshold, add count to the existing family name in the object
                if (distance <= threshold) {
                    houseMembers[existingHouseName] += 1;
                    isSimilar = true;
                    break;
                }
            }
            // If family is not the same or similar, add new family name to the object
            if (!isSimilar) {
                houseMembers[nameOfHouse] = 1;
            }
        });
        return houseMembers;
    } catch (err) {
        console.log(err);
    }
}

getHouseMembers();

// Check for variations in spelling
// This algorithm to compare strings was recommended by ChatGPT
function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str1.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str2.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost,
            );
        }
    }

    return matrix[str1.length][str2.length];
}
