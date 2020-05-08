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
        label="Files"
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
          Verifify files
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
        <v-divider class="mt-1 mb-2" />
        <div class="subtitle-1 mb-2">
          Verified files
        </div>
        <s-status
          :items="verified"
          :truncate-length="$vuetify.breakpoint.xsOnly ? 22 : Infinity"
        />
        </div>
        <div v-if="notVerified.length">
          <v-divider class="mt-1 mb-2"/>
          <div class="subtitle-1 mb-2">
            Rejected files
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
  import { base64StringToBlob } from 'blob-util';

  const base64TestFile = "ewogICJAY29udGV4dCI6IFsKICAgICJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsCiAgICAiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiCiAgXSwKICAiaWQiOiAiaHR0cDovL2V4YW1wbGUuZ292L2NyZWRlbnRpYWxzLzM3MzIiLAogICJ0eXBlIjogWwogICAgIlZlcmlmaWFibGVDcmVkZW50aWFsIiwKICAgICJVbml2ZXJzaXR5RGVncmVlQ3JlZGVudGlhbCIKICBdLAogICJpc3N1ZXIiOiAiZGlkOnYxOnRlc3Q6bnltOno2TWt2U2Jzcm00NFZuaG5nYnlXMnJaazJ1OWJ2U1BVU21Kd3FZak1kNFJTSlQ3QSIsCiAgImlzc3VhbmNlRGF0ZSI6ICIyMDIwLTAzLTEwVDA0OjI0OjEyLjE2NFoiLAogICJjcmVkZW50aWFsU3ViamVjdCI6IHsKICAgICJpZCI6ICJkaWQ6ZmFjdG9tOjVkMGRkNTg3NTcxMTlkZDQzN2M3MGQ5MmI0NGZiZjg2NjI3ZWUyNzVmMGYyMTQ2YzNkOTllNDQxZGEzNDJkOWYiLAogICAgImRlZ3JlZSI6IHsKICAgICAgInR5cGUiOiAiQmFjaGVsb3JEZWdyZWUiLAogICAgICAibmFtZSI6ICJCYWNoZWxvciBvZiBTY2llbmNlIGFuZCBBcnRzIgogICAgfQogIH0sCiAgInByb29mIjogewogICAgInR5cGUiOiAiRWQyNTUxOVNpZ25hdHVyZTIwMTgiLAogICAgImNyZWF0ZWQiOiAiMjAyMC0wNC0yNVQxMToyNToxNVoiLAogICAgImp3cyI6ICJleUpoYkdjaU9pSkZaRVJUUVNJc0ltSTJOQ0k2Wm1Gc2MyVXNJbU55YVhRaU9sc2lZalkwSWwxOS4uVEpYdVhXNWcxb044Y3NsSm1waXZfQUNCLWoyLWN4cXlFRHBKa08zSGZYWWgxb29jTU5raUhvSDYtcDhTR2VWN0VBNlpwc25YV0lMdzB6dGVNUVY3RHciLAogICAgInByb29mUHVycG9zZSI6ICJhc3NlcnRpb25NZXRob2QiLAogICAgInZlcmlmaWNhdGlvbk1ldGhvZCI6ICJkaWQ6djE6dGVzdDpueW06ejZNa3ZTYnNybTQ0Vm5obmdieVcyclprMnU5YnZTUFVTbUp3cVlqTWQ0UlNKVDdBI3o2TWtqRmhSdmJYZmptUThpRkhlWWg0MmNOUzd2NEN0Z3VMenZ3WlNYY0hlOHpxeSIKICB9Cn0K";

  export default {
    name: 'FormVerify',

    components: {SStatus, SDropFiles, SForm},

    data: () => ({
      fields: process.env.NODE_ENV === 'development' ? {
        files: [new File([ base64StringToBlob(base64TestFile, "application/json") ], `UniversityDegreeCredentialV1.json`)]
      } : {
        files: []
      },

      rules: {
        files: [
          v => !!v.length || 'Select at least one file.',
          v => v.length <= 10 || 'A maximum of ten files is allowed.'
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
