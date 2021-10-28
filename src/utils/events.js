export const debounce =(callback, time=1000) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            callback(...args);
        }, time);
    };
};

export const sleep =(ms)=> new Promise((res, reject)=>setTimeout(()=>res(), ms));
