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
            direccion: null,
            email: campos[3].value,
            pass: campos[4].value,
            foto: null,
            about: null
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