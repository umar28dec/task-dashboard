exports.up = function (knex) {
  return knex.schema.createTable("tasks", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.enum("status", ["todo", "in-progress", "done"]).defaultTo("todo");
    table.date("dueDate");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
