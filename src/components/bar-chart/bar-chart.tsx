import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'bar-chart',
  styleUrl: 'bar-chart.css',
  shadow: true,
})
export class BarChart {
  @Prop() data: number[] = [10, 20, 30, 40, 50];
  @Prop() labels: string[] = ['A', 'B', 'C', 'D', 'E']; // Labels for X-axis
  @Prop() width: number = 500;
  @Prop() height: number = 300;
  @Prop() barColor: string = '#36A2EB';
  @Prop() barSpacing: number = 10;
  @Prop() yAxisLabel: string = 'Values'; // Label for Y-axis
  @Prop() xAxisLabel: string = 'Categories'; // Label for X-axis

  render() {
    const maxDataValue = Math.max(...this.data);
    const barWidth = (this.width - (this.data.length - 1) * this.barSpacing) / this.data.length;
    const axisOffset = 40; // Space for labels and axes

    return (
      <svg width={this.width + axisOffset} height={this.height + axisOffset}>
        {/* Y-axis */}
        <line x1={axisOffset} y1={0} x2={axisOffset} y2={this.height} stroke="black" />
        {/* X-axis */}
        <line x1={axisOffset} y1={this.height} x2={this.width + axisOffset} y2={this.height} stroke="black" />

        {/* Bars and X-axis labels */}
        {this.data.map((value, index) => {
          const barHeight = (value / maxDataValue) * this.height;
          const x = axisOffset + index * (barWidth + this.barSpacing);
          const y = this.height - barHeight;

          return (
            <g key={index}>
              {/* Bar */}
              <rect x={x} y={y} width={barWidth} height={barHeight} fill={this.barColor} />
              {/* X-axis label */}
              <text x={x + barWidth / 2} y={this.height + 15} text-anchor="middle" font-size="12">
                {this.labels[index] || ''}
              </text>
            </g>
          );
        })}

        {/* Y-axis labels */}
        {Array.from({ length: 5 }, (_, i) => {
          const yValue = (maxDataValue / 4) * i;
          const yPos = this.height - (yValue / maxDataValue) * this.height;

          return (
            <text x={axisOffset - 10} y={yPos} text-anchor="end" font-size="12" alignment-baseline="middle">
              {Math.round(yValue)}
            </text>
          );
        })}

        {/* Y-axis label */}
        <text x={axisOffset - 30} y={this.height / 2} text-anchor="middle" font-size="14" transform={`rotate(-90, ${axisOffset - 30}, ${this.height / 2})`}>
          {this.yAxisLabel}
        </text>

        {/* X-axis label */}
        <text x={axisOffset + this.width / 2} y={this.height + 30} text-anchor="middle" font-size="14">
          {this.xAxisLabel}
        </text>
      </svg>
    );
  }
}
