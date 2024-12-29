function fillSelectContract() {
    let select = document.getElementById('selectContractType');

    let contractTypes = ['Día', 'Semana', 'Mes', 'Año'];

    contractTypes.forEach(type => {
        let optionElement = document.createElement('option');
        optionElement.value = type;
        optionElement.text = type;
        select.appendChild(optionElement);
    });
}
fillSelectContract();

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
let form = document.getElementById('form_Contract');
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log("enviando")
    let form_data = new FormData(form)
    let data_Vehicle = {
        id_Parking: 1,
        color: form_data.get('color'),
        plate: form_data.get('plate'),
        brand: form_data.get('brand'),
        model: form_data.get('model'),
        type: form_data.get('selectVechiclesType')
    }
    let data_Client = {
        name: form_data.get('name'),
        phone: form_data.get('phone'),
        identification: form_data.get('identification')
    }
    let data_Contract = {
        id_Admin: 1,
        type: form_data.get('selectContractType'),
    }
    let new_User = await fetch("http://localhost:4200/Clients/Manage/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Client)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            //alert("El parqueadero se a creado con exito en la zona: "+data.brand)
            return response
        })
    await fetch("http://localhost:4200/Vehicles/View-Vehicles/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Vehicle)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            return response
            //alert("El parqueadero se a creado con exito en la zona: "+data.brand)
        })
    let new_Contract = await fetch("http://localhost:4200/Clients/Contract/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Contract)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            return response
            //alert("El parqueadero se a creado con exito en la zona: "+data.brand)
        })
    let data_Contract_Client = {
        id_Client: new_User.id,
        id_Contract: new_Contract.id
    }
    console.log(data_Contract_Client);
    
    fetch("http://localhost:4200/Clients/Contract-Client/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Contract_Client)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            
            //alert("El parqueadero se a creado con exito en la zona: "+data.brand)
        })
    let data_Receipt = {    
        id_Client: new_User.id,
        type_Contract: new_Contract.type,
        id_Vehicle: new_Vehicle.id,
        date_entry: new Date().toISOString(),
        date_exit: new Date().toISOString()
    };
    console.log(data_Receipt);
    await fetch("http://localhost:4200/Clients/Receipt/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_Receipt)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);   
        });
        
});