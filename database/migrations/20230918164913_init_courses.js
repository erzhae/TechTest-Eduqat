/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('courses', function(table) {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable();
      table.string('description').notNullable();
    })
    .createTable('course_details', function(table) {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('course_id').unsigned().notNullable();
      table.foreign('course_id').references('courses.id').onDelete('CASCADE');
      table.string('instructor').notNullable();
      table.string('duration').notNullable();
      table.string('level').notNullable();
      table.json('topics').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('course_details')
    .dropTableIfExists('courses');
};
