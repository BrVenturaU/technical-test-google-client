export const getError = (error) => {
    const errorMessage = "Error en el API, intente de nuevo.";
  
    if (!error.response) {
      console.error(`API ${error.config.url} not found`);
      return errorMessage;
    }
    if (process.env.NODE_ENV === "development") {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    }
    if (error.response.data && error.response.data.status === 'fail') {
      return error.response.data.message;
    }
  
    return errorMessage;
  };
  