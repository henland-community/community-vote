import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SyncMenu } from '../components/SyncMenu';

export default {
  title: 'Components/SyncMenu',
  component: SyncMenu,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    synced: { control: 'boolean' },
    admin: { control: 'boolean' },
    open: { control: 'boolean' },
  },
} as ComponentMeta<typeof SyncMenu>;

const Template: ComponentStory<typeof SyncMenu> = (args) => <div style={{ padding: '30px', background: 'whitesmoke', display: 'flex', justifyContent: 'flex-end' }}>
  <SyncMenu {...args} />
 </div> ;

export const Unsynced = Template.bind({});
Unsynced.args = {
  synced: false,
  open: true,
};

export const Synced = Template.bind({});
Synced.args = {
  synced: true,
  open: true,
};

export const SyncedAdmin = Template.bind({});
SyncedAdmin.args = {
  synced: true,
  admin: true,
  open: true,
};
