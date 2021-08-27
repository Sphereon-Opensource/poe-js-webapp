<template>
  <layout-content>
    <s-card>
      <div class="lrow">
        <s-card-title class="lcolumn">
          Contact
        </s-card-title>
        <a
          href="https://www.sphereon.com"
          target="_blank"
          title="Sphereon.com"
          class="logo"
        >
          <s-logo class="column marinTop"
                  :src="sphereonLogo"
                  :width="220"
                  :height="15"
                  alt="Sphereon"
          />
        </a>
      </div>
      <s-card-text>
        <p>For more information about our products & solutions please visit our main website <a href="https://sphereon.com/" target="_blank">sphereon.com</a>.
        </p>
      </s-card-text>
    </s-card>
  </layout-content>
</template>
<script>


import LayoutContent from '@/components/LayoutContent';
import SCard from '@/components/SCard';
import SCardTitle from '@/components/SCardTitle';
import SCardText from '@/components/SCardText';
import SLogo from '@/components/SLogo';

export default {
  components: {SCardText, SCardTitle, SCard, LayoutContent, SLogo},

  head: () => ({
    title: 'Contact - Document Sign',
    meta: [
      {hid: 'description', name: 'description', content: 'Document Sign'}
    ]
  }),

  computed: {
    sphereonLogo() {
      return '/sphereon-zwart.svg';
    }
  },

}
</script>

<style lang="scss" scoped>
.lrow::after {
  content: "";
  clear: both;
  display: table;
}

.lcolumn {
  float: left;
  padding-left: 5px;
  padding-right: 20px;
}

.marinTop {
  margin-top: -3px;
}
</style>
