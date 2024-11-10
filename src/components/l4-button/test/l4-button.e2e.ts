import { newE2EPage } from '@stencil/core/testing';

describe('l4-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<l4-button></l4-button>');

    const element = await page.find('l4-button');
    expect(element).toHaveClass('hydrated');
  });
});
