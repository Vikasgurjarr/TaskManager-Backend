const { z } = require("zod");

const projectSchema = z.object({
  name: z.string().min(3).max(50),
  status: z.enum(["pending", "completed", "notStarted"]),
});

module.exports = {
  projectSchema,
};
