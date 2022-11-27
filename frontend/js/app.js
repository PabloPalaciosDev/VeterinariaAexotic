const host = "http://localhost:8080";
//http://localhost:8080/cliente/session/janetleverling@utp.ac.pa/12345
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
    const email = document.getElementById('login-form-email'); 
    const pass = document.getElementById('login-form-pass');
    const submit = document.getElementById('login-form-submit');
    const error = document.createElement('div');
    error.textContent = 'Credenciales incorrectas, intente nuevamente';
    error.classList.add('error')
    submit.disabled = true;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const user = await fetch(`${host}/cliente/session/${email.value}/${pass.value}`)
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

    const validarSubmit = () => {
        const value1 = pass.value;
        const value2 = email.value;
        if(value1 !== '' && value2 !== '') {
            submit.disabled = false;
            submit.classList.remove('disabled');
        } else {
            submit.disabled = true;
            submit.classList.add('disabled');
        }
    }

    pass.addEventListener('input', e => {
        validarSubmit();
    })

    email.addEventListener('input', e => {
        validarSubmit();
    })
}


const loadRegister = () => {
    console.log('Register funcionando');
}


const loadError = () => {
    console.log('Error funcionando');
}

const loadUserPanel = () => {
    
}