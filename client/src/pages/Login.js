import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useForm} from '../util/hooks';

function Login(props) {
    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(login, {
        username: '',
        password: ''
    });

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });

    function login(){
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    error={errors.username ? true: false}
                    value={values.username}
                    onChange={onChange}/>
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    error={errors.password ? true: false}
                    value={values.password}
                    onChange={onChange}/>
                <Button primary type="submit">
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value =>
                        <li key={value}>{value}</li>
                    )}
                </ul>
            </div>}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username
                password: $password
        ){
            id email username createdAt token
        }
    }
`
export default Login;