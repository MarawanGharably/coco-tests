import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layouts/StoreLayout';
import SceneEditor from '../../components/SceneEditor';
import FormActions from "../../components/FormComponents/FormActions";


export default function ContentHotspotsPage() {
    const reduxForm = useSelector(state => state.form);
    const form = reduxForm['ImageHotspotForm'];
    const router = useRouter();
    const { id: storeId } = router.query;

    return (
        <StoreLayout title="Content Hotspots" subTitle="Click anywhere on the store to add a hotspot.">
            <SceneEditor storeId={storeId} mode='content_hotspots'/>
            <FormActionsContainer form={form}/>
        </StoreLayout>
    )
}


//TODO: complete this part
const FormActionsContainer=({form})=>{
    return(<div style={{minHeight:'4em'}}>
        {form && (
            <FormActions
                // onPageRefresh={onPageRefresh} submitting={submitting}
            />
        )}
    </div>)
}