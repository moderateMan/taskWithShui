import { useFields } from 'mui-eazy';

export default (useCreater: any, key: string, { defaultValues }: { defaultValues?: any }) => {
  const config = useCreater({ defaultValues:{ type:defaultValues.type,...defaultValues?.['components']?.[key] } });
  return useFields(config, {
    formPrefix: key,
  });
};
