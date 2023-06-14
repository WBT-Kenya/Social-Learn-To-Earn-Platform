import Image from "../assets/image.png";
import Google from "../assets/google.png";

const Signup = () => {
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
        <form action="" className="flex flex-col space-y-8">
          <section className="flex space-x-4 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="p-4 border border-[#D9D9D9] rounded-[33px] w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-4 border border-[#D9D9D9] rounded-[33px] w-full"
            />
          </section>
          <input
            type="email"
            placeholder="Email"
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />

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
