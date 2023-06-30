interface TextInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: React.ReactNode;
  iconOnClick?: () => void;
  bg?: string;
  classes?: string;
}

export default function TextInput({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  iconOnClick,
  bg,
  classes,
}: TextInputProps) {
  return (
    <div className={`relative ${classes}`}>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        className={`transition-300 w-full rounded-sm border border-grey2 bg-black p-4 text-white outline-none placeholder:text-grey1 focus:border-grey1 xl:px-5 
                    ${icon ? 'pr-14' : ''} ${bg}`}
      />
      {icon && (
        <div
          onClick={iconOnClick}
          className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer'
        >
          {icon}
        </div>
      )}
    </div>
  );
}
