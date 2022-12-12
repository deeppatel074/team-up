import express from "express";
import "dotenv/config";
import ApiRoutes from "./routes";

const app = express();

app.use("/", ApiRoutes);

app.listen(process.env.PORT, () => {
  console.log("Yep this is working 🍺");
  console.log("We've now got a server 🦄");
  console.log(`App listen on port: ${process.env.PORT} 🍕`);
  console.log(`Server Url:  http://localhost:${process.env.PORT}`);
});
