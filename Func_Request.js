function request(config, result, error) {
    const timeout = config.timeout || 5000;
    const formData = new FormData();
    if (config.file) {
        formData.append('file', config.file, config.fileName || config.file.name);
    }
    const fetchPromise = fetch(config.url, {
        method: config.method || 'GET',
        headers: config.headers || {},
        body: config.file ? formData : config.body || null,
    });
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);
    });
    Promise.race([fetchPromise, timeoutPromise])
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            result(data);
        })
        .catch(err => {
            error(err);
        });
}


setTimeout(() => document.querySelector('.sort-by-options__option-group').insertAdjacentHTML('beforeend',`<button aria-label="" aria-pressed="true" class="sort-by-options__option sort-by-options__option--selected"><span aria-hidden="true">FALSH SALE</span></button>`), 3000);

function flash_sale() {
    let shopString = document.querySelector('.shop-search-result-view__item') ? '.shop-search-result-view__item ' : '';
    let links = Array.from(document.querySelectorAll(`${shopString}a.contents`));
    const url = new URL(links[0].href);
    const match = url.pathname.match(/i\.(\d+)\.(\d+)/);
    const shopId = match[1]; 
}
