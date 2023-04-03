const timeout = function (s) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

export const AJAX = async function (url) {
    try {
        const fetchPro = fetch(url);

        const res = await Promise.race([fetchPro, timeout(10)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        return data;
    } catch (err) {
        throw err;
    }
};

export const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes}`;
};

export const debounce = (callback, delay = 1000) => {
    let timeOut;

    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};
