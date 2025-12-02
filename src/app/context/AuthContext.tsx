import { createContext, useCallback, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import SplashScreen from "../../components/SplashScreen";
import { localStorageKeys } from "../config/constants";
import { UserRole, type User } from "../entities/User";
import { useAccount } from "../hooks/queries/useAccount";
import { StorageManager } from "../lib/StorageManager";
import { Service } from "../service/service";

interface AuthProviderProps {
  children: ReactNode;
}

export type UserDataContext = User & {
  org: { id: string; image_url: string; name: string };
};

interface AuthStorage {
  signedIn: boolean;
  signIn: (access_token: string) => void;
  signOut: () => void;
  user?: UserDataContext;
  setUser: (user: User & { org_id?: string }) => void;
  setOrg: (props: { imgUrl: string; orgId: string; name: string }) => void;
  isOwner: (role?: UserRole) => boolean;
  isAdmin: (role?: UserRole) => boolean;
  isWaiter: (role?: UserRole) => boolean;
  isMe: (id: string) => boolean;
}

export const AuthContext = createContext<AuthStorage>({} as AuthStorage);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDataContext | undefined>(() => {
    return StorageManager.loadUser();
  });

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = StorageManager.loadToken();
    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess, loadAccount } = useAccount({ enabled: false });

  const setupAuth = useCallback(
    async (token: string) => {
      Service.setAccessToken(token);
      if(user?.org.id) {
        Service.setOrgId(user.org.id);
      }
      await loadAccount();
    },
    [loadAccount, user],
  );

  useLayoutEffect(() => {
    async function loadTokens() {
      const token = StorageManager.loadToken();
      if (!token) {
        StorageManager.clearStorage();
        Service.removeAccessToken();
        Service.removeOrgId();
        signOut();
        return;
      }

      await setupAuth(token);
    }
    loadTokens();
  }, [loadAccount])

  const signIn = (access_token: string) => {
    StorageManager.saveToken(access_token);
    setupAuth(access_token);
    setSignedIn(true);
  };

  const signOut = () => {
    StorageManager.clearStorage();
    Service.removeAccessToken();
    Service.removeOrgId();
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

    StorageManager.saveUser(user_data);
    
    setUser(user_data);
  };

  const isOwner = (role?: UserRole) => {
    return role === UserRole.OWNER;
  }

  const isAdmin = (role?: UserRole) => {
    return role === UserRole.ADMIN;
  }


  const isWaiter = (role?: UserRole) => {
    return role === UserRole.WAITER;
  }


  const isMe = (id: string) => {
    return user?.id === id;
  }

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
    isMe, 
    isOwner,
    isAdmin,
    isWaiter,
  };

  return (
    <AuthContext.Provider value={value}>
      <SplashScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
