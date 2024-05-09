import { listAllPizzas, findPizzaById } from "../api/models/pizza-model";
import { listToppingsWithAllergens, listAllSizes } from "../api/models/misc-model";

describe('Pizza model', () => {
  test('Getting all pizzas from DB works', async () => {
    const pizzas = await listAllPizzas();
    expect(pizzas.length).toBe(15);
  });

  test('Getting pizza from DB works', async () => {
    const pizza = await findPizzaById(6);
    expect(pizza.name).toBe('Americana');
  });
});

describe('Misc model', () => {
  test('Getting toppings from DB works', async () => {
    const toppings = await listToppingsWithAllergens();
    expect(toppings.length).toBe(10);
  });

  test('Getting sizes from DB works', async () => {
    const sizes = await listAllSizes();
    expect(sizes.length).toBe(4);
  });
});
