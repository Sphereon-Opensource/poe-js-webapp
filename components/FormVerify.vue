<template>
  <div class="form-verify">
    <s-form
      v-model="fields"
      action="http://example.com/api"
      @pre-submit="preSubmit"
      @submit="submit"
    >
      <v-file-input
        v-model="fields.files"
        :rules="rules.files"
        label="Bestanden"
        multiple
        counter
        chips
        :truncate-length="$vuetify.breakpoint.smAndUp ? 22 : 16"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            close
            @click:close="fields.files.splice(index, 1)"
          >
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-divider class="my-4"/>
        <s-drop-files v-model="fields.files"/>
      </template>
      <v-divider class="my-4"/>
      <template v-slot:action="{ disabled, submitting }">
        <v-btn
          :disabled="disabled"
          :loading="submitting"
          :block="$vuetify.breakpoint.xsOnly"
          type="submit"
          color="primary"
          class="mt-4"
          large
          rounded
        >
          Bestanden verifiëren
          <v-icon
            right
            size="24"
          >
            mdi-fingerprint
          </v-icon>
        </v-btn>
      </template>
    </s-form>
    <v-expand-transition>
      <div v-if="verified.length || notVerified.length">
        <div class="title primary--text mt-4">
          Status
        </div>
        <div v-if="verified.length">
          <v-divider class="mt-1 mb-2"/>
          <div class="subtitle-1 mb-2">
            Geverifieerde bestanden
          </div>
          <s-status
            :items="verified"
            :truncate-length="$vuetify.breakpoint.xsOnly ? 22 : Infinity"
          />
        </div>
        <div v-if="notVerified.length">
          <v-divider class="mt-1 mb-2"/>
          <div class="subtitle-1 mb-2">
            Niet geverifieerde bestanden
          </div>
          <s-status
            :items="notVerified"
            :truncate-length="$vuetify.breakpoint.xsOnly ? 22 : Infinity"
          />
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
  import SForm from '@/components/SForm';
  import SDropFiles from '@/components/SDropFiles';
  import SStatus from '@/components/SStatus';

  export default {
    name: 'FormVerify',

    components: {SStatus, SDropFiles, SForm},

    data: () => ({
      fields: process.env.NODE_ENV === 'development' ? {
        files: [new File([], `test-${Date.now()}.pdf`)]
      } : {
        files: []
      },

      rules: {
        files: [
          v => !!v.length || 'Selecteer minimaal één bestand',
          v => v.length <= 5 || 'Maximaal vijf bestanden toegestaan'
        ]
      },

      verified: [],

      notVerified: [],
    }),

    methods: {
      preSubmit() {
        this.verified = [];
        this.notVerified = [];
      },

      submit(response) {
        this.verified = response
          .filter(verification => verification.verified);

        this.notVerified = response
          .filter(verification => !verification.verified);
      }
    }
  }
</script>
