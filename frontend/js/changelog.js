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
let baseUrl = "http://localhost:8080/";
let reportes = [];
let cont = 1;

function ObtenerReportes(){
    fetch(baseUrl + 'reportes/all').
    then(resultado =>{
        resultado.json().then(json =>{
            reportes = json;
            ImprimirReportes();
        })
    })
}

function ImprimirReportes(){
    let contenedor = document.getElementById("changelog-reportes");
    contenedor.innerHTML = "";

    reportes.forEach(reportes =>{
        contenedor.innerHTML += MapearReportes(reportes, cont);
        cont += 1;
    })
}

function MapearReportes(reportes, cont){
    return `
    <h2 class="changelog-h2">0.00.${cont}<span class="changelog-fecha"> (${reportes.fecha})<button class="changelog-btn-eliminar" onclick="EliminarReporte(${reportes.reporte_id})">Eliminar</button><button class="changelog-btn-actualizar" onclick="PopularDatosCampos(${reportes.reporte_id})">Actualizar</button></span></h2>
    <ul class="changelog-ul">
        <li class="changelog-li">
            <span class="changelog-tipo changelog-${reportes.cambio}">${reportes.titulo}</span>
            <span class="changelog-mensaje">${reportes.contenido}</span>
        </li>
    </ul>
    `;
}

function EliminarReporte(rid){
    fetch(baseUrl + 'reportes/' + rid,{method:"Delete"}).then(resultado=>{
        console.log(resultado);
        cont = 1;
        ObtenerReportes();
    });
}

function GuardarReporte(){
    let data ={
        fecha: document.getElementById("fecha").value,
        titulo: document.getElementById("titulo").value,
        cambio: document.getElementById("cambio").value,
        contenido: document.getElementById("contenido").value
    };

    fetch(baseUrl + "reportes",{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-type":'application/json; charset=UTF-8'
        }
    }).then(resultado=>{
        ObtenerReportes();
    });
}

function PopularDatosCampos(rid){
    let reporte = reportes.filter(r=>{return r.reporte_id == rid})[0];

    document.getElementById('fecha').value = reporte.fecha;
    document.getElementById('titulo').value = reporte.titulo;
    document.getElementById('cambio').value = reporte.cambio;
    document.getElementById('contenido').value = reporte.contenido;
    document.getElementById('reporte_id').value = reporte.reporte_id;
}

function ActualizarReporte(){
    let data ={
        fecha: document.getElementById("fecha").value,
        titulo: document.getElementById("titulo").value,
        cambio: document.getElementById("cambio").value,
        contenido: document.getElementById("contenido").value,
        reporte_id: document.getElementById('reporte_id').value
    };

    fetch(baseUrl + "reportes",{
        method:"PUT",
        body: JSON.stringify(data),
        headers:{
            "Content-type":'application/json; charset=UTF-8'
        }
    }).then(resultado=>{
        ObtenerReportes();
    });
}