import { useState } from 'react';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth();
  const [editDetails, setEditDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { email, name } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid)
      //For userName
      if(auth.currentUser.displayName !== name){
        //Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        //update in fireStore
        await updateDoc(userRef, {
          name
        })
      }
      //for E-mail
      else if (auth.currentUser.email !== email) {

        await updateEmail(auth.currentUser, email)

        await updateDoc(userRef, {
          email
        })
      }
    } catch (error) {
      // console.log(error)
      toast.error('Could not update details')
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              editDetails && onSubmit();
              setEditDetails((prevState) => !prevState);
            }}
          >
            {editDetails ? 'Done' : 'Edit'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              value={name}
              className={!editDetails ? 'profileName' : 'profileNameActive'}
              disabled={!editDetails}
              onChange={onChange}
            />

            <input
              type='text'
              id='email'
              value={email}
              className={!editDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!editDetails}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
           <img src={homeIcon} alt="home" />
           <p>Sell or rent your home</p>
           <img src={arrowRight} alt="arrow" />
        </Link>
      </main>
    </div>
  );
}

export default Profile;
