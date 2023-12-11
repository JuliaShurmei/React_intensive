import { useState, ChangeEvent } from 'react';

interface UseInputProps {
  initialValue: string;
}

interface UseInputReturn {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useInput = ({ initialValue }: UseInputProps): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
