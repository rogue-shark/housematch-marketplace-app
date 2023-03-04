import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData; //destr from form data

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value //[e.target.id] - to make it into email or password, what ever we are typing inside
    }))
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      //authentication
      const auth = getAuth()
      //registering user that returns a promise
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      //getting actual user info - needed for db
      const user = userCredential.user
      //updating the display name
      updateProfile(auth.currentUser, {
        displayName: name
      }) 

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
        <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />

          <input
            type='email'
            className='emailInput'
            placeholder='E-mail'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPass ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPass((initialState) => !initialState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign In</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* //TODO - google auth  */}
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>

      </div>
    </>
  );
}

export default SignUp;
