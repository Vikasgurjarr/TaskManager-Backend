const { z } = require("zod");

const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 chars." })
    .max(255, { message: "Name must not be more than 255 chars." }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 chars." })
    .max(255, { message: "Email must not be more than 255 chars." }),

  mobile: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 chars." })
    .max(10, { message: "Phone must not be more than 10 chars." }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 chars." })
    .max(1024, { message: "Password must not be more than 1000 chars." }),

  city: z
    .string({ required_error: "City is required" })
    .min(3, { message: "City must be at least 3 chars." })
    .max(1024, { message: "City must not be more than 1000 chars." }),

  address: z
    .string({ required_error: "Address is required" })
    .min(5, { message: "Address must be at least 5 chars." })
    .max(1024, { message: "Address must not be more than 1024 chars." }),

  gender: z
    .string({ required_error: "Gender is required" })
    .min(4, { message: "Gender must be at least 4 chars." }) // Assuming "Male" or "Female" or other
    .max(10, { message: "Gender must not be more than 10 chars." }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long." })
    .max(255, { message: "Email must not be more than 255 characters long." }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(1024, { message: "Password must not be more than 1024 characters long." }),
});

module.exports = { signupSchema, loginSchema };
