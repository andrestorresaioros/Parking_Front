let form = document.getElementById('form_Login');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("enviando")
    let form_data = new FormData(form)
    let data= {
        username: form_data.get('user'),
        //email: "",
        password: form_data.get('password')
    }
    console.log(data)
  /*   fetch("http://localhost:4200/api/auth/login/",{
        method: 'POST',
        type:'json',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response)=>response.json())
    .then((response)=> {
        console.log(response)
      //  alert("El parqueadero se a creado con exito en la zona: "+data.zone)
    })
    */
});