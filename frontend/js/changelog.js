let cont = 1;

function ObtenerReportes(){
    fetch("http://localhost:8080/reportes/all").
    then(resultado =>{
        resultado.json().then(json =>{
            reportes = json;
            ImprimirReportes();
        })
    })
}

function ImprimirReportes(){
    let contenedor = document.getElementById("changelog-reportes");
    reportes.forEach(reportes =>{
        contenedor.innerHTML += MapearReportes(reportes, cont);
        cont += 1;
    })
}

function MapearReportes(reportes, cont){
    return `
    <h2 class="changelog-h2">0.00.${cont}<span class="changelog-fecha"> (${reportes.fecha})</span></h2>
    <ul class="changelog-ul">
        <li class="changelog-li">
            <span class="changelog-tipo changelog-${reportes.cambio}">${reportes.titulo}</span>
            <span class="changelog-mensaje">${reportes.contenido}</span>
        </li>
    </ul>
    `;
}

/*<h2 class="changelog-h2">0.00.${cont}<span class="changelog-fecha"> (${busqueda.fecha})</span></h2>
    <ul class="changelog-ul">
        <li class="changelog-li">
            <span class="changelog-tipo changelog-arreglar">ARREGLADO</span>
            <span class="changelog-mensaje">Utilice este para mencionar cambios que han corregido funciones previamente disfuncionales.</span>
        </li>
        <li class="changelog-li">
            <span class="changelog-tipo changelog-cambiar">CAMBIO</span>
            <span class="changelog-mensaje">Utilice este para mencionar cambios generales.</span>
        </li>
        <li class="changelog-li">
            <span class="changelog-tipo changelog-eliminar">ELIMINADO</span>
            <span class="changelog-mensaje">Utilice este para mencionar elementos retirados.</span>
        </li>
        <li class="changelog-li">
            <span class="changelog-tipo changelog-agregar">AÑADIDO</span>
            <span class="changelog-mensaje">Utilice este para mencionar elementos agregados.</span>
        </li>
    </ul>*/