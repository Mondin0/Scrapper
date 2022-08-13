import axios from "axios";
import { urls as configUrls } from "../config/scrapperSelectors";
import { ListaBusquedaEnumerados , NumeroCartaPerfil} from '../constantes'
import { obtenerCookie } from "../utils/cookie";

const { baseUrl , api } = configUrls;
const baseUrlAxios = baseUrl + api;
class AxiosService {
    instanciaAxios = axios;
    token = obtenerCookie ('JSESSIONID', document.cookie);
    async obtenerJsonLinkedin(url){
        try {
            const {data } = await this.instanciaAxios.get(url,{
                headers:{
                    accept: 'application/vnd.linkedin.normalized+json+2.1',
                    'csrf-token':this.token,
                    'x-li-lang':'es_ES',
                    'x-restli-protocol-version':'2.0.0'
                }
            });
            return data;
        } catch (error) {
            console.log('error en servicio de axios: ' , error);
            throw error;
        }
    }
    async obtener10PrimerosResultados(
        palabrasClave = 'fullstack',
        paginacionInicio = 0, 
        lista = ListaBusquedaEnumerados.PEOPLE, 
        filtroIncluido = false, 
        searchId = '00af5496-3e03-4913-9849-c47708dff823'
    ){
        const url = `${baseUrlAxios}search/dash/clusters?`+'decorationId=' + 
        'com.linkedin.voyager.dash.deco.search.SearchClusterCollection-157'+
        '&origin=SWITCH_SEARCH_VERTICAL'+
        '&q=all&query=(' + 
        `keywords:${palabrasClave},` +
        'flagshipSearchIntent:SEARCH_SRP,'+
        'queryParameters:(position:List(0),'+
        `resultType:List(${lista}),`+
        `searchId:List(${searchId})),`+
        `includeFiltersInResponse:${filtroIncluido})&start=${paginacionInicio}`;

        return this.obtenerJsonLinkedin(url)
    }
    async obtenerInfoPerfil(urnPerfil, card= NumeroCartaPerfil.second){
        const url = `${baseUrlAxios}graphql?` + 
        'includeWebMetadata=true&' + 
        'variables=('+
        `profileUrn:${urnPerfil},`+
        'locale:(language:es,country:ES))&&'+
        `queryId=voyagerIdentityDashProfileCards.${card}`;
        return this.obtenerJsonLinkedin(url);
    } 

}
export default new AxiosService();


