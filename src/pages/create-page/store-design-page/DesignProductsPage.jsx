import React from 'react';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import RadioGroup from '../../../components/radio/RadioGroup';
import Radio from '../../../components/radio/Radio';
import { FormDataStore } from '../../../data-store/form-data-store/FormDataStore';
import formField from '../../../utils/formField';
import './_store-design.scss';

const PRODUCT_AMOUNT_OPTIONS = Object.freeze({
    OPTION1: 'Up to 25',
    OPTION2: '25 - 50',
});

const DesignProductsPage = () => (
    <FormDataStore>
        <Page
            pageTitle="Store Design"
            pageSubTitle="How many products would you like to have on display?"
        >
            <section className="store-design">
                <RadioGroup>
                    <PageRow header="Choose Number of Products">
                        <PageItem>
                            <Radio
                                formField={formField.designNumberOfProducts}
                                value={PRODUCT_AMOUNT_OPTIONS.OPTION1}
                                isLabelShowing
                                isDefaultSelected
                            />
                        </PageItem>
                        <PageItem>
                            <Radio
                                formField={formField.designNumberOfProducts}
                                value={PRODUCT_AMOUNT_OPTIONS.OPTION2}
                                isLabelShowing
                            />
                        </PageItem>
                    </PageRow>
                </RadioGroup>
            </section>
        </Page>
    </FormDataStore>
);
export default DesignProductsPage;