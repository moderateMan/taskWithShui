import { useMemo } from 'react';
import storageHelper from 'src/common/utils/storageHelper';
import { FormConfig } from 'src/muiEazy';
import { useFlatInject } from 'src/service';
import { DealFileComponentType } from 'src/service/model';
import { FileType } from 'src/service/model/appStoreModel';

export const useFormConfig = ({
  defaultValues,
  type,
}: {
  id?: string;
  defaultValues?: any;
  type?: string;
}): FormConfig => {
  const { getUploadUrlAct } = useFlatInject('dealStore');
  return useMemo<FormConfig>(() => {
    return {
      attachments: {
        label: 'Upload documents (optional)',
        type: 'upload',
        defaultValue: defaultValues?.['attachments'],
        fieldConfig: {
          multiple: true,
          accept: {},
          uploadAction: async (file: File) => {
            const {
              payload: { fileUrl },
            } = await getUploadUrlAct({
              content_type: file.type,
              component_type: DealFileComponentType.DEAL_ATTACHMENT_FILE,
              file_name: file.name,
              file_size: file.size,
              id: storageHelper.getItem('DEAL_ID'),
              type: FileType.DealPic,
              file,
            });
            return fileUrl;
          },
        },
      },
      linkedin: {
        defaultValue: defaultValues?.components?.media?.linkedin,
        label: 'LinkedIn (optional)',
        name: 'components.media.linkedin',
      },
      facebook: {
        defaultValue: defaultValues?.components?.media?.facebook,
        label: 'Facebook (optional)',
        name: 'components.media.facebook',
      },
      instagram: {
        defaultValue: defaultValues?.components?.media?.instagram,
        label: 'Instagram (optional)',
        name: 'components.media.instagram',
      },
    };
  }, [defaultValues]);
};
