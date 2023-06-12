import Image from "../assets/image.png";

const Signup = () => {
  return (
    <section className="flex px-8 py-16">
      <div className="flex flex-col p-16 basis-1/2">
        <div className="flex justify-between">
          <h2>Login</h2>
          <a href="/signup">Sign In</a>
        </div>
        <form action="" className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Enter phone number" />
          <input type="password" placeholder="Enter Password" />
          <input type="password" placeholder="Confirm Password" />
          <input type="submit" value="Register" />
        </form>
        <a href="google" className="text-center">
          Sign Up with Google
        </a>
      </div>
      <div className="basis-1/2">
        <img src={Image} alt="" />
      </div>
    </section>
  );
};

export default Signup;
