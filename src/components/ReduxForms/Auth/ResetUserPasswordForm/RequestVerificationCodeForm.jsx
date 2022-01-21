import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Link from 'next/link';
import { Input } from '../../_formFields';
import { isValidEmail } from '../../../../utils/validation';
import SubmitButton from '../../commonUI/SubmitButton';
import { resetPasswordByEmail } from '../../../../APImethods/AuthAPI';



class RequestVerificationCodeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            submitting: false,
        };
    }

    handleSubmit = ({ email }) => {
        const { onSuccessSubmitCallback } = this.props;
        this.setState({ submitting: true, error: false });

        resetPasswordByEmail(email)
            .then((res) => {
                // call success callback only if request was successful and request
                // data is in correct format!
                if (res.status === 'success') onSuccessSubmitCallback(email, res);
                //push data UP
                else throw new Error(res); //throw error to pass data down
            })
            .catch((err) => {
                this.setState({ submitting: false });
                const errorCode = err?.data?.error_code || null;

                if (errorCode) this.setState({ error: { message: err.data.message, errorCode } });
                else this.setState({ error: { message: 'Server error, please try again later.' } });
            });
    };

    render() {
        const { submitting, error } = this.state;
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}   className='d-flex flex-column authFormStyling'>
                <Field name="email" type="email" label="Email" component={Input} placeholder="email" />

                <SubmitButton submitting={submitting} className='align-self-center' />

                {/* Error Messages */}
                <ErrorMessage error={error}/>
            </form>
        );
    }
}



const ErrorMessage =({error})=>{
    if(!error) return false;
    let {errorCode, message} = error;

    if(errorCode =='ACCOUNT_NOT_VERIFIED'){
        return(<div className="flex flex-center page-row" style={{ flexFlow: 'column' }}>
            <h1 style={{ textAlign: 'center' }}>Account registration is not completed.<br/>
                Reset password feature available only for registered users.</h1>

            <p style={{fontSize:'2em'}}>Probably you forgot to confirm your email address</p>
        </div>)
    }

    return(<div className="flex flex-center page-row" style={{ flexFlow: 'column' }}>
        <h1 style={{ textAlign: 'center' }}>{message}</h1>
        {errorCode === 'USER_NOT_FOUND' && (
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
                <Link href="/auth/login">
                    <a>Sign Up</a>
                </Link>

            </div>
        )}
    </div>)
}

const validate = (values) => {
    const errors = {};
    if (!values.email || isValidEmail(values.email) !== true) errors.email = 'Email is not valid';

    return errors;
};

RequestVerificationCodeForm.propTypes = {
    onSuccessSubmitCallback: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'RequestVerificationCodeForm',
    validate,
})(RequestVerificationCodeForm);
