import LogoutIcon from "../assets/logout.png";

const Sidebar = () => {
  return (
    <section className="py-8 w-1/2 flex flex-col bg-black justify-between h-screen rounded-[22px] overflow-hidden">
      <div className="flex flex-col space-y-16">
        <p className="text-white font-black text-5xl self-center px-8">L.</p>
        <div className="flex flex-col space-y-6">
          <a
            href="/"
            className="text-white hover:bg-white hover:text-black text-center py-2"
          >
            Home
          </a>
          <a
            href="/courses"
            className="text-white hover:bg-white hover:text-black text-center py-2"
          >
            Courses
          </a>
          <a
            href="/quizzes"
            className="text-white hover:bg-white hover:text-black text-center py-2"
          >
            Quizzes
          </a>
        </div>
      </div>
      <div className="px-8 self-center">
        <img src={LogoutIcon} alt="" />
      </div>
    </section>
  );
};

export default Sidebar;
