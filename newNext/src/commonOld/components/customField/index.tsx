'use client';
import { IconButton, Stack } from '@mui/material';
import {
  FormConfig,
  FormConfigItem,
  Iconify,
  notify,
  useFormContext,
  useGetField,
  uuidv4,
} from 'src/muiEazy';
import { useEffect, useMemo, useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  formConfig: FormConfig | FormConfigItem;
  type?: 'one' | 'obj';
};

export default function customField(props: Props) {
  const { name, formConfig, type = 'one' } = props;
  const { setValue, getValues } = useFormContext();
  let value = getValues(name);
  const [arr, setArr] = useState([{ id: uuidv4(), label: name }]);
  useEffect(() => {
    value &&
      setArr(
        value?.map?.(() => {
          return { id: uuidv4(), label: name };
        })
      );
  }, [value]);
  const getField = useGetField();

  const fields = useMemo(() => {
    return arr.map((entity, index) => {
      const { id, label } = entity;
      let itemName = `${name}.${index}`;
      let fields: any;
      let comp;
      if (type == 'one') {
        fields = getField([itemName, formConfig], itemName + '.' + index);
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
                  return notify.warn('at least one!');
                }
                let temp = [...arr];
                ;
                const targetId = arr.findIndex((item) => {
                  return item.id === id;
                });
                temp.splice(targetId, 1);
                let formValue = [...getValues(name)];
                formValue.splice(targetId, 1);
                setValue(name, formValue);
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
      } else {
        fields = Object.entries(formConfig).map(([key, value]) => {
          (value as any).name = itemName + '.' + key;
          return (
            <Stack
              sx={{
                mb: 2,
              }}
              direction="row"
            >
              {getField([key, value], (value as any).name)}
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
                    return notify.warn('at least one!');
                  }
                  let temp = [...arr];
                  const targetId = arr.findIndex((item) => {
                    return item.id === id;
                  });
                  temp.splice(targetId, 1);
                  let formValue = [...getValues(name)];
                  formValue.splice(targetId, 1);
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
      }
      return comp;
    });
  }, [arr, formConfig]);
  return <>{fields}</>;
}
