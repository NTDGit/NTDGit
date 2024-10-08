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


setTimeout(() => document.querySelector('.sort-by-options__option-group').insertAdjacentHTML('beforeend', `<button onclick="flash_sale()" aria-label="" aria-pressed="true" class="sort-by-options__option sort-by-options__option--selected"><span aria-hidden="true">FALSH SALE</span></button>`), 5000);

function flash_sale() {
    const shopId = new URL(document.querySelector('.contents').href).pathname.match(/i\.(\d+)\.(\d+)/)[1];

    request({
        url: `https://shopee.vn/api/v4/shop/get_shop_flash_sale_items?shopid=${shopId}`
    }, (s) => {
        console.log(s);
        const result = document.querySelector('.shop-search-result-view');
        result.innerHTML = '';
        let stringdata = '';
        s.data.flash_sales.forEach(element => {
            const date = new Date(timestamp * 1000);
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };
            const formattedDate = date.toLocaleString('vi-VN',
                options);

            stringdata += `<br>-----Bắt đầu lúc ${formattedDate}-----<br>`;
            element.items.forEach(item => {
                stringdata += `https://shopee.vn/product/${item.shop_id}/${item.item_id}<br>`;
            })
        });

        result.innerHTML = stringdata;
    }, (e) => {})


}
