import { uid } from '@/assets/js/uid';

export const state = () => ({
  mainNav: [
    {
      name: 'Zo werkt het!',
      to: '/zo-werkt-het'
    },
    {
      name: 'Meer informatie',
      to: '/informatie'
    },
    {
      name: 'Contact',
      to: '/contact'
    }
  ].map(value => ({ ...value, _uid: uid() }))
});
