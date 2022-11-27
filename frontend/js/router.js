/**
 * @author Flavio Sánchez - Alik Dev
 * IMPORTANTE: Toda la lógica de la aplicación debe cargarse en @see cargarLogicaApp
 */


//Función para parametrizar la carga de las plantillas HTML
const imprimirPlantillaGeneralFunction = async (path, title, currentLink = undefined) => {
    let plantilla = await fetch('/frontend/html/header.html').then(data => data.text());
    plantilla += await fetch(path).then(data => data.text());
    plantilla += await fetch('/frontend/html/footer.html').then(data => data.text());
    document.getElementById('root').innerHTML = plantilla;
    window.document.title = title
    document.getElementById('header-menu').children[currentLink]?.classList.add('current-link');
}

//Objeto mapa con las diferentes rutas
const rutasPlantillas = {
    '/': {
        title: 'Home',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/index.html', this.title, 0);
        },
        loadLogic: loadHome,
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
    },
    '/contactanos': {
        title: 'Contactanos',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/Contactos.html', this.title, 3);
        },
        loadLogic: loadContactanos,
    },
    '/login': {
        title: 'Login',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/login.html', this.title, 4);
        },
        loadLogic: loadLogin,
    },
    '/register': {
        title: 'Register',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/registro.html', this.title, 5);
        },
        loadLogic: loadRegister,
    },
    '/busqueda': {
        title: 'Busqueda',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/busqueda.html', this.title);
        },
        loadLogic: loadBusqueda,
    },
    '/descripcion': {
        title: 'Descripción',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/descripcion.html', this.title);
        },
        loadLogic: loadDescrip
    },
    error: {
        title: 'Error',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/404.html', this.title);
        },
        loadLogic: loadError,
    }
}

//Esta función establece una ruta y carga su plantilla en el navegador
const cargarRutaRequest = async (ruta) => {
    const rutaPlantilla = rutasPlantillas[ruta] || rutasPlantillas.error;
    window.history.pushState({}, 'done', ruta);
    await rutaPlantilla.imprimirPlantilla();
    rutaPlantilla.loadLogic();
};

//Esta función inicia el router, se puede decir que es como el MAIN de nuestra app
const rutaRequest = () => {
    let path = window.location.pathname;
    if(path !== '/')
        path = '/'
    cargarRutaRequest(path)
};

rutaRequest();