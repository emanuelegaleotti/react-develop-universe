import type { Meta, StoryObj } from '@storybook/react';
import { FaPlus } from 'react-icons/fa';
import { RDU_Chips } from './Chips.tsx';

const meta: Meta<typeof RDU_Chips> = {
  title: 'Components/Chip',
  component: RDU_Chips,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RDU_Chips>;

export const Default: Story = {
  args: {
    text: 'Add',
    actionIcon: <FaPlus />,
    whenActionClick: () => {
      alert('Element Added');
    },
  },
};
