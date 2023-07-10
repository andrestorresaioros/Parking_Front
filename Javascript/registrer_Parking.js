let form = document.getElementById('form_Parking');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("enviando")
    let form_data = new FormData(form)
    let data= {
        id_Admin: 1,
        zone: form_data.get('Zone'),
        quantity_space_moto: form_data.get('motos'),
        quantity_space_car: form_data.get('heavy'),
        quantity_space_heavy: form_data.get('autos'),
    }
    fetch("http://localhost:4200/Parkings/View-Parkings/",{
        method: 'POST',
        type:'json',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response)=>response.json())
    .then((response)=> console.log(response))
});