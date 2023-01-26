import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";

type baseClass = {
  id: string;
  name: string;
};

type Props<T extends baseClass> = {
  name: string;
  label: string;
  options?: T[];
  value?: T[];
  isDisabled: boolean;
  isLoading: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AutoCompleteFields = <T extends baseClass>({
  name,
  label,
  options,
  value,
  isDisabled,
  isLoading,
  handleChange,
}: Props<T>) => {
  const handleOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T
  ) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

  const isIdEqual = (option: T, value: T): boolean => value.id === option.id;
  const getLabelName = (option: T): string => option.name;

  const handleOnChange = (_: React.ChangeEvent<{}>, selectedValues: T[]) =>
    handleChange({
      target: {
        name: name,
        value: selectedValues,
      },
    } as any);

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`} />
  );

  return (
    <Autocomplete
      multiple
      data-testid={`${name}-search`}
      disablePortal
      loading={isLoading}
      options={options || []}
      isOptionEqualToValue={isIdEqual}
      value={value}
      filterSelectedOptions={true}
      disabled={isDisabled || !options}
      getOptionLabel={getLabelName}
      renderOption={handleOptions}
      onChange={handleOnChange}
      renderInput={renderInput}
    />
  );
};
