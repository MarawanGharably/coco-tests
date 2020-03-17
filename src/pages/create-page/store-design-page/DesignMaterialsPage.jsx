import React from 'react';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import RadioGroup from '../../../components/radio/RadioGroup';
import Radio from '../../../components/radio/Radio';
import formField from '../../../utils/formField';
import './_store-design.scss';

const VELVET_GOLD_STONE_IMAGE = 'https://cdn.obsessvr.com/Material_VelvetGoldStone.jpg';
const LINEN_CHROME_WOOD_IMAGE = 'https://cdn.obsessvr.com/Material_LinenChromeWood.jpg';

const MATERIAL_OPTIONS = Object.freeze({
    OPTION1: 'Velvet, Gold, Stone',
    OPTION2: 'Linen, Chrome, Wood',
});

const DesignMaterialsPage = () => (
    <Page
        pageTitle="Store Design"
        pageSubTitle="These materials will be used on the product fixtures, decor, walls, and floors"
    >
        <section className="store-design">
            <RadioGroup>
                <PageRow header="Choose Number of Products">
                    <PageItem>
                        <Radio
                            formField={formField.designMaterials}
                            value={MATERIAL_OPTIONS.OPTION1}
                            isImage
                            imageUrl={VELVET_GOLD_STONE_IMAGE}
                            isLabelShowing
                            isDefaultSelected
                        />
                    </PageItem>
                    <PageItem>
                        <Radio
                            formField={formField.designMaterials}
                            value={MATERIAL_OPTIONS.OPTION2}
                            isImage
                            imageUrl={LINEN_CHROME_WOOD_IMAGE}
                            isLabelShowing
                        />
                    </PageItem>
                </PageRow>
            </RadioGroup>
        </section>
    </Page>
);

export default DesignMaterialsPage;
