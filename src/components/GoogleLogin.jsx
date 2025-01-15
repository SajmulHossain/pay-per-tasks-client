import { Link } from 'react-router-dom';
import googleLogo from '../assets/images/googleLogo.png'

const GoogleLogin = () => {
  return (
    <div className='flex justify-center'>
      <Link className='btn w-full bg-main-color/20 rounded'>
        <img src={googleLogo} className='w-8' alt="googleIcon" />
        Log in with google
      </Link>
    </div>
  );
};

export default GoogleLogin;