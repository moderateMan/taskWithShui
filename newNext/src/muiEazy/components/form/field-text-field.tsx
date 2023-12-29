import { useFormContext, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

export type FieldTextProps = TextFieldProps & {
  name: string;
};

export default function FieldText({
  name,
  helperText,
  type,
  defaultValue,
  ...other
}: FieldTextProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
