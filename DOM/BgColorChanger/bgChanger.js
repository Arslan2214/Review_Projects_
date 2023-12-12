const boxes = document.querySelectorAll('.box');

const setColor = () => {
    boxes.forEach(box => {
        box.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    })
}


boxes.forEach(box => {
    box.addEventListener('click', ()=>{
        document.body.style.backgroundColor = box.style.backgroundColor;
    })
})

setColor();


