import React from 'react';
import { Field, ErrorMessage } from 'formik';
import 'app/components/FormField/FormField.css';

interface FormFieldType {
  label?: string;
  placeholder: string;
  name: string;
  type: string;
  errors: any;
  touched: any;
  disabled?: boolean;
  as?: string;
  value?: string;
}

const FormField = (props: FormFieldType) => {
  const {
    label,
    placeholder,
    name,
    type,
    errors,
    touched,
    disabled,
    as,
    value,
  } = props;
  const isInvalid = errors[name] && touched[name];
  const hasValue = value && value.trim().length > 0;

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {hasValue === undefined ? (
        <Field
          placeholder={placeholder}
          name={name}
          type={type}
          disabled={disabled}
          as={as}
          onKeyPress={handleKeyUp}
          className={
            'form-group form-control form-control-lg' +
            (isInvalid ? ' is-invalid' : '')
          }
        />
      ) : (
        <Field
          placeholder={placeholder}
          name={name}
          type={type}
          disabled={disabled}
          as={as}
          onKeyPress={handleKeyUp}
          value={value}
          className={
            'form-group form-control form-control-lg' +
            (!hasValue && isInvalid ? ' is-invalid' : '')
          }
        />
      )}

      {!hasValue && (
        <ErrorMessage
          name={name}
          component="div"
          className="invalid-feedback"
        />
      )}
    </div>
  );
};

export default FormField;
