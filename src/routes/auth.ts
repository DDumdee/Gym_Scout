import { Elysia, t } from "elysia";
import { supabase } from "../db";

// Simple password hashing with Bun's built-in
const hashPassword = async (pw: string) => await Bun.password.hash(pw);
const verifyPassword = async (pw: string, hash: string) =>
  await Bun.password.verify(pw, hash);

export const authRoutes = new Elysia({ prefix: "/auth" })

<<<<<<< HEAD
    // Replace with real DB/auth logic
    if (email === "test.testing@testerson.test" && password === "password123") {
      return { success: true, message: "Welcome back!" };
=======
  
  .post("/register", async ({ body, set }) => {
    const { name, email, password } = body;

    const hashed = await hashPassword(password);

    const { error } = await supabase
      .from("users")
      .insert({ name, email, password: hashed });

    if (error) {
      set.status = 400;
      return { success: false, message: "Email already in use" };
>>>>>>> 863b26f05b11a934a55460bc055a03adbe902d92
    }

    return { success: true };
  }, {
    body: t.Object({
      name: t.String({ minLength: 2 }),
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
    }),
  })

  .post("/login", async ({ body, set, cookie }) => {
    const { email, password } = body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      set.status = 401;
      return { success: false, message: "Invalid credentials" };
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      set.status = 401;
      return { success: false, message: "Invalid credentials" };
    }

    // Store name in a simple cookie (use JWT in production)
    if (cookie.session) {
      cookie.session.set({
        value: JSON.stringify({ name: user.name, email: user.email }),
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
      });
    }
  
    return { success: true, name: user.name };
  }, {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
    }),
  })
  .get("/me", ({ cookie, set }) => {
  const session = cookie.session?.value;
  if (!session) { set.status = 401; return { name: null }; }
  try {
    const { name } = JSON.parse(session as string);
    return { name };
  } catch {
    set.status = 401;
    return { name: null };
  }
})
  .post("/logout", ({ cookie }) => {
    if (cookie.session) {
      cookie.session.remove();
    }
    return { success: true };
  });