import type { Meta, StoryObj } from '@storybook/react';

import { MessageList } from './messageList';

const meta: Meta<typeof MessageList> = {
  component: MessageList,
  title: 'MessageList',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SelfOnly: Story = {
  args: {
    messages: [
      {
        content: 'hoge',
        type: 'self',
      },
    ],
  },
};

export const OtherOnly: Story = {
  args: {
    messages: [
      {
        content: 'fuga',
        type: 'other',
      },
    ],
  },
};

export const IsOtherTyping: Story = {
  args: {
    messages: [],
    isOtherTyping: true,
  },
};
