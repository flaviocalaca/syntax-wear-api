import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import productsRoutes from "./routes/products.routes";

const PORT = parseInt(process.env.PORT ?? "3000");
const HOST = process.env.HOST ?? "0.0.0.0";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  credentials: true,
});

fastify.register(helmet, {
  contentSecurityPolicy: false,
});

fastify.register(productsRoutes, {
  prefix: "/products"
});

// Declare a route
fastify.get("/", async (request, reply) => {
  return {
    message: "E-commerceSyntax Wear API",
    version: "1.0.0",
    status: "running",
  };
});

fastify.get("/health", async (request, reply) => {
  return {
    status: "ok",
    timeStamp: new Date().toISOString(),
  };
});

// Run the server!
fastify.listen({ port: PORT, host: HOST }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

export default fastify;
