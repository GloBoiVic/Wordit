import { Input, Textarea } from '@nextui-org/react';
// import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface TextInputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  // register: UseFormRegister<any>;
  // registerOptions?: RegisterOptions;
  // error?: FieldError;
  as?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const TextInputField = ({
  name,
  label,
  placeholder,
  // register,
  // registerOptions,
  // error,
  as,
  ...props
}: TextInputFieldProps) => {
  if (as === 'textarea') {
    // return <Textarea {...props} label={label} labelPlacement="outside" placeholder={placeholder} {...register(name)} />;
    return <Textarea {...props} label={label} labelPlacement="outside" placeholder={placeholder} name={name} />;
  }
  return (
    <>
      <Input
        {...props}
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        name={name}
        // {...register(name)}
        // isInvalid={!!error}
      />
      {/* {error?.message && <p className="mt-1 text-xs text-red-500">{error?.message}</p>} */}
    </>
  );
};

export default TextInputField;
