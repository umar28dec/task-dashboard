module.exports = (req, res, next) => {
  const { title, status, dueDate } = req.body;
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push("Title is required and must be a non-empty string.");
  }
  if (status && !["todo", "in-progress", "done"].includes(status)) {
    errors.push("Status must be one of: todo, in-progress, done.");
  }
  if (dueDate && isNaN(Date.parse(dueDate))) {
    errors.push("Due date must be a valid date.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
