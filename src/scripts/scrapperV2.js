import { mockResponseProfiles } from'../../testeo/mockdata'
import servicioAxios from '../servicios/servicioAxios'

async function scrap(){
    const data = await servicioAxios.obtenerInfoPerfil(mockResponseProfiles[0].profileVar);
    console.log(data);
}
scrap();