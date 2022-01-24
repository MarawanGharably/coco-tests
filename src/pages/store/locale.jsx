import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Select, Switcher } from "../../components/ReduxForms/_formFields";
import StoreLayout from "../../components/layouts/StoreLayout";
import FormWithActionBtns from "../../components/ReduxForms/commonUI/FormWithActionBtns";
import SubmitStatusMessage from "../../components/ReduxForms/SubmitStatusMessage";
import { getStoreLocale, updateStoreLocales } from "../../APImethods";


//TODO: need validation()


let LocalePage = ({ initialize, ...props }) => {
    const router = useRouter();
    const formData = useSelector((state) => state.form.LocalePage?.values);
    const [storeDataLoaded, setStoreData] = useState(false);
    const [status, setStatus] = useState({});
    const options = formData?.locales.map((item) => ({ label: item, value: item }));
    const { id: storeId } = router.query;


    useEffect(() => {
        storeId && getStoreLocale(storeId)
                .then((res) => {
                    setStoreData(true);
                    initialize(res);
                })
                .catch((err) => console.log(err));
    }, [storeId]);

    const onSubmit = (values) => {
       return updateStoreLocales(storeId, values)
            .then((res) => {
                setStatus({ success: true, message: "Store Locale Updated Successfully" });

                setTimeout(() => {
                    router.push(`/store/fonts/?id=${storeId}`);
                }, 2000);
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.data?.error_message || err?.message || "Store Locale Update Failed" });
            });
    };

    return (
        <StoreLayout title="Locale">
            <SubmitStatusMessage status={status} />

            <FormWithActionBtns dataLoaded={storeDataLoaded} onSubmit={onSubmit} fieldsWrapperStyle={{ maxWidth: "40em" }}{...props}>
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
