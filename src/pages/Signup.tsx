import { useState } from 'react';
import Image from '../assets/image.png';
import Google from '../assets/google.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    // confirmPassword: '',
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      // Make a POST request to your server to create a new user account
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful registration, e.g., redirect to login page
        console.log('Registration successful');
      } else {
        // Handle registration failure, e.g., display an error message
        console.log('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <section className="flex px-8 py-16 h-screen">
      <div className="flex flex-col space-y-8 px-16 py-32 lg:basis-1/2">
        <div className="flex justify-between">
          <h2 className="font-bold text-[40px] text-[#0F305E]">Sign Up</h2>
          <a
            href="/login"
            className="bg-[#F5F5F5] rounded-[34px] text-[#000000] px-16 py-3 text-[16px] leading-[26px]"
          >
            Sign In
          </a>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          <section className="flex space-x-4 w-full">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-4 border border-[#D9D9D9] rounded-[33px] w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-4 border border-[#D9D9D9] rounded-[33px] w-full"
            />
          </section>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          {/* <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          /> */}

          <input
            type="submit"
            value="Register"
            className="text-center w-full text-white bg-[#2D3B79] p-4 text-[16px] leading-[24px] rounded-[29px]"
          />
        </form>
        <a
          href="google"
          className="grid place-items-center bg-[#F5F5F5] p-4 rounded-[29px]"
        >
          <div className="flex items-center space-x-6 text-[#2B2B2B]">
            <img src={Google} alt="" className="" />
            <p>Sign Up with Google</p>
          </div>
        </a>
      </div>
      <div className="hidden lg:block basis-1/2">
        <img src={Image} alt="" className="w-[736px] h-full" />
      </div>
    </section>
  );
};

export default Signup;
