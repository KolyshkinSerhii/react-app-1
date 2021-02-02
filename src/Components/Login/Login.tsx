import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../Redux/AuthReducer";
import { AppStateType } from '../../Redux/Redux-store';
import required from '../../Utilities/Validation/Validator';
import { createField, Input } from "../common/ControlForms";

type LoginFormValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormOwnValues = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValues,LoginFormOwnValues> & LoginFormOwnValues> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, { type: 'password' })}
            {createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'Remember me')}

            {captchaUrl && <img src={captchaUrl} alt={""}></img>}
            {captchaUrl && createField('Enter correct symbols', 'captcha', [required], Input,)}

            <div>
                <button>Login</button>
            </div>
            { error && <div>
                {error}
            </div>}
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValues, LoginFormOwnValues>({ form: 'login' })(LoginForm)


export const Login: React.FC = (props) => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const loginUser = (email: string, password: string, rememberMe: boolean, captcha: string) => {
        dispatch(login(email, password, rememberMe, captcha))
    }

    const onSubmit = (formData: LoginFormValues) => {
        loginUser(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        <div>
            For test
            <div> free@samuraijs.com </div>
            <div> free </div>
        </div>
    </div>
}