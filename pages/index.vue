<template>
  <layout-home>
    <h1 :class="[ $vuetify.breakpoint.xsOnly ? 'display-1' : 'display-3', 'font-weight-bold mb-4 white--text' ]">
      {{ _title }}
    </h1>
    <p class="body-1 tertiary--text">
      This is meant as a demo-page for those interested in Blockchain as a
      technology. It is a real-life Blockchain demo, which allows you to upload,
      free-of-charge, up to 5 objects at a time.
    </p>
    <v-row
      justify="center"
      class="mx-md-n4 mx-lg-n8"
    >
      <v-col
        v-for="item in blocks"
        :key="item.title"
        sm="6"
        class="d-flex px-md-4 px-lg-8"
      >
        <s-card>
          <div
            v-if="$vuetify.breakpoint.smAndUp"
            class="icon mb-2"
          >
            <s-avatar
              :src="item.icon"
              :width="140"
              :height="140"
              color="primary"
            />
          </div>
          <s-card-title
            :icon="$vuetify.breakpoint.xsOnly && item.icon"
            class="primary--text"
          >
            {{ item.title }}
          </s-card-title>
          <s-card-text>
            {{ item.text }}
          </s-card-text>
          <s-card-actions>
            <v-btn
              :to="item.to"
              :block="$vuetify.breakpoint.xsOnly"
              rounded
              color="tertiary"
              class="px-12 py-6 black--text"
            >
              Starten
            </v-btn>
          </s-card-actions>
        </s-card>
      </v-col>
    </v-row>
  </layout-home>
</template>

<script>
  import LayoutHome from '@/components/LayoutHome';
  import SCard from '@/components/SCard';
  import SCardTitle from '@/components/SCardTitle';
  import SCardText from '@/components/SCardText';
  import SCardActions from '@/components/SCardActions';
  import SAvatar from '@/components/SAvatar';

  export default {
    components: {SAvatar, SCardActions, SCardText, SCardTitle, SCard, LayoutHome},

    data: () => {
      const menuItems = [];

      if (!process.env.disableSign) {
        menuItems.push({
          icon: '/sign.svg',
          title: 'Vastleggen',
          text: `We just store a unique cryptographic key that represents the digital objects.
    It is important to understand that the files themselves are not stored in the Blockchain.`,
          to: '/vastleggen'
        });
      }

      if (!process.env.disableVerify) {
        menuItems.push({
          icon: '/blockchange/verify.svg',
          title: 'Verifiëren',
          text: `We just store a unique cryptographic key that represents the digital objects.
    This guarantees your privacy and confidentiality.`,
          to: '/verifieren'
        });
      }

      return ({
        blocks: menuItems
      });
    },

    computed: {
      _title() {
        return process.env.main_title;
      }
    },

    head: () => ({
      title: 'Document Sign',
      meta: [
        {hid: 'description', name: 'description', content: 'Document Sign'}
      ]
    })
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/breakpoint.scss';

  .s-card {
    @include breakpoint(sm-and-up) {
      margin-top: 70px;
    }

    .icon {
      position: relative;

      padding-top: 48px;

      .s-avatar {
        position: absolute;
        bottom: 0;
        left: 50%;

        transform: translate(-50%, 0);
      }
    }
  }
</style>
