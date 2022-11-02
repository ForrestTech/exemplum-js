import { signIn, useSession } from "next-auth/react";
import { ComponentType, FC } from "react";

export const withAuthRequired = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return function WithAuthenticationRequired(props: P): JSX.Element {
    const { status } = useSession();

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
      signIn();
    }

    return <Component {...props} />;
  };
};
