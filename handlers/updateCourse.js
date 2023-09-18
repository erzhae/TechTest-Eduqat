const db = require('../utils/db');

module.exports.updateCourse = async (event, context) => {
  const { id } = event.pathParameters;
  const { name, description, instructor, duration, level, topics } = JSON.parse(event.body);

  try {
    const updateCourseResult = await db('courses').where({ id }).update({ name, description });
    if (!updateCourseResult) {
        return { statusCode: 500, body: JSON.stringify({ message: `Failed update course with id ${id}, Invalid course ID` }) };
    }
    const updateCourseDetailsResult = await db('course_details').where({ course_id: id }).update({ instructor, duration, level, topics });
    if (!updateCourseDetailsResult) {
        return { statusCode: 500, body: JSON.stringify({ message: `Failed update course details with course_id ${id}, Invalid course ID` }) };
    }
    return { 
        statusCode: 204,
        body: JSON.stringify({ message: `Course with id ${id} updated successfully` })
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error!', errors: error }) };
  }
};