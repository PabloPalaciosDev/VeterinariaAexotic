//VARIABLES Y FUNCIONES GLOBALES
const host = "http://localhost:8080";

let mascotaEnEdicion = 0;

const getUsersByIds = async (email, cedula) => await fetch(`${host}/clientes/${email}/${cedula}`).then(d => d.json()).then(d => d);

const isUserSessionActive = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const users = await getUsersByIds(user?.email, user?.cedula);
    console.log(users.length !== 0);
    return users.length !== 0;
}

const crearCardsMascotas = (mascotas = [], elementId) => {
    mascotas.forEach(mascota => {
        const article = document.createElement('article');
        article.classList.add('fs-pet-card');
        article.innerHTML = `
            <figure>
                <img src="${mascota.foto || '/frontend/img/user.png'}" alt="pet" class="fs-img">
            </figure>
            <div class="fs-pet-card-datos">
                <h3>${mascota.nombre}</h3>
                <p>Peso: ${mascota.peso}</p>
                <p>Tamaño: ${mascota.tamano}</p>
            </div>
            <div class="fs-pet-card-nacimiento">
                <p>Fecha de nacimiento:</p>
                <p>${mascota.date}</p>
                <p>Raza: ${mascota.raza}</p>
            </div>
            <div class="fs-pet-card-nacimiento">
                <p>Genero:</p>
                <div class="fs-gender-mark" href="#">
                    <img class="fs-img fs-img-70p" src="${mascota.genero === 'H' ? '/frontend/img/fem.png' : '/frontend/img/man.png'}" alt="gender">
                </div>
            </div>
            <div class="fs-float-button pointer" id="${mascota.id}">
                <img class="fs-img fs-img-70p" src="/frontend/img/edit.png" alt="edit-button">
            </div>`;
        document.getElementById(elementId).appendChild(article);
        document.getElementById(mascota.id).addEventListener('click', e => {
            mascotaEnEdicion = mascota.id;
            cargarRutaRequest('/user-panel/edit-pet');
        });
    });
}

const crearCardUser = (idOfElement) => {
    user = JSON.parse(localStorage.getItem('user'));
    const cardU = document.createElement('div');
    cardU.classList.add('pointer', 'fs-user-card', 'fs-header-child');
    cardU.innerHTML = `
        <figure>
            <img class="fs-img" src="/frontend/img/user.png" alt="user">
        </figure>
        <div>
            <h2>${user.nombre+' '+ user.apellido}</h2>
            <p>@${user.cedula}</p>
        </div>
        <div class="fs-float-button pointer" onclick="cargarRutaRequest('/user-panel/edit-user')">
            <img class="fs-img fs-img-70p" src="/frontend/img/edit.png" alt="edit-button">
        </div>`;
    cardU.addEventListener('click', e=> {
        cargarRutaRequest('/user-panel');
    });
    document.getElementById(idOfElement).appendChild(cardU);
}

const addTemporalError = (element, text) => {
    const error = document.createElement('div');
    error.classList.add('error')
    error.textContent = text;
    element.appendChild(error);
    setTimeout(()=>{
        error.remove();
    }, 2000)
}

const addTemporalSucces = (element, text) => {
    const succes = document.createElement('div');
    succes.classList.add('succes')
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