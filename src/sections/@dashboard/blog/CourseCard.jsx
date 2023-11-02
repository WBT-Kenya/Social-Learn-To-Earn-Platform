import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { handleCourse } from '../../../redux/Courses/Courses';

const CourseCard = ({ props }) => {
  const {
    name, description, reserved, id,category,price
  } = props;
  const dispatch = useDispatch();

  const getButton = (reserved, btn) => {
    let button;
    if (btn === 'member') {
      button = reserved ? (
        <span className="active-member-badge">active member</span>
      ) : (
        <span className="not-member-badge">Not a member</span>
      );
    }
    if (btn === 'course') {
      button = reserved ? (
        <button className="leave-course-btn" type="button" onClick={() => dispatch(handleCourse(id))}>Leave Course</button>
      ) : (
        <button className="join-course-btn" type="button" onClick={() => dispatch(handleCourse(id))}>Join Course</button>
      );
    }
    return button;
  };

  return (
    <>
      <td className="course-name">{name}</td>
      <td className="course-description">{description}</td>
      <td className="course-category">{category}</td>
      <td className="course-price">{price}</td>
      <td className="table-badges">{getButton(reserved, 'member')}</td>
      <td className="table-btns">{getButton(reserved, 'course')}</td>
    </>
  );
};

CourseCard.propTypes = {
  props: PropTypes.shape({
  }).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price:PropTypes.string.isRequired
};
export default CourseCard;