let btnSubmit = document.querySelector('.btn');
let gif = document.querySelector('.gif');
start();

function start() {
    btnSubmit.addEventListener('click', () => {
        gif.classList.remove('disabled');
        console.log('hello');
        setTimeout(() => {
            console.log('helli');
            btnSubmit.innerHTML = 'finish';
        }, "3000")
    })
}
