import { useState } from 'react';

const FormInput = (props) => {
  const [isBlured, setIsBlured] = useState(false);
  const { label, errorMessage, ...inputProps } = props;

  return (
    <div className="flex flex-col gap-2">
      <label
        className="transition-all font-bold capitalize "
        htmlFor="username"
      >
        {label}
      </label>
      <input
        className="p-4 border-[2px] border-gray-400 outline-2 outline-blue-400 rounded-md valid:border-green-600 "
        {...inputProps}
        onBlur={() => setIsBlured(true)}
        blured={isBlured.toString()}
      />
      <span className="text-red-400 hidden">{errorMessage}</span>
    </div>
  );
};
export default FormInput;
