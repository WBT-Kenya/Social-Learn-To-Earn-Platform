import { Sidebar } from "../components";

const Home = () => {
  return (
    <section className="flex p-8">
      <section className="basis-1/5">
        <Sidebar />
      </section>
      <section className="basis-4/5 flex flex-col">
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
    </section>
  );
};

export default Home;
