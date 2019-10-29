import { useState } from 'react';

export default function useInput() {
  const [formState, setFormState] = useState({});

  function updateState(inputName, inputValue) {
    setFormState({
      ...formState,
      [inputName]: inputValue,
    });
    return formState;
  }

  return {
    formState,
    // setting input props based off the input element's name
    bind: (name) => ({
      value: formState[name],
      onChange: (event) => {
        const { name: inputName, value: inputValue } = event.target;
        updateState(inputName, inputValue);
      },
    }
    ),
  };
}
