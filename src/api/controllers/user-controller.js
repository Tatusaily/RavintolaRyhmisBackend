import { addUser, findUserById, listAllUsers, findPizzasByUserID, findUserByName} from "../models/user-model.js";

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const getUserByName = async (req, res) => {
  const user = await findUserByName(req.params.name);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
}

/**
 * Registers a new user to the DB.
 */
const postUser = async (req, res) => {
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({ message: "New user added.", result });
  } else {
    res.sendStatus(400);
  }
};

/**
 * Updates a user in the DB.
 */
const putUser = async (req, res) => {
  // PLACEHOLDER
  // DOES NOT WORK
  res.sendStatus(200);
  res.json({ message: "User item updated.", result });
}

const deleteUser = async (req, res) => {
  // PLACEHOLDER
  // DOES NOT WORK
  res.sendStatus(200);
    res.json({ message: "User item deleted.", result });
}

/**
 * Gets all user's pizzas by userID.
 * @param {Request} req.params.id - The user ID.
 */
const getPizzasByUserID = async (req, res) => {
  const cats = await findPizzasByUserID(req.params.id);
  if (cats) {
    res.json(cats);
  } else {
    res.sendStatus(404);
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser, getPizzasByUserID, getUserByName};