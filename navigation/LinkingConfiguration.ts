import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: 'Login',
      Register: 'Register',
      Warehouse: 'Warehouse',
      NotFound: '*',
    },
  },
};
