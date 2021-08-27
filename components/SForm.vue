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
        Something bad happened, please try again...
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

import {BcProofService} from "../services/bcproof/bcProofService";

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

      const bcProofService = new BcProofService();
      try {
        const signResponses = await Promise.all(
          this.fields.files
            .map(async file => {
              switch (this.fields.operation) {
                case "register":
                  return await bcProofService.registerFile(this.fields, file);
                case "verify":
                  return await bcProofService.verifyFile(this.fields, file);
              }
            })
        );
        const self = this;
        self._data.fields["bcResponses"] = [];
        signResponses.forEach(data => {
          self._data.fields.bcResponses.push(data);
        })

        this.$emit('submit');
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
