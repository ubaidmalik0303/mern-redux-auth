import React, { useState } from 'react';
import './signup.css';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignup, clearErrors, clearMessages } from '../Store/Actions/authActions';
import SweetAlert from 'react-bootstrap-sweetalert';
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../Store/Actions/type';
import Loader from 'react-loader-spinner';


const SignUp = ({ userSignup, auth, clearErrors, clearMessages }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const history = useHistory();

    const Signup = async (e) => {
        e.preventDefault();
        await userSignup({ name, email, password, password2 });
    }

    const moveToLogin = () => {
        history.push('/login')
    }

    return (
        <>
            {auth.error ? <SweetAlert danger title={auth.error} onConfirm={() => clearErrors({ type: CLEAR_ERROR })} /> : null}
            {auth.message ? <SweetAlert success title={auth.message} onConfirm={() => { clearMessages({ type: CLEAR_MESSAGE }); moveToLogin() }} /> : null}
            <div className="signup">
                <h1>SignUp</h1>
                <form onSubmit={(e) => Signup(e)}>
                    <label htmlFor="name">
                        Name:
                        <input
                            type="text"
                            required
                            placeholder="Enter Name"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                    <label htmlFor="email">
                        Email Adress:
                        <input
                            type="email"
                            required
                            placeholder="Enter Email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            required
                            placeholder="Enter Password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </label>
                    <label htmlFor="confirm-password">
                        Confirm Password:
                        <input
                            type="password"
                            required
                            placeholder="Enter Confirm Password"
                            id="confirm-password"
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                        />
                    </label>
                    <label>
                        I accept all terms and conditions:
                        <input type="checkbox" rqeuir value={true} />
                    </label>
                    <button type="submit">{auth.isLoading ? <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={20}
                        width={20}
                    /> : "Signup"}</button>
                </form>
                <p>Go to <Link to="/login">LogIn</Link></p>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userSignup: (data) => dispatch(userSignup(data)),
        clearErrors: (data) => dispatch(clearErrors(data)),
        clearMessages: (data) => dispatch(clearMessages(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);