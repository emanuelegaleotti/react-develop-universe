import type {Meta, StoryObj} from '@storybook/react';
import {RDU_Card} from './card/card.tsx';
import {RDU_CardHeader} from "./card-header/card-header.tsx";
import {RDU_CardFooter} from "./card-footer/card-footer.tsx";
import {RDU_Button} from "../buttons/button/Button.tsx";
import {RDU_CardBody} from "./card-body/card-body.tsx";

const meta: Meta<typeof RDU_Card> = {
    title: 'Components/Card',
    component: RDU_Card,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_Card>;

export const Default: Story = {
    render: () => {
        return (
            <RDU_Card>
                <RDU_CardHeader>
                    Card title
                </RDU_CardHeader>
                <RDU_CardBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ea eos nihil nostrum
                        perspiciatis repudiandae saepe? Ab doloribus ea, error explicabo in ipsum iure nihil qui quia
                        repudiandae. Ad aperiam architecto assumenda commodi consectetur, deserunt distinctio dolorem
                        doloribus esse harum hic itaque maiores maxime necessitatibus nemo nihil odio officiis quo
                        similique suscipit tenetur, ullam veniam voluptatum. Ab architecto aspernatur deleniti
                        dignissimos dolore, dolores ea eaque, ipsa ipsum magnam magni nemo nobis nostrum officia
                        officiis omnis praesentium quaerat quisquam repellat temporibus ut vel, velit? Alias amet, eius,
                        ex excepturi facere harum libero maxime modi nihil officia quasi quo saepe sed voluptatem.</p>
                </RDU_CardBody>
                <RDU_CardFooter>
                    <RDU_Button type={"button"} variant={'primary'} text={'Submit'}/>
                    <RDU_Button type={"button"} variant={'secondary'} text={'Cancel'}/>
                </RDU_CardFooter>
            </RDU_Card>
        );
    }
};
