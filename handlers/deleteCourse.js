const db = require('../utils/db');

module.exports.deleteCourse = async (event, context) => {
  const { id } = event.pathParameters;

  try {
    const deleteQueryResult = await db('courses').where({ id }).del();
    if (deleteQueryResult === 0) {
        return { statusCode: 500, body: JSON.stringify({ message: `Failed delete course with id ${id}, Invalid course ID` }) };
    }
    return { statusCode: 204 };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error!', errors: error }) };
  }
};
