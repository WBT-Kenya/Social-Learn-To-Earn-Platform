export {};

import { useState } from 'react';
// import Google from '../assets/google.png';
import Image from '../assets/image.png';



interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log('Login successful. Message:', data.message);
        // Redirect or perform other actions based on the response data.
      } else {
        const data = await response.json();
        console.error('Login failed. Error:', data.error);
        // Provide user-friendly feedback on login failure.
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="flex px-8 py-16 h-screen">
      <div className="flex flex-col space-y-8 px-16 py-32 lg:basis-1/2">
        <form action="" onSubmit={handleSubmit} className="flex flex-col space-y-8">
          <input
            type="email"
            name="email" // Unique name attribute for email field
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <input
            type="password"
            name="password" // Unique name attribute for password field
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <button type="submit" className="text-center w-full text-white bg-[#2D3B79] p-4 text-[16px] leading-[24px] rounded-[29px]">
            Login
          </button>
        </form>
      </div>
      <div className="hidden lg:block basis-1/2">
        <img src={Image} alt="Login Image" className="w-[736px] h-full" />
      </div>
    </section>
  );
};

export default Login;






