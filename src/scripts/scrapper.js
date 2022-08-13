import axios from "axios";
import {selectores, urls as configUrls} from "../config/scrapperSelectors";
import { $, $$} from "../utils/selectors";
import { obtenerCookie } from '../utils/cookie';
import {waitForSelector, esperarParaScrollear} from '../utils/waitFor'


async function obtenerInfoDeContacto(){
    try {
        const { baseUrl,urlInfoContacto,api } = configUrls
        const token = obtenerCookie('JSESSION',document.cookie);
        const [nombreInfoContacto] = $(selectores.contactInfo).href.match(/in\/.+\/o/g) ?? [];
        const infoContactoURL = baseUrl + api +urlInfoContacto(nombreInfoContacto);

        const {data: {data } } =await axios.get(infoContactoURL,{
            headers:{
                accept: 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token': token,
            }
        });
        return data; 
    } catch (error) {
        console.log('error en scrapper.js, linea 20: ', error);
        throw new Error('error al obtener informacion del contacto');
    }
}

function obtenerInfoEspecifica(selector){
    try {
        const Elementos = $$(selector);
        return Elementos.map((itemLista)=>{
            if(!$('.pvs-entity__path-node', itemLista)){
                const [
                    titulo,
                    empresa,
                    dateStringInfo
                ] = $$('span[aria-hidden]',itemLista).map(element => element.textContent);
                const [parsedRawDate] =dateStringInfo.match(/.+.|\d{4} - \d{4}/) ?? [];
                const [
                    fechaInicio,
                    fechaFin
                ] = (parsedRawDate?.replace(/\s|./g,'').split('-') ?? []).map(rawDateElement=> parsedRawDate(rawDateElement));
                return {titulo,empresa,fechaInicio, fechaFin};
            }
        });
    } catch (error) {
        console.log('error en scrapper.js linea 46: ',error);

    }
}
async function obtenerDatavisible(){
    await waitForSelector('h1');
    await esperarParaScrollear();
    const nombre = $(selectores.name).textContent;
    const experiencias = obtenerInfoEspecifica(selectores.experienceElements);
    const educacion = obtenerInfoEspecifica(selectores.educationElements);
    return{
        nombre,
        experiencias,
        educacion
    };
}

async function scrap (){
    try {
        const [infoContacto,dataVisible] = await Promise.all([
            obtenerInfoDeContacto(),
            obtenerDatavisible()
        ]);
        const perfil = {
            ...dataVisible,
            infoContacto,
        };
        const puerto = chrome.runtime.connect({name:'secureChannelScrapProfile'});
        puerto.postMessage({perfil});
    } catch (error) {
        console.log('error en scrapper.js linea 7 ' , error)
    }
}
  
scrap()
