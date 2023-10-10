import { useState, useCallback, ChangeEvent } from "react";

interface Dictionary<T>{
  [key: string]: T;
}

export function useFormAndValidation() {
  const [values, setValues] = useState<Dictionary<string>>({});
  const [errors, setErrors] = useState<Dictionary<string>>({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    const form: HTMLFormElement | null = e.target.closest("form");
    if (form) setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}