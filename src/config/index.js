//S3/CDN
//main bucket: obsess-cms-dev, obsess-cms-beta, obsess-cms-prod
//URL: https://cdn.obsessvr.com/obsess-cms-dev/clients/Obsess/60f58ff8f1da5a8d23ebbb0c/icons/apple.png

//bucket 2: obsessvr-webstore-assets-public > coco > defaultIcons
//URL:https://cdn.obsessvr.com/coco/defaultIcons/hotspot_icons/video_hotspot_icon1.png


export default {
    CDN_HOST: 'https://cdn.obsessvr.com/coco',
    // CDN_HOST2: 'https://cdn.obsess-vr.com/coco',//everything should be transferred here
    ROLLBAR: {
        accessToken: '5046ba4816cc423485217238df3e2cf2',
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
            environment: 'production',
        },
    },
};
