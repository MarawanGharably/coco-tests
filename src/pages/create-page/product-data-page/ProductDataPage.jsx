import React from 'react';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import FileUpload from '../../../components/file-upload/FileUpload';
import { FormDataStore } from '../../../data-store/form-data-store/FormDataStore';
import formField from '../../../utils/formField';

const ProductDataPage = () => {
    const width = '60em';

    return (
        <FormDataStore>
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
                        <FileUpload formField={formField.productData} />
                    </PageItem>
                </PageRow>
                <PageRow
                    header="Upload Product Thumbnail Images + tips hover"
                    width={width}
                >
                    <PageItem>
                        <FileUpload formField={formField.productThumbnails} isMultipleFiles />
                    </PageItem>
                </PageRow>
            </Page>
        </FormDataStore>
    );
};

export default ProductDataPage;
