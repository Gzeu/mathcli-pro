import Chart from 'cli-chart';

export function plotChart(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return { error: 'Provide a list of numbers to plot.' };
  }
  const chart = new Chart({ width: 60, height: 20, direction: 'y', xlabel: 'Index', ylabel: 'Value' });
  values.forEach(v => chart.addBar(v));
  chart.draw();
  return { result: 'Chart plotted.' };
}
