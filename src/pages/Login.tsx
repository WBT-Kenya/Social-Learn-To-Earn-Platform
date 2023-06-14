import Image from "../assets/image.png";
import Google from "../assets/google.png";

const Login = () => {
  return (
    <section className="flex px-8 py-16 h-screen">
      <div className="flex flex-col space-y-8 px-16 py-32 basis-1/2">
        <div className="flex justify-between">
          <h2 className="font-bold text-[40px] text-[#0F305E]">Login</h2>
          <a
            href="/signup"
            className="bg-[#F5F5F5] rounded-[34px] text-[#000000] px-16 py-3 text-[16px] leading-[26px]"
          >
            SignUp
          </a>
        </div>
        <div className="text-[#0F305E] font-medium text-[18px] leading-[26px]">
          <p>
            Welcome back, please enter your email and password to access the
            platform
          </p>
        </div>
        <form action="" className="flex flex-col space-y-8">
          <input
            type="email"
            placeholder="Email"
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 border border-[#D9D9D9] rounded-[33px]"
          />
          <section className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <input type="checkbox" name="" id="" />
              <a href="forgot">Remember me</a>
            </div>
            <a href="forgot-pass">Forgot Password</a>
          </section>
          <input
            type="submit"
            value="Login"
            className="text-center w-full text-white bg-[#2D3B79] p-4 text-[16px] leading-[24px] rounded-[29px]"
          />
        </form>
        <a
          href="google"
          className="grid place-items-center bg-[#F5F5F5] p-4 rounded-[29px]"
        >
          <div className="flex items-center space-x-6 text-[#2B2B2B]">
            <img src={Google} alt="" className="" />
            <p>Log in with Google</p>
          </div>
        </a>
      </div>
      <div className="basis-1/2">
        <img src={Image} alt="" className="w-[736px] h-full" />
      </div>
    </section>
  );
};

export default Login;
