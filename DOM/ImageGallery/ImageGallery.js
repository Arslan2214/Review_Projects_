
const Images = []
let pageNo = 1;
let currentQuery = 'ocean$animals';
const perPage = 15;
const getEle = (q) => document.querySelector(q)

const getData = async (query = currentQuery) => {
    const url = `https://pexelsdimasv1.p.rapidapi.com/v1/search?query=${query}=en-US&per_page=${perPage}&page=${pageNo}`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'gZp4w43QesNXVcz23f7XbplexX8JadEqle8FtY7aRzyCpOWS1fewPDiT',
            'X-RapidAPI-Key': 'cc36fd93acmsh9e7cee49d9bb2ccp1928e2jsneca25476c62b',
            'X-RapidAPI-Host': 'PexelsdimasV1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return JSON.parse(result).photos;
    } catch (error) {
        console.error(error);
    }
};

const addImages = async (arr) => {
    try {
        const imgData = await getData();
        arr.push(...imgData);
        const container = getEle('#gallery');
        arr.map((image) => {
            container.insertAdjacentHTML('beforeend', `<div>
            <img width=${image.medium} src="${image.src.original}" alt="${image.alt}">
            </div>`);
        });
    } catch (error) {
        console.error(error);
    }
};

addImages(Images);

getEle('#searchBtn').addEventListener('click', async () => {
    event.preventDefault();

    let input = getEle('#inputSearch').value;
    input = input.replace(' ', '%20');
    getEle('#gallery').value = '';
    const searchedData = await getData(input)
    showSearchedImages(searchedData)
    input.value = '';
})

const showSearchedImages = (arr) => {
    const container = getEle('#gallery');
    container.innerHTML = '';

    arr.map((image) => {
        container.insertAdjacentHTML('beforeend', `
        <img width=${image.medium} src="${image.src.original}" alt="${image.alt}">
        `);
    });
}

getEle('#inputSearch').addEventListener('keyup', e => e.target.value === '' && showSearchedImages(Images))

document.querySelectorAll('input[type="radio"]').forEach(radioBtn => radioBtn.addEventListener('change', async (e) => {
    const radioSearched = await getData(e.target.value)
    // console.log(radioSearched)
    showSearchedImages(radioSearched)
}));
