import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMobileRetro, FaUser, FaLock, FaLockOpen, FaNotesMedical  } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import './Signup.css';
import Header from '../components/header';

// const InputSignupFName = (props) => {
//   return (
//       <>
//           <div className = "signup-user">
//               <FaUser className="signup-icon-user" />
//               <input autoComplete = "on" type = "text" placeholder ="First Name" id='signup-input-user'></input>
//           </div>
          
//       </>
//   )
// }
// const InputSignupLName = (props) => {
//   return (
//       <>
//           <div className = "signup-user">
//               <FaUser className="signup-icon-user" />
//               <input autoComplete = "on" type = "text" placeholder ="Last name" id='signup-input-user'></input>
//           </div>
          
//       </>
//   )
// }
// const InputSignupMobile = (props) => {
//     return (
//         <>
//             <div className = "signup-mobile">
//                 <FaMobileRetro className="signup-icon-mobile" />
//                 <p className = "signup-p-mobile">+63</p>
//                 <input autoComplete = "on" type = "number" placeholder ="9151234567" id='signup-input-mobile' maxlength="10"></input>
//             </div>
            
//         </>
//     )
// }
// const InputSignupCrPass = (props) => {
//     return (
//         <>  
//             <div className = "signup-pass">
//                 <FaLock className="signup-icon-pass" />
//                 <input type = "password" placeholder ="Create Password" id='signup-input-pass'></input>
//             </div>
            
//         </>
//     )
// }
// const InputSignupCoPass = (props) => {
//   return (
//       <>  
//           <div className = "signup-pass">
//               <FaLockOpen className="signup-icon-pass" />
//               <input type = "password" placeholder ="Confirm Password" id='signup-input-pass'></input>
//           </div>
          
//       </>
//   )
// }
// const InputSignupHealth = (props) => {
//   return (
//     <>
//       <div className="signup-health">
//         <FaNotesMedical className="signup-icon-health" />
//         <select id="signup-input-health">
//           <option value="strong">I have health complication/s</option>
//           <option value="medium">I do not have health complications</option>
//         </select>
//       </div>
//     </>
//   );
// };
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    healthComplication: '',
  });

  const [passErr, setPassError] = useState('');



  const handleChange = (e) => {
    const{name, value} = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password' || name === 'confirmPassword'){
      setPassError('');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      setPassError('Password do not match');
      return;
    }


    try {
      const response = await axios.post('http://localhost:8000/api/signup/', formData);
      if (response.status === 201) {
        console.log('User signed up successfully!');
        // Redirect to login page or perform other actions
      } else {
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };
// function Login() {
//   const [setMessage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/hello-world/')
//       .then(response => {
//         setMessage(response.data.message);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, [setMessage]);
// }
  return (
    // <>
    //     <div className='signup-header'>
    //         <Header header="ARShopper"/>
    //     </div>
        
    //     <div className='signup-page'>
    //         <h1 className = "signup-title">SIGN UP</h1>
    //         <div className = "signup-container">
    //             <p className = "signup-categories">First Name</p>
    //             <InputSignupFName />
    //             <p className = "signup-categories">Last Name</p>
    //             <InputSignupLName />
    //             <p className = "signup-categories">Mobile Number</p>
    //             <InputSignupMobile />
    //             <p className = "signup-categories">Create Password</p>
    //             <InputSignupCrPass />
    //             <p className = "signup-categories">Confirm Password</p>
    //             <InputSignupCoPass />
    //             <p className = "signup-categories">Password</p>
    //             <InputSignupHealth />
    //         </div>

    //         <div className='signup-low'>
    //             <Link to ="/home" className = "signup-submit">SUBMIT</Link>
    //             <p>Already have an account?<Link to ="/" className = "signup-login">Login</Link></p>
    //         </div>
    //     </div>
      
    // </>
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        {passErr && <div style={{color: 'red'}}>{passErr} </div>}
        
        <input
          type="number"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        
        <select name="healthComplication" id="dropdown" onChange={handleChange} value={formData.healthComplication}>
          <option value="yes">I Have Health Complications</option>
          <option value ="no">I Don't Have Health Complications</option>
        </select>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
    
  );
}

export default Signup;