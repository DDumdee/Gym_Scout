import { Elysia, t } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" })
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
  .post("/login", ({ body, set }) => {
>>>>>>> parent of 863b26f (full database, i hope)
=======
  .post("/login", ({ body, set }) => {
>>>>>>> parent of 863b26f (full database, i hope)
    const { email, password } = body;

    // Replace with your real DB/auth logic
    if (email === "test.testing@testerson.test" && password === "password123") {
      return { success: true, message: "Welcome back!" };
    }

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    set.status = 401;
    return { success: false, message: "Invalid credentials" };
>>>>>>> parent of 863b26f (full database, i hope)
=======
    set.status = 401;
    return { success: false, message: "Invalid credentials" };
>>>>>>> parent of 863b26f (full database, i hope)
  }, {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
    }),
<<<<<<< HEAD
<<<<<<< HEAD
  })

  .post("/logout", ({ cookie }) => {
    cookie.session.remove();
    return { success: true };
  });
  .get("/me", ({ cookie, set }) => {
  const session = cookie.session.value;
  if (!session) { set.status = 401; return { name: null }; }
  try {
    const { name } = JSON.parse(session);
    return { name };
  } catch {
    set.status = 401;
    return { name: null };
  }
})
=======
  });
>>>>>>> parent of 863b26f (full database, i hope)
=======
  });
>>>>>>> parent of 863b26f (full database, i hope)
