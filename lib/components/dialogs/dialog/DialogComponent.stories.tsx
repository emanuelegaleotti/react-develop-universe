import type { Meta, StoryObj } from '@storybook/react';
import { DialogProvider } from './DialogProvider';
import { useDialog } from './DialogContext';
import { RDU_Button } from '../../buttons/button/Button.tsx';

const meta: Meta<typeof DialogProvider> = {
  title: 'Components/DialogProvider',
  component: DialogProvider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const DialogTrigger = () => {
  const { openDialog } = useDialog();
  return (
    <RDU_Button
      type='button'
      text="Open dialog"
      variant="primary"
      onClick={() => openDialog(<p>This is a dialog!</p>)}
    />
  );
};

export const WithProvider: Story = {
  render: () => (
    <DialogProvider>
      <DialogTrigger />
    </DialogProvider>
  ),
};
