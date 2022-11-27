/**
 * @author Flavio Sánchez - Alik Dev
 * IMPORTANTE: Toda la lógica de la aplicación debe cargarse en @see cargarLogicaApp
 */


//AQUI SE VA A CARGAR TODA LA LÓGICA DE LA APLICACIÓN, DOM SCRIPTING, CONSULTAS FETCH, ETC.
function cargarLogicaApp () {
    
}

//Función para parametrizar la carga de las plantillas HTML
const imprimirPlantillaGeneralFunction = async (path, title, currentLink = undefined) => {
    let plantilla = await fetch('/frontend/html/header.html').then(data => data.text());
    plantilla += await fetch(path).then(data => data.text());
    plantilla += await fetch('/frontend/html/footer.html').then(data => data.text());
    document.getElementById('root').innerHTML = plantilla;
    window.document.title = title
    document.getElementById('header-menu').children[currentLink]?.classList.add('current-link');
    /* if(currentLink === 4)
        document.getElementById('link-login').remove();
    if(currentLink === 5)
        document.getElementById('link-register').remove(); */
}

//Objeto mapa con las diferentes rutas
const rutasPlantillas = {
    '/': {
        title: 'Home',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/index.html', this.title, 0);
        }
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
        }
    },
    '/contactanos': {
        title: 'Contactanos',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/Contactos.html', this.title, 3);
        }
    },
    '/login': {
        title: 'Login',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/login.html', this.title, 4);
        }
    },
    '/register': {
        title: 'Register',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/registro.html', this.title, 5);
        }
    },
    '/busqueda': {
        title: 'Busqueda',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/busqueda.html', this.title);
        }
    },
    error: {
        title: 'Error',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/404.html', this.title);
        }
    }
}

//Esta función establece una ruta y carga su plantilla en el navegador
const cargarRutaRequest = async (ruta) => {
    const rutaPlantilla = rutasPlantillas[ruta] || rutasPlantillas.error;
    window.history.pushState({}, 'done', ruta);
    await rutaPlantilla.imprimirPlantilla();
    cargarLogicaApp();
};

//Esta función inicia el router, se puede decir que es como el MAIN de nuestra app
const rutaRequest = () => {
    let path = window.location.pathname;
    if(path !== '/')
        path = '/'
    cargarRutaRequest(path)
};

rutaRequest();

