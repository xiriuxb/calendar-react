import React, { useEffect, useMemo, useState } from "react";

export const useForm = <T extends object>(
  initialForm: T,
  formValidations?: { [key: string]: any }
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formErrors, setFormErrors] = useState<{ errors: {[key:string]:any}}>({errors:{} });

  useEffect(() => {
    if(!!formValidations){
      createValidators();
    }
  }, [formState]);
  
  
  useEffect(()=>{
    setFormState(initialForm);
  },[initialForm])
  
  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const createValidators = () => {
    if(!formValidations){
      return;
    }
    const formCheckValues:{[key:string]:any} = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      const formVal = formState[formField as keyof T] as string;
      formCheckValues[`${formField}`] = !fn(formVal) 
        ? errorMessage
        : '';
    }
    setFormErrors({ errors: formCheckValues });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const validForm = useMemo(() => {
    if (Array.from(Object.values(formErrors.errors)).some(val => val != "")) {
      return false;
    }
    return true;
  }, [formErrors]);

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    errors: formErrors.errors,
    validForm,
  };
};
