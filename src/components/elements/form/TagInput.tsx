import { useController, Control } from "react-hook-form";

interface TagInputProps {
  name: string;
  control: Control<any>;
  required?: boolean;
}

type TagProps = {
  tag: string;
  handleRemoveTag: (index: number) => void;
  index: number;
};

const TagInput = ({ name, control, required = false }: TagInputProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [] as string[],
    rules: { required },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      const newTag = e.currentTarget.value.trim();
      if (newTag !== "" && !value.includes(newTag)) {
        onChange([...value, newTag]);
        e.currentTarget.value = "";
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    onChange([...value.slice(0, index), ...value.slice(index + 1)]);
  };

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-white">
      <div className="capitalize">{name}</div>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          className={`box-ou borde h-10 w-full rounded-xl bg-secondary px-3 text-sm outline-none ${
            error ? "border-2 border-red-400" : "border-2 border-transparent"
          }`}
        />
        <div className={value.length > 0 ? "flex flex-wrap gap-3" : "hidden"}>
          {value.map((tag: string, index: number) => (
            <Tag
              key={index}
              index={index}
              handleRemoveTag={handleRemoveTag}
              tag={tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tag = ({ tag, handleRemoveTag, index }: TagProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleRemoveTag(index);
  };

  return (
    <button
      onClick={handleClick}
      className="select-none rounded-xl bg-slate-50 px-3 py-2 text-sm"
    >
      {tag}
    </button>
  );
};

export default TagInput;
