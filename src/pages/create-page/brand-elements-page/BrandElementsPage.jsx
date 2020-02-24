import React from 'react';

import ColorSelector from '../../../components/color-selector/ColorSelector';
import TextInput from '../../../components/text-input/TextInput';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import FileUpload from '../../../components/file-upload/FileUpload';

const BrandElementsPage = () => (
    <Page
        pageTitle="Brand Elements"
        pageSubTitle="Your brand elements will be used throughout the virtual store"
    >
        <section className="flex flex-center flex-column">
            <PageRow width="85%" header="Set Store Colors">
                <PageItem
                    render={<ColorSelector labelTitle="Primary Color" labelId="primary-color-selector" />}
                />
                <PageItem
                    render={<ColorSelector labelTitle="Secondary Color" labelId="secondary-color-selector" />}
                />
            </PageRow>
            <PageRow header="Upload Logo">
                <PageItem
                    render={<FileUpload />}
                />
            </PageRow>
            <PageRow header="Add Brand Info" column>
                <PageItem
                    column
                    render={<TextInput title="Brand Tagline" />}
                />
                <PageItem
                    column
                    render={<TextInput title="Brand Blurb" />}
                />
            </PageRow>
        </section>
    </Page>
);

export default BrandElementsPage;
