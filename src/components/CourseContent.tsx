import ReactPlayer from "react-player";
import { Navbar, Sidebar } from ".";
import { Course } from "./CourseItem";
import { useState } from "react";

export interface CourseContents {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

const CourseContent = ({ course }: { course: Course }) => {
  const { title, description, content } = course;
  const [currentContent, setCurrentContent] = useState(content[0]);

  const handleContentChange = (content: CourseContents) => {
    setCurrentContent(content);
  };

  return (
    <section className="flex p-8 h-screen">
      <section className="basis-1/5">
        <Sidebar />
      </section>
      <section className="basis-4/5 flex flex-col space-y-6 pt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-5xl text-black font-bold">Course Content</h3>
          <Navbar />
        </div>
        <div className="pr-12 flex flex-col space-y-16 w-full pt-16">
          <section className="flex">
            <section className="basis-3/5 flex flex-col space-y-8">
              <div className="basis-3/4 flex flex-col space-y-8">
                <h2 className="text-3xl font-medium">{title}</h2>
                {content.length > 0 ? (
                  <div className="h-full w-full">
                    <ReactPlayer
                      url={currentContent.videoUrl}
                      controls={true}
                    />
                  </div>
                ) : (
                  <div className="text-base flex flex-col">
                    <p>Course has no content at the moment.</p>
                    <p>Check back later!</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col basis-1/4">
                <h3 className="font-medium text-2xl">Course Description</h3>
                <p>{description}</p>
              </div>
            </section>
            <section className="basis-2/5 flex flex-col space-y-4">
              <button className="bg-black text-white rounded-[12px] px-20 py-4 w-full">
                Take Exams
              </button>
              <div className="border border-gray-700 p-8 flex flex-col space-y-4">
                <h3 className="text-2xl ">Content</h3>
                <hr className="border border-gray-400" />
                {content.length > 0 ? (
                  <ol className="flex flex-col space-y-3 list-decimal">
                    {content.map((content) => (
                      <li
                        key={content.id}
                        className={
                          content === currentContent ? `bg-gray-300 p-4` : ``
                        }
                        onClick={() => handleContentChange(content)}
                      >
                        <h3 className="text-black font-bold text-base">
                          {content.title}
                        </h3>
                        <p className="text-gray-600">{content.description}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="text-base flex flex-col">
                    <p>Course has no content at the moment.</p>
                    <p>Check back later!</p>
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </section>
    </section>
  );
};

export default CourseContent;
