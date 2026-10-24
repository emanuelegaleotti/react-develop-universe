import type { Meta, StoryObj } from '@storybook/react';
import { RDU_Button } from './Button.tsx';
import { FaBeer, FaRocket } from 'react-icons/fa';

const meta: Meta<typeof RDU_Button> = {
    title: 'Components/Button',
    component: RDU_Button,
    tags: ['autodocs'],
    argTypes: {
        className:{
            control: { type: 'text' },
        }

    },
};

export default meta;

type Story = StoryObj<typeof RDU_Button>;

export const Primary: Story = {
    args: {
        text: 'Click me',
        variant: 'primary',
    },
};

export const SecondaryWithIcon: Story = {
    args: {
        text: 'Drink',
        variant: 'secondary',
        icon: <FaBeer />,
        iconPosition: 'left',
    },
};

export const TertiaryOnlyIcon: Story = {
    args: {
        variant: 'tertiary',
        icon: <FaRocket />,
        iconPosition: 'only',
        ariaLabel: 'Launch',
    },
};
