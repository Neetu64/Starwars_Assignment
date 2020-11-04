import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { loginAction, loginErrorAction } from '../Actions/loginAction';
import './login.scss';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 2) {
    errors.username = 'Minimum be 2 characters or more';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const renderField = ({
  input, id, label, type, meta: { touched, error, warning }, // eslint-disable-line
}) => (
  <div className='input-container'>
    <label htmlFor={id}>{label}
      <input {...input} className='login-text-input' placeholder={label} type={type} />
      {touched && ((error && <span className='error-msg'>{error}</span>) || (warning && <span>{warning}</span>))}
    </label>
  </div>
);

const LoginPage = (props) => {
  const {
    handleSubmit, reset, login, loginError, hasError,
  } = props;
  const formSubmit = (values) => {
    const { username, password } = values;
    fetch(`https://swapi.dev/api/people/?search=${username}`)
      .then(res => res.json())
      .then((data) => {
        if (data.count === 0) {
          loginError({
            hasError: 'No User Found',
          });
        } else {
          data.results.map((i) => {
            if (i.name.toLowerCase() === username.toLowerCase()) {
              if (i.birth_year === password) {
                const isLuke = username.toLowerCase() === 'luke skywalker';
                login({
                  isUserLoggedIn: true,
                  username,
                  isLuke,
                });
                return null;
              }
              loginError({
                hasError: 'Invalid Password',
              });
              return null;
            }
            loginError({
              hasError: 'No User Found',
            });
            return null;
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className='login-container'>
        <h1 className='login-heading'>WELCOME USER</h1>
        <div className='login-box'>
          <div style={{color: 'brown', height: '24px', textAlign: 'center' }}>
            For username <strong>Luke Skywalker</strong>  password is <strong>19BBY</strong>
          </div>
          <Field
            id='username'
            name='username'
            label='Username'
            type='text'
            component={renderField}
          />
          <Field
            name='password'
            label='Password'
            type='password'
            component={renderField}
          />
          {hasError && <div className='error-msg'> {hasError} </div>}
          <div className='btn-section'>
          <button
            className='btn'
            type='submit'
          >
          Submit
          </button>
          <button
            className='btn'
            value='button'
            onClick={reset}
          >
          Clear
          </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.loginReducer.isUserLoggedIn,
  username: state.loginReducer.username,
  isLuke: state.loginReducer.isLuke,
  hasError: state.loginReducer.hasError,
});

const mapDispatchToProps = dispatch => ({
  login: props => dispatch(loginAction(props)),
  loginError: props => dispatch(loginErrorAction(props)),
});

const initialValues = {
  username: 'Luke Skywalker',
};

const LoginPageComponent = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default reduxForm({
  form: 'login',
  validate,
  initialValues,
})(LoginPageComponent);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginError: PropTypes.func.isRequired,
  hasError: PropTypes.string,
};

LoginPage.defaultProps = {
  hasError: null,
};
