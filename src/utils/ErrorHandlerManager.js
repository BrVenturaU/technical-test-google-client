export const getError = (error) => {
    const errorMessage = "Error en el API, intente de nuevo.";
  
    if (!error.response) {
      console.log(error)
      console.error(`API not found or ${error.message}`);
      return errorMessage;
    }
    if (process.env.NODE_ENV === "development") {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    }
    if (error.response.data && error.response.data.status === 'fail') {
      return {
        message: error.response.data.message,
        errors: error.response.data.body
      };
    }
  
    return errorMessage;
  };
  