import { Link } from 'react-router-dom'
import axios from 'axios';

const Home = () => {

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = async () => {

    try {
      const response = await axios.get("http://localhost:8000/logout", { withCredentials: true })
      console.log(response);

      if (response.status === 200) {
        localStorage.removeItem('isLoggedIn');
        window.location.reload()
      }
    }
    catch (error) {

      console.error('Logout failed:', error);
    }

  };

  return (
    <>

      <div className="flex justify-center ">
        <div className='mr-3 p-1 mt-3 bg-blue-400 rounded-lg text-white hover:text-black  cursor-pointer'><Link to='/home'>Home</Link></div>
        <div className='ml-3 mr-3 p-1 mt-3 bg-blue-400 rounded-lg text-white hover:text-black  cursor-pointer' > <Link to='/profile'>Profile</Link></div>
        {isLoggedIn ? (<button onClick={handleLogout} className='ml-3 mr-3 p-1 mt-3 bg-blue-400 rounded-lg text-white hover:text-black  cursor-pointer' >  logout</button>) : (<div className='ml-3 mr-3 p-1 mt-3 bg-blue-400 rounded-lg text-white hover:text-black  cursor-pointer' ><Link to="/login">login</Link></div>)}

      </div>

      <div className="flex items-center justify-center min-h-screen  ">
        <img
          src="https://www.shutterstock.com/image-vector/wax-crayon-like-childs-hand-600nw-725536486.jpg"
          alt="Home"
          className="object-contain  "
        />
      </div>

    </>
  )
}

export default Home
