import { useState, FormEvent, ChangeEvent } from 'react';
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        console.log('Login successful');
        // Redirect to the home page or perform any other desired action
        window.location.href = '/';
      } else {
        const data = await response.json();
        console.error(data.error); // Handle the error message
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="flex px-8 py-16 h-screen">
      <div className="flex flex-col space-y-8 px-16 py-32 lg:basis-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <input
            type="password"
            name="password"
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
