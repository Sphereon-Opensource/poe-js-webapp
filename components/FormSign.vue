<template>
  <div class="form-sign">
    <s-form
      v-model="fields"
      action="/path/to/api"
      @pre-submit="preSubmit"
      @submit="submit"
    >
      <v-text-field
        v-model="fields.email"
        :rules="rules.email"
        label="E-mailadres"
        prepend-icon="mdi-email"
      />
      <v-divider class="my-4" />
      <v-file-input
        v-model="fields.files"
        :rules="rules.files"
        label="Bestanden"
        multiple
        counter
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
        <v-divider class="my-4" />
        <s-drop-files v-model="fields.files" />
      </template>
      <v-divider class="my-4" />
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
          Bestanden uploaden
          <v-icon
            right
            size="24"
          >
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </template>
    </s-form>
    <v-expand-transition>
      <div v-if="verified.length || unverified.length">
        <div class="title primary--text mt-4">
          Status
        </div>
        <v-divider class="mt-1 mb-2" />
        <template v-if="verified.length">
          <div class="subtitle-1 mb-2">
            Bestanden ontvangen
          </div>
          <s-status
            :items="verified"
            :truncate-length="$vuetify.breakpoint.xsOnly ? 22 : Infinity"
          />
        </template>
        <template v-if="unverified.length">
          <v-divider
            v-if="verified.length"
            class="my-3"
          />
          <div class="subtitle-1 mb-2">
            Niet geverifieerde bestanden
          </div>
          <s-status
            :items="unverified"
            :truncate-length="$vuetify.breakpoint.xsOnly ? 22 : Infinity"
          />
        </template>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
  import SForm from '@/components/SForm';
  import SDropFiles from '@/components/SDropFiles';
  import SStatus from '@/components/SStatus';

  export default {
    name: 'FormSign',

    components: { SStatus, SDropFiles, SForm },

    data: () => ({
      fields: process.env.NODE_ENV === 'development' ? {
        email: `janedoe-${Date.now()}@softmedia.nl`,
        files: [ new File([], `test-${Date.now()}.pdf`) ]
      } : {
        email: '',
        files: []
      },

      rules: {
        email: [
          v => !!v || 'Voer een e-mailadres in',
          v => /.+@.+\..+/.test(v) || 'Voer een geldig e-mailadres in'
        ],

        files: [
          v => !!v.length || 'Selecteer minimaal één bestand',
          v => v.length <= 5 || 'Maximaal vijf bestanden toegestaan'
        ]
      },

      verified: [],
      unverified: []
    }),

    methods: {
      preSubmit() {
        this.verified = [];
        this.unverified = [];
      },

      submit(response) {
        // TODO: handle response
        console.log(response);

        this.verified = [ ...this.fields.files.slice(1) ];
        this.unverified = [ ...this.fields.files.slice(0, 1) ];
      }
    }
  }
</script>
