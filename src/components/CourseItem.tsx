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
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  );
};

export default CourseItem;
