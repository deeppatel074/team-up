import { Router } from "express";
import UserRoutes from "./users";
import WorkspaceRoutes from "./workspace"

const routes = new Router();

routes.use("/users", UserRoutes);
routes.use("/workspace", WorkspaceRoutes)

routes.all("*", (req, res, next) =>
  res.status(404).send({
    code: 404,
    message: "URL not found",
  })
);

export default routes;
