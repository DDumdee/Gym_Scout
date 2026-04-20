import { Elysia, t } from "elysia";
import { supabase } from "../db";

// Simple password hashing with Bun's built-in
const hashPassword = async (pw: string) => await Bun.password.hash(pw);
const verifyPassword = async (pw: string, hash: string) =>
  await Bun.password.verify(pw, hash);

export const authRoutes = new Elysia({ prefix: "/auth" })

  .post("/register", async ({ body, set }) => {
    const { name, email, password } = body;

    const hashed = await hashPassword(password);

    const { error } = await supabase
      .from("users")
      .insert({ name, email, password: hashed });

    if (error) {
      set.status = 400;
      return { success: false, message: "Email already in use" };
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
    cookie.session.set({
      value: JSON.stringify({ name: user.name, email: user.email }),
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: true, name: user.name };
  }, {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
    }),
  })

  .post("/logout", ({ cookie }) => {
    cookie.session.remove();
    return { success: true };
  });