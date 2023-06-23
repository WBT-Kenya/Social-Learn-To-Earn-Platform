import { CourseContents } from "./CourseContent";

export interface Course {
  id: number;
  image: string;
  title: string;
  description: string;
  content: CourseContents[];
}

const CourseItem = ({ course }: { course: Course }) => {
  const { image, title, description } = course;
  return (
    <a
      href={`/courses/${title.replace(/\s/g, "-").toLowerCase()}`}
      className="flex flex-col row-auto"
    >
      <img src={image} alt="" />
      <div className="bg-[#EEEFEF] flex flex-col space-y-3 text-black hover:text-white hover:bg-black p-8">
        <h3 className="text-2xl font-semibold text-center ">{title}</h3>
        <p className="font-light text-center">{description}</p>
      </div>
    </a>
  );
};

export default CourseItem;
