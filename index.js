const Bot = require('./Bot');
const config = require('./Bot/config/puppeteer');

const run = async () => {

    //// CONSEGUIR SEGUIDORES
    const bot = new Bot();

    const startTime = Date();

    await bot.initPuppeter().then(() => console.log("PUPPETEER INICIALIZADO"));

    await bot.visitInstagram().then(() => console.log("REALIZANDO BUSQUEDAS POR INSTAGRAM ..."));

    await bot.visitHashtagUrl().then(() => console.log("VISITANDO HASHTAGS ..."));

    //await bot.unFollowUsers();

    await bot.closeBrowser().then(() => console.log("BUSCADOR WEB CERRADO"));

    const endTime = Date();

    console.log(`TIEMPO INICIADO - ${startTime} / TIEMPO TERMINADO- ${endTime}`)


    //// RECOPILAR CONTACTOS
    //const bot = new Bot();

    //const startTime = Date();

    //await bot.initPuppeter().then(() => console.log("PUPPETEER INICIALIZADO"));

    //await bot.visitUserProfile().then(() => console.log("INGRESE AL PERFIL DEL USUARIO"));
};



run().catch(e=>console.log(e.message));
// corre el bot cada cierto intervalo tomado de nuestro config
setInterval(run, config.settings.run_every_x_hours * 3600000);