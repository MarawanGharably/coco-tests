import React from 'react';
import TextInput from '../../components/text-input/TextInput';
import PasswordInput from '../../components/validation-input/PasswordInput';
import EmailInput from '../../components/validation-input/EmailInput';
import Page from '../../layouts/page-template/Page';

// Example on how to handle a page with multiple forms.
// TODO: Add context to handle form submission
const ExamplePage = () => (
    <Page pageTitle="Example" pageSubTitle="test">
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
    </Page>
);

export default ExamplePage;
