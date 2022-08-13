import { selectoresDeBusqueda } from "../config/scrapperSelectors";
import AxiosService from "../servicios/servicioAxios";
import {$,$$} from '../utils/selectors';
import { waitForSelector, esperarParaScrollear, } from '../utils/waitFor'

async function init (){
    await waitForSelector(selectoresDeBusqueda.paginateResultsContainer);
    await esperarParaScrollear(100,100);
    const URLsCandidatos = $$(selectoresDeBusqueda.paginateResultsContainer).map(element => $('.app-aware-link',element).href);
    const puerto = chrome.runtime.connect({name:'secureChannelScrap'});
    puerto.postMessage({URLsCandidatos});
}

async function initV2(
    palabrasClave = 'fullstack',
    paginacionInicio = 0
){
    let paginacion = paginacionInicio;
    let URLsCandidatos = [];
    do {
        const { incluido }= await AxiosService.obtener10PrimerosResultados(palabrasClave,paginacion);
        const proximosCandidatos= incluido?.filter(elementoIncluido => elementoIncluido?.trackinUrn).map(filtradoIncluido=>{
            const raw = filtradoIncluido?.navigationContext?.url;
            const [variablePerfil] = raw.match(/urn.+/) ?? [];
            return {
                raw,
                variablePerfil : variablePerfil.replace('miniP','p').replace('Afs','Afsd')
            };
        }) ?? [];
        URLsCandidatos = [...URLsCandidatos,...proximosCandidatos];
        paginacion+=10;
        //el objetivo es obtener el maximo de paginacion de la res de la query
    } while (paginacion<50);
    const puerto = chrome.runtime.connect({name: 'secureChannelScrapV2'});
    puerto.postMessage({URLsCandidatos});
    return URLsCandidatos;
}

initV2();