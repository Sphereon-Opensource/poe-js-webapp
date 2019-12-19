<!-- eslint-disable vue/max-attributes-per-line vue/singleline-html-element-content-newline -->
<template>
  <s-card>
    <s-card-title>
      De pagina kan niet gevonden worden.
    </s-card-title>
    <s-card-text>
      <p>
        De opgevraagde pagina kan helaas niet gevonden worden. De pagina bestaat mogelijk niet, is verplaatst of verwijderd.<br>
        Klik <nuxt-link to="/" title="Home">hier</nuxt-link> om terug te keren naar de homepagina.
      </p>
    </s-card-text>
  </s-card>
</template>

<script>
  import SCard from '@/components/SCard';
  import SCardTitle from '@/components/SCardTitle';
  import SCardText from '@/components/SCardText';

  export default {
    name: 'Error404',

    components: { SCardText, SCardTitle, SCard }
  };
</script>
