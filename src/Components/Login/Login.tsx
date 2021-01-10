import React from 'react';
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField } from "../common/ControlForms";
import { connect } from "react-redux";
import { login } from "../../Redux/AuthReducer";
import { Redirect } from "react-router-dom";
import required from '../../Utilities/Validation/Validator';
import { AppStateType } from '../../Redux/Redux-store';

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

type MapStateToProps = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const Login: React.FC <MapStateToProps & MapDispatchToProps> = (props) => {
    const onSubmit = (formData: LoginFormValues) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        <div>
            For test
            <div> free@samuraijs.com </div>
            <div> free </div>
        </div>
    </div>
}
const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);