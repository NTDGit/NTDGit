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


// Tạo nút button
const button = document.createElement('button');

// Thêm thuộc tính cho button
button.setAttribute('aria-label', '');
button.setAttribute('aria-pressed', 'true');
button.className = 'sort-by-options__option sort-by-options__option--selected';
button.innerHTML = '<span aria-hidden="true">FLASH SALE</span>';

// Style để đặt button góc phải phía dưới cách 100px
button.style.position = 'fixed';
button.style.right = '10px';
button.style.bottom = '200px';
button.style.zIndex = '9999'; // Đảm bảo nút luôn ở trên các phần tử khác
button.style.borderRadius = '10px'; // Bo góc 10px
button.style.padding = '10px 20px'; // Thêm padding để nhìn button đẹp hơn
button.style.border = 'none'; // Xoá đường viền mặc định (tuỳ chọn)

// Chèn button vào body của trang
document.body.appendChild(button);


function flash_sale() {
    let shopString = document.querySelector('.shop-search-result-view__item') ? '.shop-search-result-view__item ' : '';
    let links = Array.from(document.querySelectorAll(`${shopString}a.contents`));
    const url = new URL(links[0].href);
    const match = url.pathname.match(/i\.(\d+)\.(\d+)/);
    const shopId = match[1]; 
}
