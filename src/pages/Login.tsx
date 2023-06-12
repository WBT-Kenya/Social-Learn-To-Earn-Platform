import Image from "../assets/image.png";

const Login = () => {
  return (
    <section className="flex px-8 py-16">
      <div className="flex flex-col p-16 basis-1/2">
        <div className="flex justify-between">
          <h2>Login</h2>
          <a href="/signup">SignUp</a>
        </div>
        <div>
          <p>
            Welcome back, please enter your email and password to access the
            platform
          </p>
        </div>
        <form action="" className="">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <section>
            <div>
              <input type="checkbox" name="" id="" />
              <a href="forgot">Forgot Password</a>
            </div>
          </section>
          <input type="submit" value="Login" className="text-center w-full" />
        </form>
        <a href="google" className="text-center">
          Log in with Google
        </a>
      </div>
      <div className="basis-1/2">
        <img src={Image} alt="" />
      </div>
    </section>
  );
};

export default Login;
