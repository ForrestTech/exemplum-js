const Empty = () => <div className="dark:text-white">Empty</div>;

interface LoadingFailedProps {
  error: { message?: string };
}

const LoadingFailed = ({ error }: LoadingFailedProps) => {
  if (error.message) {
    return <div>{error.message}</div>;
  }
  return <div>Loading failed</div>;
};

export const Loader = () => (
  <svg
    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

interface LoadingWrapperProps<T> {
  isLoading: boolean;
  error: { message?: string } | undefined | null;
  data: T[] | T | undefined;
  children: JSX.Element | JSX.Element[] | string | undefined;
}

const LoadingWrapper = <T,>({
  isLoading,
  error,
  data,
  children,
}: LoadingWrapperProps<T>) => (
  <>
    {isLoading && <Loader />}
    {error && <LoadingFailed error={error} />}
    {!error && data && children}
    {!error && data && Array.isArray(data) && data.length === 0 && <Empty />}
  </>
);

export default LoadingWrapper;
