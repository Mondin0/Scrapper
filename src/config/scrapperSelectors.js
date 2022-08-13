export const selectores = {
    name: 'h1',
    experienceElements : '#experience ~ .pvs-list__outer-container > ul > li',
    contactInfo: '#top-card-text-details-contact-info',
    educationElements: '#education ~ .pvs-list__outer-container > ul > li'
}
export const selectoresDeBusqueda = {
    paginateResultsContainer:'.reusable-search__entity-result-list > li'
}
export const urls = {
    baseUrl: 'https://www.linkedin.com/',
    api: 'voyager/api/',
    urlInfoContacto : infoNombreContacto => 
        `identity/profiles${infoNombreContacto.slice(2,-2)}/profileContactInfo`
}