let form = document.getElementById('form_Vehicle');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("enviando")
    let form_data = new FormData(form)
    let plate = form_data.get('plate')
    fetch("http://localhost:4200/Vehicles/View-Vehicles/"+plate)
        .then((response)=>response.json())
        .then((response)=> {
            console.log(response)
            alert("El carro con placa: "+response[0].plate+" Entro a las: "
            + response[0].Receipt_Vehicle[0].date_entry + " - y salio a las: "
            + response[0].Receipt_Vehicle[0].date_exit);
        })
});