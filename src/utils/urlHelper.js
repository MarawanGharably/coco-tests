import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const S3Bucket = Object.freeze({
    DEV: 'obsess-cms-dev',
    BETA: 'obsess-cms-beta',
    PROD: 'obsess-cms-prod',
});

const UrlOriginEnum = Object.freeze({
    S3: 's3',
    External: 'external',
    CDN: 'cdn',
});

const OriginUrlPrefixDict = {
    [UrlOriginEnum.S3]: 'https://s3.amazonaws.com/',
    [UrlOriginEnum.CDN]: 'https://cdn.obsessvr.com/',
};


export const S3Link = 'https://s3.amazonaws.com/';

export function getCurrentBucket() {
    if (process.browser && ['coco.beta.obsessvr.com', 'coco.obsessvr.com'].includes(window.location.hostname) ) {
        return S3Bucket.BETA;
    }
    return S3Bucket.DEV;
}

export function formURL(urlObject) {
    let url = '';
    if (urlObject) {
        const { origin, path } = urlObject;
        switch (origin) {
            // case UrlOriginEnum.CDN:
            //     url = OriginUrlPrefixDict[UrlOriginEnum.CDN] + getCurrentBucket() + '/' + path;
            //     break;
            case UrlOriginEnum.S3: case UrlOriginEnum.CDN:
                url = `${OriginUrlPrefixDict[UrlOriginEnum.CDN]}${getCurrentBucket()}/${path}`.replace(/'/g, '%27');
                break;
            case UrlOriginEnum.External:
                url = path;
                break;
            default:
                url = path;
                break;
        }
    }
    return url;
}

export const getHomePageURL = () => {
    let basePath = publicRuntimeConfig.BASE_PATH || '';
    if (!basePath.endsWith("/")) {
        basePath = basePath + "/";
    }
    return `${window.location.protocol}//${window.location.host}${basePath}`;
}

export const getBase64EncodedURL = (url) => {
    return window.btoa(url);
}

export const getLoginRedirectPath = (customRedirect = window.location.href) => {
    /*Get login page redirect path
    *
    * Parameters
    * customRedirect (string)
    *   Description: url to redirect to after successful login
    *   default: window.location.href (current page)
    *
    * Returns
    * loginRedirectPath (string)
    *   Description: Path to redirect user to for authentication
    *
    * */
    const fallBackUrl = `${publicRuntimeConfig.BASE_PATH || ''}/auth/login/`;

    if (process.env.NODE_ENV === "development") return fallBackUrl;

    //FB, Beta, Prod
    else{
        if (publicRuntimeConfig.AUTH_REDIRECT_BASE) {
            return `${publicRuntimeConfig.AUTH_REDIRECT_BASE}/?redirect=${getBase64EncodedURL(customRedirect)}`;
        }
        return fallBackUrl;
    }

};

export const getCookieHost=()=>{
    let cookieHost = window.location.hostname;
    if(process.env.NODE_ENV === 'production'){
        cookieHost = cookieHost.split('.').slice(1).join('.');
    }
    return cookieHost;
}


export default {};
