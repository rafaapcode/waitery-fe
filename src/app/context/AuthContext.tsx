import { createContext, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import SplashScreen from "../../components/SplashScreen";
import { localStorageKeys } from "../config/constants";
import type { User } from "../entities/User";
import { useAccount } from "../hooks/queries/useAccount";

interface AuthProviderProps {
  children: ReactNode;
}

type UserDataContext = User & {
  org: { id: string; image_url: string; name: string };
};

interface AuthStorage {
  signedIn: boolean;
  signIn: (access_token: string) => void;
  signOut: () => void;
  user?: UserDataContext;
  setUser: (user: User & { org_id?: string }) => void;
  setOrg: (props: { imgUrl: string; orgId: string; name: string }) => void;
}

export const AuthContext = createContext<AuthStorage>({} as AuthStorage);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDataContext | undefined>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.STORAGE_USER
    );
    if (storedAccessToken) {
      return JSON.parse(storedAccessToken) as UserDataContext;
    }
    return undefined;
  });

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess } = useAccount({});

  const signIn = (access_token: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, access_token);
    setSignedIn(true);
  };

  const signOut = () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.STORAGE_USER);
    setSignedIn(false);
  };

  const setOrg = (props: { imgUrl: string; orgId: string; name: string }) => {
    if (user) {
      const user_data = {
        ...user,
        org: {
          id: props.orgId,
          image_url: props.imgUrl,
          name: props.name,
        },
      };

      localStorage.setItem(
        localStorageKeys.STORAGE_USER,
        JSON.stringify(user_data)
      );

      setUser(user_data);
    }
  };

  const setUserFn = (user: User & { org_id?: string }) => {
    const user_data: UserDataContext = {
      ...user,
      org: {
        id: user.org_id || "",
        image_url: "",
        name: "",
      },
    };

    localStorage.setItem(
      localStorageKeys.STORAGE_USER,
      JSON.stringify(user_data)
    );
    
    setUser(user_data);
  };

  useEffect(() => {
    if (isError && signedIn) {
      toast.error("Sua sessão expirou.");
      signOut();
    }
  }, [isError, signOut]);

  const value: AuthStorage = {
    signedIn: isSuccess && signedIn,
    signIn,
    signOut,
    setOrg,
    setUser: setUserFn,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      <SplashScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
