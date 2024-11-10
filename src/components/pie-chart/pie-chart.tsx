import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'pie-chart',
  styleUrl: 'pie-chart.css',
  shadow: true,
})
export class PieChart {
  @Prop() data: number[] = [10, 20, 30, 40];
  @Prop() colors: string[] = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
  @Prop() radius: number = 100; // Radius of the pie chart

  private getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  render() {
    const total = this.data.reduce((acc, value) => acc + value, 0);
    let cumulativePercent = 0;

    return (
      <svg width={this.radius * 2} height={this.radius * 2} viewBox="-1 -1 2 2" style={{ transform: 'rotate(-0.25turn)' }}>
        {this.data.map((value, index) => {
          const [startX, startY] = this.getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += value / total;
          const [endX, endY] = this.getCoordinatesForPercent(cumulativePercent);
          const largeArcFlag = value / total > 0.5 ? 1 : 0;
          const sliceMidPercent = cumulativePercent - value / total / 2; // Midpoint of the slice
          const [labelX, labelY] = this.getCoordinatesForPercent(sliceMidPercent);

          return (
            <g key={index}>
              {/* Pie slice */}
              <path d={`M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`} fill={this.colors[index % this.colors.length]} />
              {/* Label at the center of each slice, horizontally aligned */}
              <text
                x={labelX * 0.7} // Positioning text closer to the center
                y={labelY * 0.7}
                text-anchor="middle"
                alignment-baseline="middle"
                font-size="0.15" // Adjust font size as needed
                fill="white"
              >
                {Math.round((value / total) * 100)}%
              </text>
            </g>
          );
        })}
      </svg>
    );
  }
}
