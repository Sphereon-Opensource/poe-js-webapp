<template>
  <div class="s-status">
    <v-card
      v-for="(verification, key) in _verified"
      :key="key"
      class="mr-2 mb-2 verified"
    >
      <div>
        <img class="badge-image" v-bind:src="'data:image/png;base64,' + verification.base64"/>
      </div>
      <div class="badge-info">
        <p v-if="verification.openbadges.badge && verification.openbadges.assertion">
          <b>
            <a target="_blank" v-bind:href="verification.openbadges.assertion.id">
              {{ verification.openbadges.badge.name }}
            </a>
          </b>
        </p>
        <p v-if="verification.openbadges.issuer">
          Uitgegeven door: <a target="_blank" v-bind:href="verification.openbadges.issuer.id">{{
          verification.openbadges.issuer.name }}</a>
        </p>
        <p v-if="verification.openbadges.assertion">
          <i>
            Geregistreerd op {{ verification.blockchainEntry.timestamp | moment("dddd, D MMMM YYYY, HH:mm") }}
          </i>
        </p>
      </div>
    </v-card>
    <v-card
      v-for="(verification, key) in _notVerified"
      :key="key"
      class="mr-2 mb-2 not-verified"
    >
      <p>
        {{ verification.name }}
      </p>
    </v-card>
  </div>
</template>

<script>
  import {truncate} from '@/assets/js/text';

  const itemWithName = (item, truncateLength) => ({
    ...item,
    name: truncate(item.name, truncateLength)
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

  .v-card.verified {
    display: flex;
    flex-direction: row;
    align-content: stretch;
    justify-content: flex-start;
    background-color: #4FE799;
  }

  .v-card.verified a {
    color: black;
    text-decoration: none;
  }

  .v-card.verified a:hover {
    text-decoration: underline;
  }

  .v-card.verified .badge-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .v-card.verified .badge-info p {
    margin: 0 0 0 10px;
  }

  .v-card.not-verified {
    background-color: rgba(255, 255, 0, 0.2);
  }

  .v-card.not-verified p {
    padding: 10px;
  }

  .badge-image {
    max-width: 100px;
  }
</style>
