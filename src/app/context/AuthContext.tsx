import { createContext, useState, type ReactNode } from "react";
import { localStorageKeys } from "../config/constants";
import type { User } from "../entities/User";

interface AuthProviderProps {
  children: ReactNode;
}


interface AuthStorage {
  signedIn: boolean;
  signIn: (access_token: string) => void;
  signOut: () => void;
  user?: User & {
    org: {
      id: string;
      image_url: string;
      name: string;
    };
  };
  setUser: (user: User & { org_id?: string }) => void;
  setOrg: (props: { imgUrl: string; orgId: string; name: string }) => void;
}

export const AuthContext = createContext<AuthStorage>({} as AuthStorage);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User & { org: { id: string; image_url: string; name: string } } | undefined>(undefined);

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storedAccessToken;
  });

  const signIn = (access_token: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, access_token);
    setSignedIn(true);
  }

  const signOut = () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }

  const setOrg = (props: { imgUrl: string; orgId: string; name: string }) => {
   if(user) {
    setUser(prev => {
      if(!prev) return prev;
      return {
        ...prev,
        org: {
          id: props.orgId,
          image_url: props.imgUrl,
          name: props.name
        }
      }
    })
   }
  }

  const setUserFn = (user: User & { org_id?: string }) => {
    setUser({
      ...user,
      org: {
        id: user.org_id || '',
        image_url: '',
        name: ''
      }
    })
  }

  const value: AuthStorage = { signedIn, signIn, signOut, setOrg, setUser: setUserFn, user };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};