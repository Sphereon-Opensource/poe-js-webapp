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
        label="E-mail address"
        prepend-icon="mdi-email"
      />
      <v-divider class="my-4"/>
      <v-file-input
        v-model="fields.files"
        :rules="rules.files"
        label="Files"
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
          Upload files
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
      <div v-if="verified.length || pending.length || unverified.length">
        <div class="title primary--text mt-4">
          Status
        </div>
        <v-divider class="mt-1 mb-2"/>
        <template v-if="verified.length">
          <div class="subtitle-1 mb-2">
            Files registered
          </div>
          <s-status
            :items="verified"
            :truncate-length="$vuetify.breakpoint.xsOnly ? 22 : Infinity"
          />
        </template>
        <template v-if="pending.length">
          <div class="subtitle-1 mb-2">
            Files pending
          </div>
          <s-status
            :items="pending"
            :truncate-length="$vuetify.breakpoint.xsOnly ? 22 : Infinity"
          />
        </template>
        <template v-if="unverified.length">
          <v-divider
            v-if="verified.length"
            class="my-3"
          />
          <div class="subtitle-1 mb-2">
            Files rejected
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

  components: {SStatus, SDropFiles, SForm},

  data: () => ({
    fields: process.env.NODE_ENV === 'development' ? {
      email: `janedoe-${Date.now()}@softmedia.nl`,
      files: [new File([], `test-${Date.now()}.pdf`)],
      operation: "register"
    } : {
      email: '',
      files: [],
      operation: "register"
    },

    rules: {
      email: [
        v => !!v || 'Enter a valid email address',
        v => /.+@.+\..+/.test(v) || 'Enter a valid email address'
      ],

      files: [
        v => !!v.length || 'Select at least one file.',
        v => v.length <= 5 || 'A maximum of 5 files is allowed.'
      ]
    },

    verified: [],
    pending: [],
    unverified: []
  }),

  methods: {
    preSubmit() {
      this.verified = [];
      this.pending = [];
      this.unverified = [];
    },

    submit() {
      const fields = this.fields;
      fields.files.forEach(file => {
        fields.bcResponses.forEach(bcResponse => {
          if (bcResponse.requestId != file.name) return;

          if (isState(bcResponse, "REGISTERED")) {
            this.verified.push(file)
          } else if (isState(bcResponse, "PENDING")) {
            this.pending.push(file)
          } else {
            this.unverified.push(file)
          }
        })
      })
    }
  }
}

function isState(bcResponse, value) {
  return (value == bcResponse.registrationState)
    || (value == bcResponse.singleProofChain.registrationState)
    || (value == bcResponse.perHashProofChain.registrationState)
}
</script>
