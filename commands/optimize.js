import { create, all } from 'mathjs';
const math = create(all);

// Suportă: "minimize x^2+3x-5" sau "maximize ..."
export function optimize(query) {
  if (!query || typeof query !== 'string') return { error: 'No function provided.' };
  const match = query.match(/^(minimize|maximize)\s+(.+)$/i);
  if (!match) return { error: 'Format invalid! ex: minimize x^2+3x-5' };
  const [, op, func] = match;
  // Extrage variabila (implicit x)
  let variable = 'x';
  const varMatch = func.match(/([a-zA-Z])/);
  if (varMatch) variable = varMatch[1];
  try {
    // Derivata funcției
    const df = math.derivative(func, variable);
    // Caută rădăcinile derivatei (puncte critice)
    let critPoints = [];
    try {
      critPoints = math.solve(df, variable);
    } catch {
      // fallback: încercare numerică pe interval [-1000,1000]
      for (let i = -1000; i <= 1000; i += 0.5) {
        if (Math.abs(df.evaluate({ [variable]: i })) < 1e-6) critPoints.push(i);
      }
    }
    // Adaugă marginile intervalului pentru siguranță
    critPoints.push(-1000, 1000);
    // Evaluează funcția în punctele critice
    const values = critPoints.map(pt => ({
      x: typeof pt === 'object' && pt.re !== undefined ? pt.re : pt,
      y: math.evaluate(func, { [variable]: typeof pt === 'object' && pt.re !== undefined ? pt.re : pt })
    }));
    let extremum;
    if (/minimize/i.test(op)) {
      extremum = values.reduce((min, v) => v.y < min.y ? v : min, values[0]);
    } else {
      extremum = values.reduce((max, v) => v.y > max.y ? v : max, values[0]);
    }
    return {
      result: `${op} ${func}`,
      extremum: extremum,
      allPoints: values
    };
  } catch (e) {
    return { error: 'Eroare la optimizare: ' + e.message };
  }
}
