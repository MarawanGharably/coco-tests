import React from 'react';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import FileUpload from '../../../components/file-upload/FileUpload';

const ProductDataPage = () => {
    const width = '60em';

    return (
        <Page
            pageTitle="Product Data"
            pageSubTitle="Add all of the information about the products sold in your store"
        >
            <PageRow
                header="Download Product Data Template + tips hover"
            />
            <PageRow
                header="Upload Product Data + tips hover"
                width={width}
            >
                <PageItem>
                    <FileUpload id="product-data" />
                </PageItem>
            </PageRow>
            <PageRow
                header="Upload Product Thumbnail Images + tips hover"
                width={width}
            >
                <PageItem>
                    <FileUpload id="product-thumbnails" isMultipleFiles />
                </PageItem>
            </PageRow>
        </Page>
    );
};

export default ProductDataPage;
