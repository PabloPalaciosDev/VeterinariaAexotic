//VARIABLES Y FUNCIONES GLOBALES
const host = "http://localhost:8080";


const validarCamposFormularios = (campos, submit) => {
    submit.disabled = true;
    campos.forEach(campo => {
        campo.addEventListener('input', e => {
            if(campos.every(campo => campo.value !== '')) {
                submit.disabled = false;
                submit.classList.remove('disabled');
                return;
            } 
            submit.disabled = true;
            submit.classList.add('disabled');
        });
    })
}

//FUNCIONES PARA CARGAR LA LOGICA DE CADA VISTA
const loadHome = () => {
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
    const error = document.createElement('div');
    error.textContent = 'Credenciales incorrectas, intente nuevamente';
    error.classList.add('error')

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
            form.appendChild(error);
            setTimeout(()=>{
                error.remove();
            }, 2000)
        }
    })

}


const loadRegister = () => {

    const form = document.getElementById('register-form');

    const campos = [
        document.getElementById('nombre'),
        document.getElementById('apellido'),
        document.getElementById('correo-usuario'),
        document.getElementById('pass'),
        document.getElementById('cedula')
    ];
    const subm = document.getElementById('submit');

    validarCamposFormularios(campos, subm)

    form?.addEventListener('submit', async e => {
        e.preventDefault();
    })

}


const loadError = () => {
    console.log('Error funcionando');
}

const loadUserPanel = () => {
    
}