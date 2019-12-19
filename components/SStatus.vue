<template>
  <div class="s-status">
    <v-chip
      v-for="(item, key) in _items"
      :key="key"
      class="mr-2 mb-2"
    >
      {{ item.name }}
    </v-chip>
  </div>
</template>

<script>
  import { truncate } from '@/assets/js/text';

  export default {
    name: 'SStatus',

    props: {
      items: {
        type: Array,
        required: true
      },

      truncateLength: {
        type: Number,
        default: 22
      }
    },

    computed: {
      _items() {
        return [ ...this.items ].map(item => ({
          ...item,
          name: truncate(item.name, this.truncateLength)
        }));
      }
    }
  }
</script>
