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
  register: UseFormRegister<T>;
};

const MultipleCheckboxInputs = <T extends FieldValues>({
  title,
  checkboxes,
  register,
  id,
  error,
}: MultipleCheckboxInputsProps<T>) => {
  return (
    <div className="flex select-none flex-col gap-3">
      <div className="text-primary">{title}</div>
      {checkboxes.map(({ label, value }) => (
        <CheckboxInput
          key={value}
          id={id}
          label={label}
          error={error}
          value={value}
          register={register}
        />
      ))}
    </div>
  );
};

export default MultipleCheckboxInputs;
