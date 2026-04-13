import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { authRoutes } from "./routes/auth";

const app = new Elysia()
  .use(staticPlugin({ assets: "public", prefix: "/" }))
  .use(authRoutes)
  .listen(3000);

console.log(`🦊 Server running at http://localhost:${app.server?.port}`);