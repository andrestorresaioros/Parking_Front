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
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("enviando");
    let form_data = new FormData(form);
    let data_Client = {
        name: 'USER',
        phone: '---',
        identification: '---'
    };
    let data_Contract = {
        id_Admin: 1,
        type: 'Minuto',
    };

    await fetch("http://localhost:4200/Clients/Contract/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Contract)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response;
        });

    let new_User = await fetch("http://localhost:4200/Clients/Manage/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Client)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response;
        });

    let data_Vehicle = {
        id_Parking: 1,
        color: '---',
        plate: form_data.get('plate'),
        brand: '---',
        model: '---',
        type: form_data.get('selectVechiclesType')
    };

    let new_Vehicle = await fetch("http://localhost:4200/Vehicles/View-Vehicles/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Vehicle)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response;
        });

    let data_Receipt = {
        id_Client: new_User.id,
        id_Vehicle: new_Vehicle.id,
        date_entry: new Date()
    };
    console.log(data_Receipt);
    fetch("http://localhost:4200/Clients/Receipt/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Receipt)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response);
        });
});
