let form = document.getElementById('form_Bill');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("enviando")
    let form_data = new FormData(form)
    let data = {
        id_Admin: 1,
        id_Parking: 1,
        values_Zone: form_data.get('zone'),
        values_Motos: form_data.get('motos'),
        values_Autos: form_data.get('autos'),
        values_Heavys: form_data.get('heavys'),
        values_Day: form_data.get('day'),
        values_Week: form_data.get('week'),
        values_Month: form_data.get('month'),
        values_Year: form_data.get('year')
    }
    fetch("http://localhost:4200/bills/View-Bills/", {
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((response) => response.json())
        .then((response) => console.log(response))
});