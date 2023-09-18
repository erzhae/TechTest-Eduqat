const db = require('../utils/db');
const uuid = require('uuid');

module.exports.createCourse = async (event, context) => {
  const { name, description, instructor, duration, level, topics } = JSON.parse(event.body);

  try {
    const [course] = await db('courses').insert({ name, description }).returning('id');
    console.log('course', course);

    if (!course?.id || !uuid.validate(course?.id)) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed create course, Invalid course ID' }) };
    }

    const [courseDetails] = await db('course_details').insert({ course_id: course.id, instructor, duration, level, topics }).returning('id');
    console.log('courseDetails', courseDetails);

    if (!courseDetails?.id || !uuid.validate(courseDetails?.id)) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed create course details, Invalid course details ID' }) };
    }

    return { 
        statusCode: 201, 
        body: JSON.stringify({ 
            course_id: course.id,
            course_details_id: courseDetails.id,
            message: 'Course created successfully'
        })
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error!', errors: error }) };
  }
};