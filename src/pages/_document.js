import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head >
                    <title>COCO</title>
                    <link href="https://fonts.googleapis.com/css?family=Raleway:400,500,600,700,800&display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossOrigin="anonymous"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;