let baseUrl = "http://localhost:8080";

function ObtenerBusqueda(busqueda){
    fetch(baseUrl +"/repositorio/"+ busqueda).
    then(resultado =>{
        resultado.json().then(json =>{
            //busqueda = json;
            //console.log(busqueda);
            ImprimirBusqueda(json);
        })
    })
}

const formulario_busqueda = document.getElementById("formulario-busqueda")

formulario_busqueda.addEventListener("submit" , function (evento){
    evento.preventDefault();
    const busqueda = document.getElementById("tamano_promedio");
    document.getElementById("busqueda-contenedor").innerHTML=""
    ObtenerBusqueda(busqueda.value)
})

function ImprimirBusqueda(peticion){
    let contenedor = document.getElementById("busqueda-contenedor");
    peticion.forEach(iterador =>{
        contenedor.innerHTML += MapearBusqueda(iterador);
    });
}

function MapearBusqueda(busqueda){
    return `<section class="busquedas-container">
    <img  width="150px" height="100px" src="${busqueda.foto}" alt="">
    
    <p>Nombre: ${busqueda.nombre_mascota_repo}</p>
    
    <p>Tamaño promedio: ${busqueda.tamano_promedio}</p>
    
    <p>Peso promedio: ${busqueda.peso_promedio}</p>
</section>`;

}