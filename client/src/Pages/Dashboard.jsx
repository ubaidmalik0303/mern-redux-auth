import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../Store/Actions/authActions';
import jwt_decode from "jwt-decode";


const Dashboard = ({ auth, userLogout }) => {

    var decoded = jwt_decode(auth.token);

    if (!auth.isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <h1>"{decoded.name}" Wellcome To Dashboard</h1>
            <button onClick={() => userLogout()}>Logout</button>

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
        userLogout: () => dispatch(userLogout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);