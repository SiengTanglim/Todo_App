import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import MainStack from './MainStack';
import { navigationRef } from '../services/navigate';
import { deepLink } from '../services/config/deeplink';

const Route = () => {
  // const home = useAppSelector((state) => state.home)
  // const dispatch = useAppDispatch();
  // const no_connection = useAppSelector(
  //   (state) => state.no_connection,
  // );

  // React.useEffect(() => {
    // const inter = setInterval(() => {
    //   const unsubscribe = NetInfo.addEventListener(
    //     (state: { isConnected: any }) => {
    //       if (!state.isConnected) {
    //         dispatch({ type: CONNECTION, value: true });
    //       } else {
    //         dispatch({ type: CONNECTION, value: false });
    //       }
    //     },
    //   );
    //   unsubscribe();
    // }, 1000);

  //   if (no_connection) {
  //     clearInterval(inter);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   const init = async () => {
  //     if (home == null) loadData(dispatch);
  //   };

  //   init().finally(async () => {
  //     if (home) {
  //       await RNBootSplash.hide({ fade: true });
  //     }
  //   });
  // }, [home]);

  const linking = {
    prefixes: [deepLink.link, deepLink.url],
    config: {
      screens: {
        ProductDetail: {
          path: 'product/:id',
          parse: {
            id: (id: string) => id.replace(/^@/, ''),
          },
        },
      },
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default React.memo(Route);