import React, { useState } from 'react';
import './login.css';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, clearErrors, clearMessages, googleLogin } from '../Store/Actions/authActions';
import { CLEAR_ERROR } from '../Store/Actions/type';
import Loader from 'react-loader-spinner';
import SweetAlert from 'react-bootstrap-sweetalert';
import { GoogleLogin } from 'react-google-login';


const Login = ({ userLogin, auth, clearErrors, googleLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory()

    const Login = async (e) => {
        e.preventDefault()
        await userLogin({ email, password })
    }

    const responseSuccessGoogle = (response) => {
        googleLogin(response.tokenId)
    }

    const responseFailGoogle = (response) => {
        alert("Google Login Failed..")
    }

    if (auth.isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <>
            {auth.error ? <SweetAlert danger title={auth.error} onConfirm={() => clearErrors({ type: CLEAR_ERROR })} /> : null}
            <div className="login">
                <h1>login</h1>
                <form onSubmit={(e) => Login(e)}>
                    <label htmlFor="email">
                        Email Adress:
                        <input
                            type="email"
                            required
                            value={email}
                            placeholder="Enter Email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            required
                            value={password}
                            placeholder="Enter Password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">{auth.isLoading ? <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={20}
                        width={20}
                    /> : "Login"}</button>
                </form>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '10px 0',
                }}>
                    <GoogleLogin
                        clientId="132671983651-pm6kl9817bpgbrfg8t0kqd3lshuoauuq.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                <p>Go to <Link to="/signup">SignUp</Link></p>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (data) => dispatch(userLogin(data)),
        clearErrors: (data) => dispatch(clearErrors(data)),
        clearMessages: (data) => dispatch(clearMessages(data)),
        googleLogin: (data) => dispatch(googleLogin(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);