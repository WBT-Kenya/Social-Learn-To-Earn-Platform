const Home = () => {
  return (
    <section className="grid place-items-center">
      <nav className="flex space-x-6 px-16 py-4">
        <a
          href="/login"
          className="text-center w-full text-white bg-[#2D3B79] py-4 px-16 text-[16px] leading-[24px] rounded-[29px]"
        >
          Login
        </a>
        <a
          href="/signup"
          className="text-center w-full text-white bg-[#2D3B79] py-4 px-20 text-[16px] leading-[24px] rounded-[29px]"
        >
          Register
        </a>
      </nav>
    </section>
  );
};

export default Home;
