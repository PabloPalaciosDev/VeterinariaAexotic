let busqueda = [];

function ObtenerBusqueda(){
    fetch("http://localhost:8080/repositorio/all").
    then(resultado =>{
        resultado.json().then(json =>{
            busqueda = json;
            console.log(busqueda);
            ImprimirBusqueda();
        })
    })
}

function ImprimirBusqueda(){
    let contenedor = document.getElementById("busqueda-contenedor");
    busqueda.forEach(busqueda =>{
        contenedor.innerHTML += MapearBusqueda(busqueda);
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


