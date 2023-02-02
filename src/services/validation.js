export const validateInput = (inputValue) => {
  if (!inputValue || inputValue.trim() === "") {
    return {
      error: true,
      message: "Por favor, ingrese una tarea!",
    };
  }
  return {
    error: false,
    message: "",
  };
};

export const validateMaxInput = (input) => {
  if (input.length > 100) {
    return {
      error: true,
      message: "Una tarea no debe tener mas de 100 caracteres.",
    };
  }
  return {
    error: false,
    message: "",
  };
};
