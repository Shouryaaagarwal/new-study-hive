import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { googleusersignin, usersigninFailure, usersigninStart, usersigninSuccess } from '../Redux/Slices/userSlice';

export default function GoogleOuth() {
  const navigate = useNavigate(); 
  const dispatch= useDispatch(); 
  const handleGoogleClick = async () => {
    try { 
dispatch(usersigninStart()) ; 
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('http://localhost:3000/api/user/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email ,
          avatar:result.user.photo
          
        }),
      });
      const data = await res.json(); 
      if(data.success===false){
        dispatch(usersigninFailure(data.message)) ; 
        return ;
      } 
      dispatch(usersigninSuccess(data.message)) ;  
      dispatch(googleusersignin()) ; 
      navigate('/home');
    } catch (error) {
      dispatch(usersigninFailure(error)) ; 
    }
  };
  return (
    <button
    type="button" 
    onClick={handleGoogleClick}
    className="bg-black  px-6 py-5 hover:scale-110 transition-transform duration-500 hover:rounded text-white text-sm font-normal flex items-center justify-center gap-3 group"
  >
    Sign-Up
    <FcGoogle />
  </button>
  );
}
 