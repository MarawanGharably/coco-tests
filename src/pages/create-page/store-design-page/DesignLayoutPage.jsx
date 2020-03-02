import React from 'react';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import RadioGroup from '../../../components/radio/RadioGroup';
import Radio from '../../../components/radio/Radio';
import './_store-design.scss';

const LAYOUT_IMAGE_1 = 'https://cdn.obsessvr.com/Layout_default_1.jpg';
const LAYOUT_IMAGE_2 = 'https://cdn.obsessvr.com/Layout_default_2.jpg';

const LAYOUT_OPTIONS = Object.freeze({
    OPTION1: 'Layout 1',
    OPTION2: 'Layout 2',
});

const DesignLayoutPage = () => (
    <Page
        pageTitle="Store Design"
        pageSubTitle="This will be the overall shape of your virtual store"
    >
        <section className="store-design">
            <RadioGroup>
                <PageRow header="Choose Layout">
                    <PageItem>
                        <Radio
                            value={LAYOUT_OPTIONS.OPTION1}
                            isImage
                            imageUrl={LAYOUT_IMAGE_1}
                            isDefaultSelected
                        />
                    </PageItem>
                    <PageItem>
                        <Radio
                            value={LAYOUT_OPTIONS.OPTION2}
                            imageUrl={LAYOUT_IMAGE_2}
                            isImage
                        />
                    </PageItem>
                </PageRow>
            </RadioGroup>
        </section>
    </Page>
);

export default DesignLayoutPage;
