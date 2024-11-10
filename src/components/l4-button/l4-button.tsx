import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'l4-button',
  shadow: true,
  styleUrl: 'l4-button.css',
})
export class L4Button {
  @Prop() buttonText: string;

  private handleClick = () => {
    window.open('https://google.com', '_blank').focus();
  };
  render() {
    return (
      <Host>
        <button onClick={this.handleClick}>{this.buttonText}</button>
      </Host>
    );
  }
}
