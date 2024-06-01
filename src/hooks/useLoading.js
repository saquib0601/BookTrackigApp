import { TailSpin } from 'react-loader-spinner';

const useLoading = (isLoading) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height={80} width={80} color="blue" ariaLabel="loading" />
      </div>
    );
  }
  return null;
};

export default useLoading;
