import React from 'react';
import { Form } from 'redux-form';
import FormActions from '../FormActions';
import styles from './formWithActionBtns.module.scss';
import {Spinner} from "react-bootstrap";

export default function FormWithActionBtns({ dataLoaded, handleSubmit, onSubmit, submitting, onPageRefresh, fieldsWrapperStyle = {}, children }) {
   if(dataLoaded){
       return (
           <Form onSubmit={handleSubmit(onSubmit)} className={styles.cmp}>
               <div className={styles.fieldsWrapper} style={fieldsWrapperStyle}>
                   {children}
               </div>
               <FormActions onPageRefresh={onPageRefresh} submitting={submitting} />
           </Form>
       );
   }else{
       return(<Spinner
           animation="border"
           role="status"
           variant='info'
           style={{ display:'flex', alignSelf:'center', marginTop:'10em'}}
       />)
   }
}
