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
    window.document.title = title;

    //Agregar el subrayado al link al que se accedio
    document.getElementById('header-menu').children[currentLink]?.classList.add('current-link');

    //Validar si agregar (o no) la tarjeta del usuario con la session actual y eliminar login/register
    if(await isUserSessionActive()) {
        document.getElementById('link-login').remove();
        document.getElementById('link-register').remove();    
        crearCardUser('header-menu');
    }
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
        preCondition: async () => {
            const r = await isUserSessionActive()
            return !r
        } 
    },
    '/register': {
        title: 'Register',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/registro.html', this.title, 5);
        },
        loadLogic: loadRegister,
        preCondition: async () => {
            const r = await isUserSessionActive()
            return !r
        } 
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
    '/reportes': {
        title: 'Reportes',
        imprimirPlantilla: async function () {
            await imprimirPlantillaGeneralFunction('/frontend/html/changelog.html', this.title);
        },
        loadLogic: loadReportes,
        preCondition: () => true
    },
    '/user-panel': { 
        title: 'Panel de usuario',
        imprimirPlantilla: async function () {
            await imprimirPlantillaSessionFunction('/frontend/html/user-profile.html', this.title);
        },
        loadLogic: loadUserPanel,
        preCondition: async () => await isUserSessionActive()
    },
    '/user-panel/edit-user': { // '/user-panel/add-pet'
        title: 'Edición de datos de usuario',
        imprimirPlantilla: async function () {
            await imprimirPlantillaSessionFunction('/frontend/html/user-edit.html', this.title);
        },
        loadLogic: loadUserPanelEdit,
        preCondition: async () => await isUserSessionActive()
    },
    '/user-panel/add-pet': { 
        title: 'Agregar mascota',
        imprimirPlantilla: async function () {
            await imprimirPlantillaSessionFunction('/frontend/html/add-pet.html', this.title);
        },
        loadLogic: loadAddPet,
        preCondition: async () => await isUserSessionActive()
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
    if(await rutaPlantilla.preCondition()) {
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