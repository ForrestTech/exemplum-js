import { signIn, useSession } from "next-auth/react";
import { ComponentType, FC } from "react";
import { Loader } from "./Components/LoadingWrapper/LoadingWrapper";

export const withAuthRequired = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return function WithAuthenticationRequired(props: P): JSX.Element {
    const { status } = useSession();

    if (status === "unauthenticated") {
      signIn();
    }

    if (status === "authenticated") {
      return <Component {...props} />;
    }

    return <Loader />;
  };
};
