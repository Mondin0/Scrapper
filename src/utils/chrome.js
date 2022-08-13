export async function inyectarScript (path, tabId) {
    const options = {
      target: { tabId },
      files: [path]
    };
  
    return chrome.scripting.executeScript(options);
}

export async function inyectarScrapCandidatos (tabId) {
    return inyectarScript('scripts/scrappeoCandidatos.js', tabId);
}

export async function borrarYCrearTab(oldId, url) {
    try {
        chrome.tabs.remove(oldId);
      
        const { id } = await chrome.tabs.create({ url });
        return id;
      
    } catch (error) {
      console.log('error en chrome.js: ', error);
      throw error;
    }
      
}