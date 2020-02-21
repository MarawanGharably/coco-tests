import React from 'react';
import TextInput from '../../components/text-input/TextInput';
import PasswordInput from '../../components/validation-form/PasswordInput';
import EmailInput from '../../components/validation-form/EmailInput';
import PageTitle from '../../components/page-title/PageTitle';

// Example on how to handle a page with multiple forms.
// TODO: Add context to handle form submission
const ExamplePage = () => (
    <section className="flex flex-center full-width">
        <div id="example-page-container" className="full-width full-height">
            <PageTitle title="Example Page" subTitle="Example subtitle" />
            <form className="example-page-form">
                {/*
                        Inputs will simply grow to the width of their parents.
                        If you need to resize, set width at the parent level first
                        NOTE: There is no actual styling difference between
                        example-page-row-one and example-page-row-two. This is
                        just to denote how many inputs there are per row.
                    */}
                <div className="example-page-row-one">
                    <div className="example-input-container flex-1">
                        <TextInput id="example-input" title="example" />
                    </div>
                </div>
                <div className="example-page-row-two flex flex-horizontal-center">
                    <div className="example-input-container flex-1">
                        <EmailInput />
                    </div>
                    <div className="example-input-container flex-1">
                        <PasswordInput />
                    </div>
                </div>
            </form>
        </div>
    </section>
);

export default ExamplePage;
