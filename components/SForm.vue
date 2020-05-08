<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    novalidate
    @submit.prevent="submit"
  >
    <slot/>
    <slot
      name="alert"
      :error="error"
    >
      <v-alert
        v-model="error"
        type="error"
        text
        transition="fade-transition"
      >
        An error occurred, please try again. <br />(error details can be found in the browser's development console)
      </v-alert>
    </slot>
    <slot
      name="action"
      v-bind="{ disabled, submitting }"
    >
      <v-btn
        :disabled="disabled"
        :loading="submitting"
        type="submit"
      >
        Versturen
      </v-btn>
    </slot>
  </v-form>
</template>

<script>
  import isEqual from 'lodash/isEqual';
  import {loadVerifiableCredential} from "@/services/credentialFile";
  import {verifyCredential} from "@/services/verify";

  export default {
    name: 'SForm',

    props: {
      value: {
        type: Object,
        default: () => ({})
      },

      action: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        fields: this.value,
        valid: false,
        submitting: false,
        error: false
      };
    },

    computed: {
      _action() {
        return this.action.startsWith('/') ? this.action.replace(/^\/+/, '') : this.action;
      },

      disabled() {
        return !this.valid;
      }
    },

    watch: {
      value(value) {
        this.fields = value;
      },

      fields(value) {
        !isEqual(value, this.value) && this.$emit('input', value);
      }
    },

    methods: {
      submit: async function () {
        this.error = false;

        this.$emit('pre-submit');

        if (!this.$refs.form.validate()) {
          return;
        }

        this.submitting = true;

        try {
          const vcObjects = await Promise.all(
            this.fields.files
            .map(async file => {
              return  await loadVerifiableCredential(file);
            })
          );

          const verifications = await Promise.all(
            vcObjects.map(async vcObject => {
              return await verifyCredential(vcObject);
            })
          );
          this.$emit('submit', verifications);
          this.$refs.form.reset();
        } catch (error) {
          /* eslint-disable-next-line */
          console.error(!!error && error.toString());

          this.error = true;
        }

        this.submitting = false;

        this.$emit('post-submit');
      }
    }
  }
</script>
