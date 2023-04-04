import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import CheckboxInput from "./CheckboxInput";

type CheckBoxInput = {
  label: string;
  value: string;
};

type MultipleCheckboxInputsProps<T extends FieldValues> = {
  title: string;
  error?: FieldError;
  id: string;
  checkboxes: CheckBoxInput[];
  required?: boolean;
  register: UseFormRegister<T>;
};

const MultipleCheckboxInputs = <T extends FieldValues>({
  title,
  checkboxes,
  register,
  id,
  required = false,
  error,
}: MultipleCheckboxInputsProps<T>) => {
  return (
    <div className="flex select-none flex-col gap-1">
      <div className="text-primary">{title}</div>
      <div className="flex flex-col gap-2">
        {checkboxes.map(({ label, value }) => (
          <CheckboxInput
            key={value}
            id={id}
            label={label}
            error={error}
            value={value}
            register={register}
            required={required}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleCheckboxInputs;
