// client side js

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

document.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    $('#data').html('<span class="text-primary">Loading...</span>')
    $('#location').html('')
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                $('#data').html('<span class="text-danger">' + data.error + '</span>')
            }else{
                $('#data').html(data.forecast)
                $('#location').html(data.location)
            }

        })
    })
})