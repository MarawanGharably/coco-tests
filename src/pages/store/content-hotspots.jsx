import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { apiCreateHotspotByType } from '../../APImethods';
import StoreLayout from '../../components/layouts/StoreLayout';
import SceneEditor from '../../components/SceneEditor';
import FormActions from "../../components/FormComponents/FormActions";


export default function ContentHotspotsPage(props) {

    const reduxForm = useSelector(state => state.form);
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const [submitting, setSubmitting] = useState(false);
    const form = reduxForm['ImageHotspotForm'];
    const router = useRouter();
    const { id: storeId } = router.query;


    const onSubmit = (values) => {
        setSubmitting(true);
        apiCreateHotspotByType(type, storeId, currentSceneId, form.values)
            .then((res) => {
                setStatus({ success: true, message: 'Submitted Successfully' });
                alert("done");
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.message || 'Submitting failed' });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    //TODO: complete this part
    const FormActionsContainer=({form})=>{
        return(<div style={{minHeight:'4em'}}>
            {form && (
                <FormActions
                    //onPageRefresh={onPageRefresh}
                    submitting={submitting}
                    onClick={onSubmit}
                />
            )}
        </div>)
    }
    

    return (
        <StoreLayout title="Content Hotspots" subTitle="Click anywhere on the store to add a hotspot.">
            <SceneEditor storeId={storeId} mode='content_hotspots'/>
            <FormActionsContainer form={form}/>
        </StoreLayout>
    )
}