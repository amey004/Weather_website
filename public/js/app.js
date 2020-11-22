console.log('Script loaded successfully')

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne=document.querySelector('#first')
const messageTwo=document.querySelector('#second')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    //preventDefault is used to stop reloading of page every time we click submit
    
    const location=search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?address="+location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
            messageOne.textContent=data.error;
        } else {
          messageOne.textContent=data.address;
          messageTwo.textContent=data.weather
        }
      });
    });
})