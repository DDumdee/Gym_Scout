import { Elysia, t } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/login", ({ body, set }) => {
    const { email, password } = body;

    // Replace with your real DB/auth logic
    if (email === "test.testing@testerson.test" && password === "password123") {
      return { success: true, message: "Welcome back!" };
    }

    set.status = 401;
    return { success: false, message: "Invalid credentials" };
  }, {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
    }),
  });
