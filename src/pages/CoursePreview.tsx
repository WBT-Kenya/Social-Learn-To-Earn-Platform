import { Navbar, Sidebar } from "../components";

const CoursePreview = () => {
  return (
    <section className="flex p-8 h-screen">
      <section className="basis-1/5">
        <Sidebar />
      </section>
      <section className="basis-4/5 flex flex-col space-y-6 pt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-5xl text-black font-bold">Available Quizzes</h3>
          <Navbar />
        </div>
        <div className="pr-12 flex flex-col space-y-16 w-full">
          {/* <CourseContent courseContent={} /> */}
        </div>
      </section>
    </section>
  );
};

export default CoursePreview;
