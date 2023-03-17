import { useState } from 'react';
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import OAuth from '../components/OAuth';
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
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
      //copying our form data state - name and email 
      const formDataCopy = {...formData}
      delete formDataCopy.password //don't want to put pass in db
      formDataCopy.timestamp = serverTimestamp()
      //update the database
      await setDoc(doc(db, 'users', user.uid), formDataCopy) 

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong! Please, try again.')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Get started here!</p>
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

          
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead ?
        </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

      </div>
    </>
  );
}

export default SignUp;
