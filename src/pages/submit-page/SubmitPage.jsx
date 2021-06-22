import React, { useState } from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import SubmitButton from '../../components/FormComponents/SubmitButton';

const SubmitPage = () => {
    const [submitting, setSubmitting] = useState(false); // eslint-disable-line

    const onSubmit = () => {
        // TODO: submit for review and setSubmitting to true;
    };
    return (
        <Page
            pageTitle="Submit for Review"
            pageSubTitle="Ensure all scenes are accurately tagged before submitting for review"
        >
            <section className="flex flex-center">

                <PageRow>
                    <PageItem>
                        <SubmitButton
                            text="SUBMIT"
                            submitting={submitting}
                            onClick={onSubmit}
                        />
                    </PageItem>
                </PageRow>
            </section>
        </Page>

    );
};

export default SubmitPage;
