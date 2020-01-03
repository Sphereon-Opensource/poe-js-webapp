<template>
  <div class="s-status">
    <v-chip
      v-for="(verification, key) in _verified"
      :key="key"
      class="mr-2 mb-2 verified"
    >
      {{ verification.name }}
      &nbsp;
      <i>
        Geregistreerd op {{ verification.blockchainEntry.timestamp | moment("dddd, D MMMM YYYY, HH:mm") }}
      </i>
    </v-chip>
    <v-chip
      v-for="(verification, key) in _notVerified"
      :key="key"
      class="mr-2 mb-2 not-verified"
    >
      {{ verification.name }}
    </v-chip>
  </div>
</template>

<script>
  import {truncate} from '@/assets/js/text';

  const itemWithName = (item, truncateLength) => ({
    ...item,
    name: truncate(item.file.name, truncateLength)
  });

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
      _verified() {
        return [...this.items]
          .filter(item => item.verified)
          .map(item => itemWithName(item, this.truncateLength))
          .sort((itemA, itemB) => itemA.blockchainEntry.timestamp - itemB.blockchainEntry.timestamp);
      },

      _notVerified() {
        return [...this.items]
          .filter(item => !item.verified)
          .map(item => itemWithName(item, this.truncateLength));
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/breakpoint.scss';

  .v-chip.verified {
    background-color: #4FE799;
  }
</style>
