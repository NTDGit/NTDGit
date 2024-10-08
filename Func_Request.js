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
