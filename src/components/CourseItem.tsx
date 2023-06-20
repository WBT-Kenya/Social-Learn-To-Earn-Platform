export interface Course {
  image: string;
  title: string;
  description: string;
}

const CourseItem = ({ course }: { course: Course }) => {
  const { image, title, description } = course;
  return (
    <section className="flex flex-col">
      <img src={image} alt="" />
      <div className="bg-[#EEEFEF] flex flex-col space-y-3 text-black hover:text-white hover:bg-black p-8">
        <h3 className="text-2xl font-semibold text-center ">{title}</h3>
        <p className="font-light">{description}</p>
      </div>
    </section>
  );
};

export default CourseItem;
