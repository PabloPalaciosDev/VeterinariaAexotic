/**
 * @author Flavio Sánchez - Alik Dev
 * IMPORTANTE: Toda la lógica de la aplicación debe cargarse en @see cargarLogicaApp
 */


const crearCardUser = () => {
    user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('link-login').remove();
    document.getElementById('link-register').remove();
    const cardU = document.createElement('div');
    cardU.classList.add('pointer', 'fs-user-card', 'fs-header-child');
    cardU.innerHTML = `<figure><img class="fs-img" src="/frontend/img/user.png" alt="user"></figure><div><h2>${user.nombre+' '+user.apellido}</h2><p>@${user.cedula}</p></div>`;
    cardU.addEventListener('click', e=> {
        cargarRutaRequest('/user-panel');
    });
    document.getElementById('header-menu').appendChild(cardU);
}

//Función para parametrizar la carga de las plantillas HTML
const imprimirPlantillaGeneralFunction = async (path, title, currentLink = undefined) => {
    let plantilla = await fetch('/frontend/html/header.html').then(data => data.text());
    plantilla += await fetch(path).then(data => data.text());
    plantilla += await fetch('/frontend/html/footer.html').then(data => data.text());
    document.getElementById('root').innerHTML = plantilla;
    window.document.title = title;
    document.getElementById('header-menu').children[currentLink]?.classList.add('current-link');
    if(localStorage.getItem('user')) 
        crearCardUser();
}

const imprimirPlantillaSessionFunction = async (path, title) => {
    let plantilla = await fetch(path).then(data => data.text());
    document.getElementById('root').innerHTML = plantilla;
    window.document.title = title;
}

//Objeto mapa con las diferentes rutas
const rutasPlantillas = {
    '/': {
        title: 'Home',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/index.html', this.title, 0);
        },
        loadLogic: loadHome,
        preCondition: () => true
    },
    /* '/about': {
        title: 'About',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/about.html', this.title, 1);
        }
    }, */
    '/servicios': {
        title: 'Servicios',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/servicios.html', this.title, 2);
        },
        loadLogic: loadServicios,
        preCondition: () => true
    },
    '/contactanos': {
        title: 'Contactanos',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/Contactos.html', this.title, 3);
        },
        loadLogic: loadContactanos,
        preCondition: () => true
    },
    '/login': {
        title: 'Login',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/login.html', this.title, 4);
        },
        loadLogic: loadLogin,
        preCondition: () => localStorage.getItem('user') === null
    },
    '/register': {
        title: 'Register',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/registro.html', this.title, 5);
        },
        loadLogic: loadRegister,
        preCondition: () => localStorage.getItem('user') === null
    },
    '/busqueda': {
        title: 'Busqueda',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/busqueda.html', this.title);
        },
        loadLogic: loadBusqueda,
        preCondition: () => true
    },
    '/descripcion': {
        title: 'Descripción',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/descripcion.html', this.title);
        },
        loadLogic: loadDescrip,
        preCondition: () => true
    },
    '/user-panel': {
        title: 'Panel de usuario',
        imprimirPlantilla: async function () {
            await imprimirPlantillaSessionFunction('/frontend/html/user-profile.html', this.title);
        },
        loadLogic: loadUserPanel,
        preCondition: () => localStorage.getItem('user') !== null
    },
    error: {
        title: 'Error',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/404.html', this.title);
        },
        loadLogic: loadError,
        preCondition: () => true
    }
}

//Esta función establece una ruta y carga su plantilla en el navegador
const cargarRutaRequest = async (ruta) => {
    const rutaPlantilla = rutasPlantillas[ruta] || rutasPlantillas.error;
    window.history.pushState({}, 'done', ruta);
    if(rutaPlantilla.preCondition()) {
        await rutaPlantilla.imprimirPlantilla();
        rutaPlantilla.loadLogic();
        return;
    }
    location.href = '/';
};

//Esta función inicia el router, se puede decir que es como el MAIN de nuestra app
const rutaRequest = () => {
    let path = window.location.pathname;
    if(path !== '/')
        path = '/'
    cargarRutaRequest(path)
};

rutaRequest();