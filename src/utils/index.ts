import { Toast } from "vant";

export const getUrlQuery = (url: string): {[ key in string ]: string} => {
    const query: {[ key in string ]: string} = {};
    const queryStr = url.split('?')[1];
    if (queryStr !== undefined) {
        const queryArr = queryStr.split('&');
        for(let i = 0; i < queryStr.length; i++) {
            if ( queryArr[i] !== undefined) {
                console.log(queryArr[i])
                const queryKeys = queryArr[i].split('=')
                query[queryKeys[0]] = queryKeys[1];
            }
        }
    }
    return query;
}

export const loading = (text: string) => {
    Toast.loading({
        message: text,
        duration: 0,
        forbidClick: true,
    });
}

export const loadingClean = () =>  Toast.clear();

export const toast = (text: string) => Toast(text);