
import convertUnits from 'convert-units';

export function convert(query) {
  // Exemplu query: "100 cm to m" sau "5 kg to lb"
  if (!query || typeof query !== 'string') {
    return { error: 'Invalid input. Usage: convert "<value> <from> to <to>"' };
  }
  // Acceptă unități cu /, ^, cifre, simboluri (ex: km/h, m3, m^3, m³)
  const match = query.match(/([\d.,]+)\s*([\w\/\^³μµ]+)\s+to\s+([\w\/\^³μµ]+)/i);
  if (!match) {
    return { error: 'Invalid format. Usage: convert "<value> <from> to <to>"' };
  }
  const value = parseFloat(match[1].replace(',', '.'));
  let from = match[2].toLowerCase();
  let to = match[3].toLowerCase();
  // Normalizez unități pentru convert-units
  from = from.replace('^3', '3').replace('³', '3').replace('μ', 'u').replace('µ', 'u');
  to = to.replace('^3', '3').replace('³', '3').replace('μ', 'u').replace('µ', 'u');
  try {
    const result = convertUnits(value).from(from).to(to);
    return { result: `${value} ${match[2]} = ${result} ${match[3]}` };
  } catch (e) {
    return { error: `Conversion error: ${e.message}` };
  }
}
