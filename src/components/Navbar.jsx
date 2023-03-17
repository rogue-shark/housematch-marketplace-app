//https://rb.gy/lgtdyz
import { useLocation, useNavigate } from 'react-router-dom';
//importing icon from assets - https://rb.gy/lgtdyz
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const ifPathMatchesRoute = (route) => {
    //here location objet's pathname prop takes in -> i.e. http://localhost:5173/<pathname>
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className='navbar'>
      <div className='navbarNav'>
        <ul className='navbarListItems'>
          {/* NOTE: The fill attribute in SVG  specifies the fill color or pattern of a shape or text */}
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <ExploreIcon
              fill={ifPathMatchesRoute('/') ? '#ffdb57' : '#d2d0d0'}
              width='36px'
              height='36px'
            />
            <p className={ifPathMatchesRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/offers')}>
            <OfferIcon
              fill={ifPathMatchesRoute('/offers') ? '#ffdb57' : '#d2d0d0'}
              width='36px'
              height='36px'
            />
            <p className={ifPathMatchesRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={ifPathMatchesRoute('/profile') || ifPathMatchesRoute('/sign-in') ? '#ffdb57' : '#d2d0d0'}
              width='36px'
              height='36px'
            />
            <p className={ifPathMatchesRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Person</p>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Navbar;
