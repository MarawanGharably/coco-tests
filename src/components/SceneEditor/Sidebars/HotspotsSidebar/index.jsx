import React from 'react';
import ContentHotspotFormWrapper from '../../ContentHotspotFormWrapper'
import styles from './HotspotsSidebar.module.scss';

export default function HotspotsSidebar (props) {
    return (
        <div className={styles['cmp']}>
            {props.mode === 'content_hotspot' && <ContentHotspotFormWrapper {...props} />}
        </div>
    )
}
