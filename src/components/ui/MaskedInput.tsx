import MaskedInput from 'react-text-mask';

export const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
export const CNPJ_MASK = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
export const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export const CEP_MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

interface CustomMaskedInputProps {
  mask: any;
  value?: string;
  onChange: (e: any) => void;
  className?: string;
  placeholder?: string;
  name?: string;
  onBlur?: (e: any) => void;
}

export const CustomMaskedInput: React.FC<CustomMaskedInputProps> = ({ 
  mask, value, onChange, className, placeholder, name, onBlur 
}) => {
  return (
    <MaskedInput
      mask={mask}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      className={className}
      placeholder={placeholder}
      guide={false}
    />
  );
};
