import { IoIosNotificationsOutline } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";

const Navbar = () => {
  return (
    <section className="flex items-center space-x-4">
      <form action="">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search..."
          className="bg-gray-200 px-4 py-2 rounded-[15px]"
        />
      </form>
      <div className="flex space-x-2 items-center text-2xl">
        <IoIosNotificationsOutline className="" />
        <div className="flex items-center">
          <BiUser />
          <RxCaretDown className="text-lg" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
