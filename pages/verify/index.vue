<template>
  <layout-two>
    <template v-slot:left>
      <h1 class="display-2 font-weight-bold mb-4">
        Verify your digital documents
      </h1>
      <p class="body-1 primary--text">
        This is meant as a demo-page for those interested in Blockchain as a
        technology. It is a real-life Blockchain demo, which allows you to
        upload, free-of-charge, up to 5 objects at a time.
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
    </template>
    <template v-slot:right>
      <s-card class="mx-sm-3 mx-md-6 mx-lg-12">
        <s-card-title
          icon="/verify.svg"
          class="primary--text"
        >
          Verify
        </s-card-title>
        <s-card-text>
          We just store a unique cryptographic digital key that represents the digital objects. It
          is important to understand that the files themselves are not stored in the Blockchain
          or any of our systems for that matter.
        </s-card-text>
        <form-verify />
      </s-card>
    </template>
  </layout-two>
</template>

<script>
  import LayoutTwo from '@/components/LayoutTwo';
  import SCard from '@/components/SCard';
  import SCardTitle from '@/components/SCardTitle';
  import SCardText from '@/components/SCardText';
  import FormVerify from '@/components/FormVerify';

  export default {
    components: { FormVerify, SCardText, SCardTitle, SCard, LayoutTwo },

    head: () => ({
      title: 'Verify - Document Sign',
      meta: [
        { hid: 'description', name: 'description', content: 'Verify your digital documents' }
      ]
    })
  }
</script>
