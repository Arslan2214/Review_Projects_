/*
TODO: Show Images
    TODO: Search Images
    TODO: Filter on Options: All, Mountains, Sea, Forest, Beach
    TODO: Infinite Scroll
*/
const Images = []
let pageNo = 1;
const perPage = 15;
const getEle = (q) => document.querySelector(q)

const getData = async (query = 'ocean$animals') => {
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

const showImages = async () => {
    try {
        const imgData = await getData();
        Images.push(...imgData);
        console.log(Images[0])
        // return ;
        const container = getEle('#gallery');
        Images.map((image, index) => {
            image.medium && container.insertAdjacentHTML('beforeend', `<img width=${image.medium} src="${image.src.original}" alt="${image.alt}">`);
        });
    } catch (error) {
        console.error(error);
    }
};

showImages();

getEle('#searchBtn').addEventListener('click', () => {
    getData();
})