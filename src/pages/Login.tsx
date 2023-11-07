import { useState, FormEvent, ChangeEvent } from "react";
import Image from "../assets/image.png";
import { client } from "../axios/axios";
import { useNavigate } from "react-router";


interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await client.post("login", formData);
      console.log(res.data);
      setFormData({
        email: "",
        password: "",
      });
<<<<<<< HEAD

      if (response.status === 200) {
        // Store the token in a cookie upon successful login
        const data = await response.json();
        const token = data.token;
        document.cookie = `token=${token}; path=/dashboard`;

        // Redirect to the home page
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        console.error(data.error); // Handle the error message
      }
=======
      setTimeout(() => navigate("/dashboard"), 3000)
>>>>>>> 06d061d95941431b18b55ee32d610525de4000da
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to check if the user is authenticated
  function isUserAuthenticated() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return !!token;
  }

  // Check if the user is already authenticated on page load
  if (isUserAuthenticated()) {
    // Redirect to the home page
    window.location.href = "/dashboard";
  }

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
          <button
            type="submit"
            className="text-center w-full text-white bg-[#2D3B79] p-4 text-[16px] leading-[24px] rounded-[29px]"
          >
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