import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { Input } from '../formFields';
import SubmitButton from '../../submit-button/SubmitButton';
import { isValidEmail } from '../../../utils/validation';
import PageRow from '../../page-row/PageRow';
import PageItem from '../../page-item/PageItem';

// Actions
import { resetPasswordByEmail } from '../../../store/actions';


class RequestVerificationCodeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: false,
            submitting: false,
        };
    }

  handleSubmit = ({ email }) => {
      const { onSuccessSubmitCallback } = this.props;
      this.setState({ submitting: true, errorMessage: false });

      resetPasswordByEmail(email)
          .then((res) => {
              onSuccessSubmitCallback(email, res.data); // push data UP
          })
          .catch((err) => {
              this.setState({ submitting: false });
              const errorCode = err.data && err.data.error_code ? err.data.error_code : false;
              if (['LIMIT_EXCEEDED'].includes(errorCode)) this.setState({ errorMessage: err.data.message });
              else if (errorCode === 'USER_NOT_FOUND') {
                  const Msg = (
                      <>
                          {err.data.message}
                          <p>
                              <a href="/login">Sign Up</a>
                          </p>
                      </>
                  );

                  this.setState({ errorMessage: Msg });
              } else this.setState({ errorMessage: 'Server error, please try again later.' });
          });
  };



  render() {
      const { submitting, errorMessage } = this.state;
      const { handleSubmit } = this.props;

      return (
          <form onSubmit={handleSubmit(this.handleSubmit)} style={{ width: '100%' }}>
              <Field name="email" type="email" label="Email" component={Input} placeholder="email" extraClass="" />

              <PageRow width="100%">
                  <div>
                      <PageItem>
                          <SubmitButton submitting={submitting} />
                      </PageItem>
                  </div>
              </PageRow>

              <div className="flex flex-center page-row">
                  <h1 style={{ textAlign: 'center' }}>{errorMessage}</h1>
              </div>
          </form>
      );
  }
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
