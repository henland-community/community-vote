import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { PageLayout } from '../components/PageLayout';

export default {
  title: 'Layouts/Page',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PageLayout>;

export const Empty = () => <PageLayout></PageLayout>;
Empty.args = {};

export const Long = () => <PageLayout>
  <div style={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3000px' }}>stuff</div>
</PageLayout>;
Empty.args = {};
