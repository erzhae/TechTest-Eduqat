const db = require('../utils/db');

module.exports.listCourse = async (event, context) => {
  try {
    const courses = await db('courses')
      .join('course_details', 'courses.id', '=', 'course_details.course_id')
      .select('courses.id', 'courses.name', 'courses.description', 'course_details.instructor', 'course_details.duration', 'course_details.level', 'course_details.topics');

    return { statusCode: 200, body: JSON.stringify(courses) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
};
