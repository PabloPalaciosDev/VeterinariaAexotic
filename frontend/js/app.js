//FUNCIONES PARA CARGAR LA LOGICA DE CADA VISTA
const loadHome = async () => {
    console.log('Home funcionando');
}

const loadDescrip = () => {
    console.log('Descripción funcionando')
}

const loadServicios = () => {
    console.log('Servicios funcionando');
}


const loadContactanos = () => {
    console.log('Contactos funcionando');
}

const loadReportes = async () => {
    console.log('Reportes fucionando');
    let baseUrl = "http://localhost:8080/";
    let reportes = [];
    let cont = 1;

    document.getElementById('change-form').addEventListener('submit', e => {
        e.preventDefault();
    })

    function MapearReportes(reporte, cont){
        const card = document.createElement('div');
        card.innerHTML = `
        <h2 class="changelog-h2">0.00.${cont}<span class="changelog-fecha"> (${reporte.fecha})<button class="changelog-btn-eliminar" id="${'delete-'+reporte.reporte_id}")">Eliminar</button><button class="changelog-btn-actualizar" id="${'update-'+reporte.reporte_id}")">Actualizar</button></span></h2>
        <ul class="changelog-ul">
            <li class="changelog-li">
                <span class="changelog-tipo changelog-${reporte.cambio}">${reporte.titulo}</span>
                <span class="changelog-mensaje">${reporte.contenido}</span>
            </li>
        </ul>`;
        return card;
    }

    function ImprimirReportes(){
        let contenedor = document.getElementById("changelog-reportes");
        contenedor.innerHTML = "";

        reportes.forEach(reporte =>{
            contenedor.appendChild( MapearReportes(reporte, cont));
            console.log('delete-'+reporte.reporte_id, 'update-'+reporte.reporte_id);
            document.getElementById('delete-'+reporte.reporte_id).addEventListener('click', async e => {
                await fetch(baseUrl + 'reportes/' + reporte.reporte_id,{method:"Delete"}).then(resultado=>{
                    console.log(resultado);
                    cont = 1;
                    cargarRutaRequest('/reportes');
                });        
            })
            document.getElementById('update-'+reporte.reporte_id).addEventListener('click', async e => {
                let reporteUp = reportes.filter(r=>{return r.reporte_id == reporte.reporte_id})[0];

                document.getElementById('fecha').value = reporteUp.fecha;
                document.getElementById('titulo').value = reporteUp.titulo;
                document.getElementById('cambio').value = reporteUp.cambio;
                document.getElementById('contenido').value = reporteUp.contenido;
                document.getElementById('reporte_id').value = reporteUp.reporte_id;        
            })
            cont += 1;
        })
    }

    reportes = await fetch(baseUrl + 'reportes/all')
        .then(d => d.json())
        .then(d => d);

    ImprimirReportes();


    document.getElementById('boton-enviar').addEventListener('click', async e => {
        let data ={
            fecha: document.getElementById("fecha").value,
            titulo: document.getElementById("titulo").value,
            cambio: document.getElementById("cambio").value,
            contenido: document.getElementById("contenido").value
        };

        await fetch(baseUrl + "reportes",{
            method:"POST",
            body: JSON.stringify(data),
            headers:{
                "Content-type":'application/json; charset=UTF-8'
            }
        }).then(resultado=>{
            cargarRutaRequest('/reportes')
        });
    });

    document.getElementById('boton-actualizar').addEventListener('click', async e => {
        let data ={
            fecha: document.getElementById("fecha").value,
            titulo: document.getElementById("titulo").value,
            cambio: document.getElementById("cambio").value,
            contenido: document.getElementById("contenido").value,
            reporte_id: document.getElementById('reporte_id').value
        };

        await fetch(baseUrl + "reportes",{
            method:"PUT",
            body: JSON.stringify(data),
            headers:{
                "Content-type":'application/json; charset=UTF-8'
            }
        }).then(resultado=>{
            cargarRutaRequest('/reportes')
        });
    });

}

const loadBusqueda = () => {

    console.log('Busqueda funcionando')

    async function ObtenerBusqueda(busqueda) {
        await fetch(host +"/repositorio/"+ busqueda).
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

}

const loadLogin = () => {
    
    const form = document.getElementById('login-form');
    const campos = [
        document.getElementById('login-form-email'), 
        document.getElementById('login-form-pass')
    ];
    const submit = document.getElementById('login-form-submit');

    validarCamposFormularios(campos, submit);

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const user = await fetch(`${host}/cliente/session/${campos[0].value}/${campos[1].value}`)
            .then(data => data.json()).then(data => data);
        if(user.cedula) {
            window.localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/';
        }
        else {
            addTemporalError(form, 'Credenciales incorrectas, intente nuevamente');
        }
    })

}


const loadRegister = async () => {

    const form = document.getElementById('form-registro');

    const campos = [
        document.getElementById('cedula'), // [0]
        document.getElementById('nombre'), // [1]
        document.getElementById('apellido'), // [2]
        document.getElementById('correo-usuario'), // [3]
        document.getElementById('pass') // [4]
    ];
    const subm = document.getElementById('submit');

    validarCamposFormularios(campos, subm)

    form?.addEventListener('submit', async e => {
        e.preventDefault();
        const newUser = {
            cedula: campos[0].value,
            nombre: campos[1].value,
            apellido: campos[2].value,
            email: campos[3].value,
            pass: campos[4].value,
        }

        const hayUsuarios = await getUsersByIds(newUser.email, newUser.cedula);

        if(hayUsuarios.length === 0) {
            await fetch(`${host}/cliente/register`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(newUser)
            }).then(d => d.text()).then(d => console.log(d));
            addTemporalSucces(form, '¡Usuario registrado correctamente!')
        } else  {
            addTemporalError(form, 'Esa cedula o correo ya estan registradas');
        }
    })

}


const loadError = () => {
    console.log('Error funcionando');
}

const loadUserPanel = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    crearCardUser('panel-header');
    document.getElementById('panel-header').innerHTML += `
    <div class="fs-header-child fs-sobre-ti">
        <h2>Sobre ti</h2>
        <p>${user.about || 'Aún no haz colocado nada aquí'}</p>
    </div>
    `;
    const mascotas = await fetch(`${host}/mascotas/cliente/${user.cedula}`).then(d => d.json()).then(d => d);

    crearCardsMascotas(mascotas, 'cards-mascotas');


    document.getElementById('cerrarSession').addEventListener('click', e => {
        localStorage.removeItem('user')
        window.location.href = '/';
    })
}  

const loadUserPanelEdit = () => {
    const user = JSON.parse(localStorage.getItem('user'));  
    const campos = [
        document.getElementById('nombre'),
        document.getElementById('apellido'),
    ]

    campos[0].value = user.nombre;
    campos[1].value = user.apellido;

    validarCamposFormularios(campos, document.getElementById('submit'));

    const form = document.getElementById('form-edit-user');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const userEdit = {
            nombre: campos[0].value,
            apellido: campos[1].value,
            cedula: user.cedula
        }

        await fetch(`${host}/cliente/update/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(userEdit)
        }).then(d => d.text()).then(d => {
            user.nombre = userEdit.nombre;
            user.apellido = userEdit.apellido;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(user));
            cargarRutaRequest('/user-panel')
        }).catch(e => {
            console.log('No se pudo')
            addTemporalError(form, 'No se pudo realizar la modificación');
        });

    })
}