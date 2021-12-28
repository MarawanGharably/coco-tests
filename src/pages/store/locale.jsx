import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Select, Switcher } from "../../components/ReduxForms/_formFields";
import StoreLayout from "../../components/layouts/StoreLayout";
import FormWithActionBtns from "../../components/FormComponents/FormWithActionBtns";
import SubmitStatusMessage from "../../components/ReduxForms/SubmitStatusMessage";
import { getStoreLocale, updateStoreLocales } from "../../APImethods";



//TODO: onPageRefresh - use initialize maybe?
//TODO: locales_enabled switcher should be redux Field as well
//TODO: perform cleanup

let LocalePage = ({ handleSubmit, change, initialize }) => {
    const router = useRouter();
    const { id: storeId } = router.query;

    const formData = useSelector((state) => state.form.LocalePage?.values);
    console.log("formData--", { formData });

    const [storeDataLoaded, setStoreData] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState({});

    const [initialFormValues, setInitialFormValues] = useState(null);

    const options = formData?.locales.map((item) => ({ label: item, value: item }));

    useEffect(() => {
        storeId &&
            getStoreLocale(storeId)
                .then((res) => {
                    setStoreData(true);
                    setInitialFormValues(res);
                    initialize(res);
                })
                .catch((err) => console.log(err));
    }, [storeId]);

    const onSubmit = (values) => {
        setSubmitting(true);

        updateStoreLocales(storeId, values)
            .then((res) => {
                setStatus({ success: true, message: "Store Locale Updated Successfully" });

                setTimeout(() => {
                    router.push(`/store/product-tagging/?id=${storeId}`);
                }, 2000);
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.message || "Store Locale Update Failed" });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const onPageRefresh = () => {
        initialize(initialFormValues);
    };

    return (
        <StoreLayout title="Locale">
            <SubmitStatusMessage status={status} />

            <FormWithActionBtns
                dataLoaded={storeDataLoaded}
                onSubmit={handleSubmit(onSubmit)}
                onPageRefresh={onPageRefresh}
                submitting={submitting}
                fieldsWrapperStyle={{ maxWidth: "40em" }}
            >
                <Field name="locales_enabled" label="Turn locale ON/OFF" component={Switcher} />

                {formData?.locales_enabled && (
                    <>
                        {/* Locales List */}
                        <Field
                            name="locales"
                            label="Add Locale"
                            mode="dark"
                            component={Select}
                            isMulti={true}
                            allowCustomOptions={true}
                            options={[
                                { label: "en_US", value: "en_US" },
                                { label: "en_UK", value: "en_UK" },
                                { label: "en_INT", value: "en_INT" },
                                { label: "en_IN", value: "en_IN" },
                                { label: "es_ES", value: "es_ES" },
                                { label: "de_DE", value: "de_DE" },
                                { label: "ja_JP", value: "ja_JP" },
                            ]}
                        />

                        <Field
                            name="default_locale"
                            label="Default Locale"
                            mode="dark"
                            component={Select}
                            options={options}
                        />
                    </>
                )}
            </FormWithActionBtns>
        </StoreLayout>
    );
};

export default reduxForm({
    form: "LocalePage",
})(LocalePage);
