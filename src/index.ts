import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { cookie } from "@elysiajs/cookie";
import { authRoutes } from "./routes/auth";

const app = new Elysia()
  .use(cookie())
  .use(staticPlugin({ assets: "public", prefix: "/" }))
  .use(authRoutes)
  .listen(3000);

console.log(`🦊 Server running at http://localhost:${app.server?.port}`);