//VARIABLES Y FUNCIONES GLOBALES
const host = "http://localhost:8080";

const error = document.createElement('div');
error.classList.add('error')

const succes = document.createElement('div');
succes.classList.add('succes')

const addTemporalError = (element, text) => {
    error.textContent = text;
    element.appendChild(error);
    setTimeout(()=>{
        error.remove();
    }, 2000)
}

const addTemporalSucces = (element, text) => {
    succes.textContent = text;
    element.appendChild(succes);
    setTimeout(()=>{
        succes.remove();
    }, 2000)
} 

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


const loadRegister = () => {

    const form = document.getElementById('form-registro');

    const campos = [
        document.getElementById('cedula'),
        document.getElementById('nombre'),
        document.getElementById('apellido'),
        document.getElementById('correo-usuario'),
        document.getElementById('pass')
    ];
    const subm = document.getElementById('submit');

    validarCamposFormularios(campos, subm)

    form?.addEventListener('submit', async e => {
        e.preventDefault();
        const newUser = {
            cedula: campos[0].value,
            nombre: campos[1].value,
            apellido: campos[2].value,
            direccion: 'lelelel',
            email: campos[3].value,
            pass: campos[4].value
        }
        const userExist = await fetch(`${host}/clientes/${campos[3].value}/${campos[0].value}`)
            .then(d => d.json()).then(d => d);

        if(userExist.length === 0) {
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

const loadUserPanel = () => {
    
}