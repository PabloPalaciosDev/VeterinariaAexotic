let mascotas = [];

function ObtenerServicios(){
    fetch("http://localhost:8080/mascotas/all").
    then(resultado =>{
        resulttado.json().then(json =>{
            mascotas = json;
            console.log(mascotas);
        })
    })
}