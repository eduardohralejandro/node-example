


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log('testing');

    const location = searchElement.value;
    console.log(location)

fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    
response.json().then((data) => {
    if (data.error) {
        console.log(data.error)
    }
    else {
        console.log(data);
        messageOne.textContent = `${data.address}: ${data.forecast.temperature}`
    }
        
    })
})
})