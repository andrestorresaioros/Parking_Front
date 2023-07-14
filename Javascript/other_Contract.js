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
        type: form_data.get('type')
    }
    let data_Client = {
        name: form_data.get('name'),
        phone: form_data.get('phone'),
        identification: form_data.get('identification')
    }
    let data_Contract = {
        id_Admin: 1,
        type: form_data.get('type_Contract'),
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
        
});