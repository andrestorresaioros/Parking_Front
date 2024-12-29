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
let exit = document.getElementById('exit_Button');
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

    let new_Contract = await fetch("http://localhost:4200/Clients/Contract/", {
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
        type_Contract: new_Contract.type,
        id_Vehicle: new_Vehicle.id,
        date_entry: new Date().toISOString(),

    };
    console.log(data_Receipt);
    await fetch("http://localhost:4200/Clients/Receipt/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Receipt)
    }).then((response) => response.json())
        .then((response) => {
            if (!response.ok) {
                throw new Error("No hay mas cupos")
            } else {
                console.log(response)
            }
        }).catch((error) => {
            alert(error)
        });


});
exit.addEventListener("click", () => {
    let form_data = new FormData(form);
    let plate = form_data.get("plate")
    let data_Exit = {
        id_Vehicle: plate,
        date_exit: new Date().toISOString()
    };
    console.log(data_Exit);/*
        fetch("http://localhost:4200/Clients/Receipt/", {
            method: 'POST',
            type: 'json',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_Exit)
        }).then((response) => response.json())
            .then((response) => {
                console.log(response);
            });
            */
})
