import { useState } from 'react';

export default function useInput(initialValue = {}) {
  const [formState, setFormState] = useState(initialValue);

  function updateState(inputName, inputValue) {
    console.log('NAME: ', inputName, 'VALUE: ', inputValue);
    setFormState({
      ...formState,
      [inputName]: inputValue,
    });
    console.log('NEW STATE: ', formState);
    return formState;
  }

  return {
    formState,
    reset: () => setFormState({}),
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
