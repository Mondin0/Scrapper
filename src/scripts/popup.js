import { urls as configUrls } from '../config/scrapperSelectors'
import { $ } from '../utils/selectors'

$('#search-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const { baseUrl} = configUrls;
    const palabraClave = $('#to-search',e.target).ariaValueMax;
    const url = baseUrl+'search/results/people/?keywords='+palabraClave;

    const { id } = await chrome.tabs.create({url})

    const options = {
        files : ['scripts/scrappeoCandidatos.js'],
        target : {tabId: id}
    };
    chrome.scripting.executeScript(options);
});