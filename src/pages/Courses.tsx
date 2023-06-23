import { AvailableCourses, Navbar, Sidebar } from "../components";

const Courses = () => {
  return (
    <section className="flex p-8 h-screen">
      <section className="basis-1/5">
        <Sidebar />
      </section>
      <section className="basis-4/5 flex flex-col space-y-6 pt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-5xl text-black font-bold">Courses</h3>
          <Navbar />
        </div>
        <div className="pr-12 flex flex-col space-y-16 w-full pt-16">
          {/* <p className="text-blue-800 self-end">+ add Course</p> */}
          <AvailableCourses />
        </div>
      </section>
    </section>
  );
};

export default Courses;
