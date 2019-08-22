//console.log('Client side javaScript')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

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
                //console.log(data.error)
                $('#data').html('<span class="text-danger">' + data.error + '</span>')
            }else{
                //console.log(data)
                $('#data').html(data.forecast)
                $('#location').html(data.location)
            }

        })
    })
})