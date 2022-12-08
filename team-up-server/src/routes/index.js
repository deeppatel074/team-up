import { Router } from "express";
import UserRoutes from "./users";

const routes = new Router();

routes.use("/users", UserRoutes);

routes.all("*", (req, res, next) =>
  res.status(404).send({
    code: 404,
    message: "URL not found",
  })
);

export default routes;
