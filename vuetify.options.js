import LRU from 'lru-cache';
import colors from 'vuetify/lib/util/colors';

const isProduction = process.env.NODE_ENV === 'production';

const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60
});

export default {
  theme: {
    options: {
      themeCache,
      minifyTheme: value => isProduction ? value.replace(/[\r\n|\r|\n]/g, '') : value,
      customProperties: true
    },
    themes: {
      light: {
        anchor: '#4fe799',
        primary: '#5000ff',
        secondary: '#1f2041',
        tertiary: '#4fe799',
        accent: colors.blue.accent1,
        error: colors.red.accent2,
        info: colors.blue.base,
        success: colors.green.base,
        warning: colors.amber.base
      }
    }
  }
}
