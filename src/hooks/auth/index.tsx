import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { loadUser } from '../../redux/actions/User';
import { fetchAPI, MethodType } from '../api';
import { loadLessonData } from '../load_data';

interface userProps {
  user: any;
}
const AuthContext = createContext<userProps>(null!);

export function ProvideAuth({ children }: any) {
  const _auth = useProvideAuth();
  return <AuthContext.Provider value={_auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<any>(null);
  const dispatch = useAppDispatch();
  async function checkUser() {
    let token = await AsyncStorage.getItem('@token');
    if (token) {
      fetchAPI(MethodType.GET, 'user/profile').then(async (result: any) => {
          setUser(true);
          dispatch(loadUser(result.user));
          loadLessonData(dispatch,result.user)
      }).catch(async(_)=>{
        await AsyncStorage.removeItem('@token')
        loadLessonData(dispatch)
      });
    } else {
      setUser(false);
      loadLessonData(dispatch)
    }
  }

  useEffect(() => {
    checkUser();
  }, []);
  return {
    user,
  };
}