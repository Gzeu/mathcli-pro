import { create, all } from 'mathjs';
const math = create(all);

export function calculate(expr) {
  try {
    const result = math.evaluate(expr);
    return { result };
  } catch (err) {
    return { error: err.message };
  }
}
