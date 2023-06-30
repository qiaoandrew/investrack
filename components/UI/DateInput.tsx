export interface DateType {
  month: string;
  day: string;
  year: string;
}

interface DateInputProps {
  label: string;
  value: DateType;
  setValue: (value: DateType) => void;
  margin?: string;
}

export default function DateInput({
  label,
  value,
  setValue,
  margin,
}: DateInputProps) {
  return (
    <div className={`text-white ${margin}`}>
      <p className='mb-3 font-medium'>{label}</p>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          className='transition-300 w-[52px] rounded-xs border border-grey2 bg-grey3 px-2.5 py-2 text-center outline-none placeholder:text-grey1 focus:border-grey1'
          placeholder='MM'
          value={value.month}
          onChange={(e) => {
            if (
              e.target.value.length <= 2 &&
              (!isNaN(parseInt(e.target.value)) || e.target.value === '')
            ) {
              setValue({
                ...value,
                month: e.target.value,
              });
            }
          }}
        />
        /
        <input
          type='text'
          className='transition-300 w-[52px] rounded-xs border border-grey2 bg-grey3 px-2.5 py-2 text-center outline-none placeholder:text-grey1 hover:border-grey1'
          placeholder='DD'
          value={value.day}
          onChange={(e) => {
            if (
              e.target.value.length <= 2 &&
              (!isNaN(parseInt(e.target.value)) || e.target.value === '')
            ) {
              setValue({
                ...value,
                day: e.target.value,
              });
            }
          }}
        />
        /
        <input
          type='text'
          className='transition-300 w-16 rounded-xs border border-grey2 bg-grey3 px-2.5 py-2 text-center outline-none placeholder:text-grey1 hover:border-grey1'
          placeholder='YYYY'
          value={value.year}
          onChange={(e) => {
            if (
              e.target.value.length <= 4 &&
              (!isNaN(parseInt(e.target.value)) || e.target.value === '')
            ) {
              setValue({
                ...value,
                year: e.target.value,
              });
            }
          }}
        />
      </div>
    </div>
  );
}
