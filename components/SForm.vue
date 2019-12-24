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

  const {FactomCli} = require('factom');
  const crypto = require('crypto');

  const cli = new FactomCli({
    host: 'localhost',
    port: 8088,
    path: '/v2',
    debugPath: '/debug',
    protocol: 'http',
    rejectUnauthorized: true,
    timeout: 5000,
    retry: {
      retries: 3,
      factor: 2,
      minTimeout: 500,
      maxTimeout: 2000
    }
  });

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
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(this.fields.files[0]);
          const bytes = await new Promise((resolve) => {
            fileReader.onload = function () {
              resolve(fileReader.result);
            };
          });

          // const bytes = await new Promise((resolve, reject) => {
          //   var sum = crypto.createHash('sha256');
          //   var fileStream = this.fields.files[0].stream();
          //   fileStream.on('error', (err) => {
          //     reject(err);
          //   });
          //   fileStream.on('data', (chunk) => {
          //     try {
          //       sum.update(chunk)
          //     } catch (ex) {
          //       reject(ex);
          //     }
          //   });
          //   fileStream.on('end', function () {
          //     resolve(sum.digest('hex'));
          //   });
          // });

          // const bytes = await this.fields.files[0].arrayBuffer();

          console.log(Buffer.from(bytes, 'hex'));
          console.log(Buffer.from(bytes).toString('ascii'));
          console.log(Buffer.from(Buffer.from(bytes).toString('ascii'), 'ascii'));

          // console.log('Expected hash', '1317d6d71426b952017a59a168bfdcd3ce36fed2ea4d95aaac190699e8c72884');

          crypto.createHash('sha256');
          // const hasher = crypto.createHash('sha256');
          // const hash = hasher.update(bytes.toString('ascii')).digest('hex');
          // console.log('Bytes of hash', hash);

          const chainId = '8ca31a136b6ecd1c16796fdef401dc471e822730dd112a21e63da3d985634143';

          const chainEntries = await cli.getAllEntriesOfChain(chainId);
          const matchingEntries = chainEntries
            .map(entry => entry.extIds)
            .map(extIds => extIds[2])
            .filter(extId => !!extId)
            // .forEach(console.log);
            .filter(extId => extId.toString('ascii') === Buffer.from(bytes).toString('ascii'));
          console.log(matchingEntries);

          // const response = await this.$axios.$get('', {}, {
          //   headers: {
          //     'Content-Type': 'multipart/formdata'
          //   }
          // });

          const response = {};

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
