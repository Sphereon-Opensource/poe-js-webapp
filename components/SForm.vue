<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    novalidate
    @submit.prevent="submit"
  >
    <slot />
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
        Er is een onbekende fout opgetreden, probeer het nogmaals.
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

  import { getFormData } from '@/assets/js/form';

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
      async submit() {
        this.error = false;

        this.$emit('pre-submit');

        if (!this.$refs.form.validate()) {
          return;
        }

        this.submitting = true;

        try {
          const formData = getFormData(this.fields);

          const response = await this.$axios.$post(this._action, formData, {
            headers: {
              'Content-Type': 'multipart/formdata'
            }
          });

          this.$emit('submit', response);

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
