function fillSelectVehicle() {
    let select = document.getElementById('selectVechiclesType');

    let vehiclesTypes = ['Automóvil', 'Motocicleta', 'Vehículos Pesados'];

    vehiclesTypes.forEach(type => {
        let optionElement = document.createElement('option');
        optionElement.value = type;
        optionElement.text = type;
        select.appendChild(optionElement);
    });
}
fillSelectVehicle();
let form = document.getElementById('form_Contract_Minute');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("enviando")
    let form_data = new FormData(form)
    let data_Vehicle = {
        id_Parking: 1,
        color: '---',
        plate: form_data.get('plate'),
        brand: '---',
        model: '---',
        type: form_data.get('selectVechiclesType')
    }
    let data_Client = {
        name: 'USER',
        phone: '---',
        identification: '---'
    }
    fetch("http://localhost:4200/Clients/Manage/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Client)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            //alert("El parqueadero se a creado con exito en la zona: "+data.brand)
        })
    fetch("http://localhost:4200/Vehicles/View-Vehicles/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Vehicle)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            //alert("El parqueadero se a creado con exito en la zona: "+data.brand)
        })
});