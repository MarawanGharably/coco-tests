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
        <div className="flex flex-center flex-column">
            <PageRow width="85%" header="Set Store Colors" hasInfo infoTitle="Select Your Colors!" infoText="Choose primary and secondary colors that represent your brand!">
                <PageItem>
                    <ColorSelector labelTitle="Primary Color" labelId="primary-color-selector" />
                </PageItem>
                <PageItem>
                    <ColorSelector labelTitle="Secondary Color" labelId="secondary-color-selector" />
                </PageItem>
            </PageRow>
            <PageRow header="Upload Logo" hasInfo infoTitle="Upload your logo!" infoText="Let yourself be known, place your logo across our stores!">
                <PageItem>
                    <FileUpload />
                </PageItem>
            </PageRow>
            <PageRow header="Add Brand Info" column hasInfo infoTitle="Tell us about yourself!" infoText="Input some descriptions to help people know what you're all about!">
                <PageItem column>
                    <TextInput title="Brand Tagline" />
                </PageItem>
                <PageItem column>
                    <TextInput title="Brand Blurb" />
                </PageItem>
            </PageRow>
        </div>
    </Page>
);

export default BrandElementsPage;
