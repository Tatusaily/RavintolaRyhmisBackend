import express from "express";
import {
  getToppings,
  getSizes
} from "../controllers/misc-controller.js";

const miscRouter = express.Router();

miscRouter.route("/toppings")
  .get(getToppings);

miscRouter.route("/sizes")
  .get(getSizes);

export default miscRouter;
