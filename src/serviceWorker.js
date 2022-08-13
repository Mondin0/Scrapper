import { db } from './config/conexion.dexie';
import ServicioFetch from './servicios/servicioFetch'
import {inyectarScript, inyectarScrapCandidatos, borrarYCrearTab} from './utils/chrome'


chrome.action.onClicked.addListener((tab)=>{
    inyectarScrapCandidatos(tab.id);
});

function guardarUrlCandidatos(urlsCandidatos) {
    if(!urlsCandidatos.length) throw new Error('No hay informacion aun');
    //por si falla guardo en local
    ServicioFetch.crearUrlDePerfiles(urlsCandidatos).catch(async err => {
      console.log(err);
      db.urlsCandidato.add({
        urls : urlsCandidatos
      });
    });
}
chrome.runtime.onConnect.addListener((port)=> {
    const secureChannels = [
      'secureChannelScrap',
      'secureChannelScrapProfile',
      'secureChannelScrapV2'
    ];
    
    if(!secureChannels.includes(port.name))
      throw new Error('canal no seguro');
  
    port.onMessage.addListener(async (
      { urlsCandidatos, profile },
      { sender:{ tab: { id: tabId, url: tabUrl } } }
    ) => {
      switch (port.name) {
      case secureChannels[0]:{
        const urlParams = new URLSearchParams(
          tabUrl.match(/\?.+/)[0].replace('?','')
        );
  
        const page = urlParams.has('page') ? Number(urlParams.get('page'))+1 : 2;
        urlParams.set('page', page);
  
        if(page <= 3) {
  
          guardarUrlCandidatos(urlsCandidatos);
          const newTabId = await borrarYCrearTab(
            tabId, 
            tabUrl.replace(/\?.+/,'?'+urlParams.toString())
          );
  
          inyectarScrapCandidatos(newTabId);
        } else {
          const newTabId = await borrarYCrearTab(tabId, urlsCandidatos[0]);
          inyectarScript('scripts/scrapper.js', newTabId);
        }
        
        break;
      }          
      case secureChannels[1]:{
        db.profiles.add(profile);
        const [urlsRaw] = await db.urlsCandidato.toArray();
        // eslint-disable-next-line no-undef
        const newTabId = await borrarYCrearTab(tabId, urlsRaw.urls[2]);
  
        inyectarScript('scripts/scrapper.js', newTabId);
  
        break;
      }
      case(secureChannels[2]):
        guardarUrlCandidatos(urlsCandidatos);
        break;
      default:
        break;
      }
    });    
  });