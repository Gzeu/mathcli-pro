import Chart from 'cli-chart';

export function plotChart(values) {
  if (!Array.isArray(values)) return 'Provide an array of numbers to plot.';
  if (values.length === 0) return 'Empty array provided.';
  const chart = new Chart({ width: 60, height: 20, direction: 'y', xlabel: 'Index', ylabel: 'Value' });
  values.forEach(v => chart.addBar(v));
  return chart.draw();
}
