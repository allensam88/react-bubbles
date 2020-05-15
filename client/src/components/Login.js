import React, { useState } from 'react';
import axiosWithAuth from '../utils/AxiosWithAuth';

const Login = props => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const userHandler = e => {
        setUser(e.target.value)
    };

    const passHandler = e => {
        setPass(e.target.value)
    };

    const login = e => {
        e.preventDefault();
        const credentials = {
            username: user,
            password: pass
        }
        axiosWithAuth()
            .post('/login', credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/bubble-page')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={login} className='form'>
                <input
                    type="text"
                    value={user}
                    onChange={userHandler}
                    placeholder="username"
                    className='input'
                />
                <input
                    type="password"
                    value={pass}
                    onChange={passHandler}
                    placeholder="password"
                    className='input'
                />
                <button className='button'>Log In</button>
            </form>
        </div>
    )
}

export default Login;