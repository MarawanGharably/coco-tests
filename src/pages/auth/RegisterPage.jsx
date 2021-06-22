import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import {PasswordInput, EmailInput} from '../../components/FormComponents';

const RegisterPage = () => (
    <div className="flex flex-column flex-center full-width">
        <Link to="/">Home</Link>
        <h2>REGISTER</h2>
        <div css={css`margin: 3em 0;`}>
            <EmailInput width="40em" />
        </div>
        <PasswordInput width="40em" />
    </div>

);

export default RegisterPage;
