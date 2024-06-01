const useError = (error) => {
    if (error) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center p-4 border border-red-400 bg-red-100 rounded-lg">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-2 text-red-600">{error.message}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return null;
  };
  
  export default useError;