import type { Meta, StoryObj } from '@storybook/react';

import { useOffcanvas } from './OffcanvasContext.tsx';
import { RDU_Button } from '../../buttons/button/Button.tsx';
import { OffcanvasProvider } from './OffcanvasProvider.tsx'

const meta: Meta<typeof OffcanvasProvider> = {
  title: 'Components/OffcanvasProvider',
  component: OffcanvasProvider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const OffcanvasTrigger = () => {
  const { openOffcanvas } = useOffcanvas();
  return (
    <RDU_Button
      type='button'
      text="Open Offcanvas"
      variant="primary"
      onClick={() => openOffcanvas(<p>This is a Offcanvas!</p>, 'left')}
    />
  );
};

export const WithProvider: Story = {
  render: () => (
    <OffcanvasProvider>
      <OffcanvasTrigger />
    </OffcanvasProvider>
  ),
};
