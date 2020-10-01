export const S3Bucket = Object.freeze({
    DEV: 'obsess-cms-beta',
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
    if (['localhost', 'create.beta.shopobsess.co'].includes(window.location.hostname)) {
        return S3Bucket.DEV;
    }
    return S3Bucket.BETA;
}

export function formURL(urlObject) {
    let url = '';
    if (urlObject) {
        const { origin } = urlObject;
        const { path } = urlObject;
        switch (origin) {
            // case UrlOriginEnum.CDN:
            //     url = OriginUrlPrefixDict[UrlOriginEnum.CDN] + getCurrentBucket() + '/' + path;
            //     break;
            case UrlOriginEnum.S3: case UrlOriginEnum.CDN:
                url = `${OriginUrlPrefixDict[UrlOriginEnum.CDN]}${getCurrentBucket()}/${path}`;
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

export function getNameFromURL(link) {
    let name = null;
    if (link) {
        if (link.path) {
            const array = link.path.split('/');
            if (array.length > 0) {
                name = { filename: array[array.length - 1], url: link };
            }
        }
    }
    return name;
}
