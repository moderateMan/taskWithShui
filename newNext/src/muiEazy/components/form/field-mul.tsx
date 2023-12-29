import { IconButton, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormConfig, FormConfigItem, useGetField } from '../../hooks';
import { uuidv4 } from '../../utils';
import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

export type FieldMulProps = {
  name: string;
  mulFromConfig?: FormConfig | FormConfigItem;
  mulType?: 'one' | 'obj';
  placeholder?: string;
};

export default function FieldMul(props: FieldMulProps) {
  const { name, mulFromConfig, mulType = 'one', placeholder } = props;
  const { setValue, getValues, unregister, register } = useFormContext();
  const { control } = useFormContext();
  let value = getValues(name);
  const [arr, setArr] = useState([{ id: uuidv4(), label: name }]);
  useEffect(() => {
    value &&
      Array.isArray(value) &&
      setArr(
        value?.map?.(() => {
          return { id: uuidv4(), label: name };
        })
      );
  }, []);
  const getField = useGetField();
  let comp;
  const fields = useMemo(() => {
    return arr.map((entity, index) => {
      const { id, label } = entity;
      let itemName = placeholder || `${name}.${index}`;
      let fields: any;
      if (mulType == 'one') {
        ;
        fields = mulFromConfig ? getField(itemName, mulFromConfig) : getField(itemName, props);
        comp = (
          <Stack
            sx={{
              marginBottom: '10px',
            }}
            direction="row"
            key={id}
          >
            {fields}
            <IconButton
              sx={{
                width: '51px',
              }}
              onClick={(_) => {
                if (arr.length <= 1) {
                  return;
                }
                let temp = [...arr];
                const targetId = arr.findIndex((item) => {
                  return item.id === id;
                });
                temp.splice(targetId, 1);
                let formValue = [...getValues(name)];
                // unregister所有
                unregister(`${name}`, {
                  keepDefaultValue: false,
                  keepDirty: false,
                });
                register(`${name}`);
                // 删除值
                formValue.splice(targetId, 1);
                formValue.forEach((value, index) => {
                  setValue(`${name}.${index}`, value);
                });
                setArr(temp);
              }}
            >
              <Iconify icon={'icon-park-outline:delete'} />
            </IconButton>
            <IconButton
              sx={{
                width: '51px',
              }}
              onClick={(_) => {
                setArr([...arr, { id: uuidv4(), label }]);
              }}
            >
              <Iconify icon={'icon-park-outline:add'} />
            </IconButton>
          </Stack>
        );
      } else if (mulFromConfig) {
        fields = Object.entries(mulFromConfig).map(([key, value]) => {
          (value as any).name = `${itemName}.${key}`;
          return (
            <Stack
              key={(value as any).name}
              sx={{
                mb: 2,
                width: '100%',
              }}
              direction="row"
            >
              {getField(`${itemName}.${key}`, value)}
            </Stack>
          );
        });
        comp = (
          <Stack key={id}>
            {fields}
            <Stack
              sx={{
                mb: 2,
              }}
              direction="row"
            >
              <IconButton
                sx={{}}
                onClick={(_) => {
                  if (arr.length <= 1) {
                    return;
                  }
                  let temp = [...arr];
                  const targetId = arr.findIndex((item) => {
                    return item.id === id;
                  });
                  temp.splice(targetId, 1);
                  let formValue = [...getValues(name)];
                  // // unregister所有
                  // formValue.forEach((_, index) => {
                  //   unregister(`${name}.${index}`);
                  // });
                  // 删除值
                  formValue.splice(targetId, 1);
                  // formValue.forEach((_, index) => {
                  //   register(`${name}.${index}`);
                  // });
                  setValue(name, formValue);
                  setArr(temp);
                }}
              >
                <Iconify icon={'icon-park-outline:delete'} />
              </IconButton>
              <IconButton
                onClick={(_) => {
                  setArr([...arr, { id: uuidv4(), label }]);
                }}
              >
                <Iconify icon={'icon-park-outline:add'} />
              </IconButton>
            </Stack>
          </Stack>
        );
      } else {
        return <>error</>;
      }
      return comp;
    });
  }, [arr, mulFromConfig]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ fieldState: { error } }) => {
          ;
          return (
            <>
              {fields}
              {(error?.root?.message || error?.message) && (
                <div
                  style={{
                    color: '#FF5630',
                    lineHeight: 1.5,
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    textAlign: 'left',
                    marginRight: '14px',
                    marginBottom: '0',
                    marginLeft: '14px',
                  }}
                >
                  {error?.message || error?.root?.message}
                </div>
              )}
            </>
          );
        }}
      />
    </>
  );
}
