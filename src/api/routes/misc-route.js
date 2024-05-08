import express from "express";
import {
  getToppings
} from "../controllers/misc-controller.js";

const miscRouter = express.Router();

miscRouter.route("/")
  .get(getToppings);

export default miscRouter;
