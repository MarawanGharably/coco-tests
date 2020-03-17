import React from 'react';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import RadioGroup from '../../../components/radio/RadioGroup';
import Radio from '../../../components/radio/Radio';
import formField from '../../../utils/formField';
import './_store-design.scss';

const LUXURY_SLEEK_IMAGE = 'https://cdn.obsessvr.com/Style_LuxurySleek.jpg';
const NATURAL_MODERN_IMAGE = 'https://cdn.obsessvr.com/Style_NaturalModern.jpg';
const COLORFUL_NEW_AGE_IMAGE = 'https://cdn.obsessvr.com/Style_ColorfulNewAge.jpg';

const STYLE_OPTIONS = Object.freeze({
    OPTION1: 'Luxury, Sleek',
    OPTION2: 'Natural, Modern',
    OPTION3: 'Colorful, New Age',
});

const DesignStylePage = () => (
    <Page
        pageTitle="Store Design"
        pageSubTitle="How many products would you like to have on display?"
    >
        <section className="store-design flex flex-center">
            <RadioGroup>
                <PageRow header="Choose Number of Products">
                    <PageItem>
                        <Radio
                            formField={formField.designStyle}
                            value={STYLE_OPTIONS.OPTION1}
                            isImage
                            imageUrl={LUXURY_SLEEK_IMAGE}
                            isLabelShowing
                            isDefaultSelected
                        />
                    </PageItem>
                    <PageItem>
                        <Radio
                            formField={formField.designStyle}
                            value={STYLE_OPTIONS.OPTION2}
                            isImage
                            imageUrl={NATURAL_MODERN_IMAGE}
                            isLabelShowing
                        />
                    </PageItem>
                    <PageItem>
                        <Radio
                            formField={formField.designStyle}
                            value={STYLE_OPTIONS.OPTION3}
                            isImage
                            imageUrl={COLORFUL_NEW_AGE_IMAGE}
                            isLabelShowing
                        />
                    </PageItem>
                </PageRow>
            </RadioGroup>
        </section>
    </Page>
);

export default DesignStylePage;
