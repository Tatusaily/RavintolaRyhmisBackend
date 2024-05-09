import { listAllPizzas, findPizzaById } from "../api/models/pizza-model";
import { listToppingsWithAllergens, listAllSizes } from "../api/models/misc-model";
import { findUserById } from "../api/models/user-model";

describe('Pizza model tests', () => {
  test('Getting all pizzas from DB works', async () => {
    const pizzas = await listAllPizzas();
    expect(pizzas.length).toBe(15);
  });

  test('Getting pizza from DB works', async () => {
    const pizza = await findPizzaById(6);
    expect(pizza.name).toBe('Americana');
  });
});

describe('Misc model tests', () => {
  test('Getting toppings from DB works', async () => {
    const toppings = await listToppingsWithAllergens();
    expect(toppings.length).toBe(10);
  });

  test('Getting sizes from DB works', async () => {
    const sizes = await listAllSizes();
    expect(sizes.length).toBe(4);
  });
});


describe('User model tests', () => {
  test('Getting user from DB works', async () => {
    const user = await findUserById(5);
    expect(user.name).toBe('default');
  });
});
