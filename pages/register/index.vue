<template>
  <layout-one>
    <template v-slot:left>
      <s-card class="mx-sm-3 mx-md-6 mx-lg-12">
        <s-card-title
          icon="/sign.svg"
          class="primary--text"
        >
          register
        </s-card-title>
        <s-card-text>
          We just store a unique cryptographic digital key that represents the digital objects. It
          is important to understand that the files themselves are not stored in the Blockchain
          or any of our systems for that matter.
        </s-card-text>
        <form-sign />
      </s-card>
    </template>
    <template v-slot:right>
      <h1 class="display-2 font-weight-bold mb-4">
        Sign your digital documents
      </h1>
      <p class="body-1 primary--text">
        {{ process.env.main_text }}
      </p>
      <h2 class="title font-weight-bold">
        Process documents
      </h2>
      <p class="body-1">
        Use Sphereon as a Gateway to process documents and unstructured
        data and integrate these with Ethereum, Factom, HyperLedger,
        MultiCoin, VeChain, etc, to create immutable and independent
        verifiable records of transactions and Proof of Authenticity of
        documents, emails and other information objects.
      </p>
      <h2 class="title font-weight-bold">
        Proof authenticity
      </h2>
      <p class="body-1">
        Digitally sign documents, data and other digital assets to proof
        authenticity so everybody can trust all your (business) transactions.
        Use Sphereon as a Gateway to process documents and unstructured
        data and integrate these with Ethereum, Factom, HyperLedger,
        MultiCoin, VeChain, etc, to create immutable and independent
        verifiable records of transactions and Proof of Authenticity.
      </p>
    </template>
  </layout-one>
</template>

<script>
  import LayoutOne from '@/components/LayoutOne';
  import SCard from '@/components/SCard';
  import SCardTitle from '@/components/SCardTitle';
  import SCardText from '@/components/SCardText';
  import FormSign from '@/components/FormSign';

  export default {
    components: { FormSign, SCardText, SCardTitle, SCard, LayoutOne },

    head: () => ({
      title: 'register - Document Sign',
      meta: [
        { hid: 'description', name: 'description', content: 'Document Sign' }
      ]
    })
  }
</script>
