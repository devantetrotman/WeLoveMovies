
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary(); // sets supplier_id as the primary key
        table.text("content");
        table.integer("score");
        table.integer("critic_id").unsigned();
            table.foreign("critic_id").references("critic_id").inTable("critics").onDelete("CASCADE");
        table.integer("movie_id").unsigned();
            table.foreign("movie_id").references("movie_id").inTable("movies").onDelete("CASCADE");
        table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews");
};
