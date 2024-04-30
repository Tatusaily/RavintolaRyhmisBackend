import express from 'express';
import {
  getAllPizzas,
  getPizzaById,
  postPizza,  
  putPizza,
  deletePizza
} from '../controllers/pizza-controller.js';
import multer from 'multer';

const pizzaRouter = express.Router();

const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E5);
    const uniquePrefix = (req.body.name).replaceAll(/,|-|_|'/gi, '').toLowerCase();
    let extension = file.originalname.split(".").pop(); // Or mimetype?
    if (extension !== ('jpg' || 'jpeg' || 'png' || 'gif')) {
      extension = 'jpg';
    }

    const filename = `${uniquePrefix}-${uniqueSuffix}.${extension}`;
    cb(null, filename);
  },
});

const upload = multer({dest: 'uploads/', myStorage});

pizzaRouter.route('/')
  .get(getAllPizzas)
  .post(upload.single("filename"), postPizza);

pizzaRouter.route('/:id')
  .get(getPizzaById)
  .put(putPizza)
  .delete(deletePizza);

export default pizzaRouter;