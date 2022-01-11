import React, { useState } from 'react';
import { reset } from 'redux-form';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { apiCreateHotspotByType } from '../../APImethods';
import StoreLayout from '../../components/layouts/StoreLayout';
import SceneEditor from '../../components/SceneEditor';
import FormActions from "../../components/FormComponents/FormActions";


export default function ContentHotspotsPage(props) {

    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const form = useSelector((state) => state['form']['ImageHotspotForm']);
    const router = useRouter();
    const { id: storeId } = router.query;


    const onSubmit = () => {
        setSubmitting(true);
        apiCreateHotspotByType(type, storeId, currentSceneId, form.values)
            .then(() => {
                setStatus({ success: true, message: 'Submitted Successfully' });
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.message || 'Submitting failed' });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const onCancel = () => {
        dispatch(reset('ImageHotspotForm'));
    }

    //TODO: complete this part
    const FormActionsContainer=({form})=>{
        return(<div style={{minHeight:'4em'}}>
            {form && (
                <FormActions
                    onPageRefresh={onCancel}
                    submitting={submitting}
                    onSubmit={onSubmit}
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