class ServicioFetch{
    urlApi = 'http://localhost:3000/profiles';
    async crearUrlDePerfiles (urlCandidatos){
        return fetch(this.urlApi,{
            method: 'POST',
            body: JSON.stringify({urlCandidatos}),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    }
}

export default new ServicioFetch();
