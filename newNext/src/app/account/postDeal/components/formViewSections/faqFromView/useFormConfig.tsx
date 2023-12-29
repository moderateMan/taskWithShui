import { useMemo } from 'react';
import { FormConfig } from 'src/muiEazy';
import { FromWrapper } from '../../wrapper';

export const useFormConfig = ({
  defaultValues,
  type,
}: {
  id?: string;
  defaultValues?: any;
  type?: string;
}): FormConfig => {
  return useMemo<FormConfig>(() => {
    return {
      faq: {
        name: 'components.faq',
        label: 'Upload documents (optional)',
        type: 'multiple',
        defaultValue: defaultValues?.['components']?.['faq'],
        fieldConfig: {
          mulType: 'obj',
          mulFromConfig: {
            question: {
              label: 'Question (optional)',
            },
            answer: {
              label: 'Answer (optional)',
              multiline: true,
              minRows: 4,
            },
          } as FormConfig,
        },
        wrapper: ({ children }) => {
          return (
            <FromWrapper
              name="FAQs"
              tipInfo="Anticipate questions from potential partners or investors and provide answers.
              This helps clarify common queries upfront."
            >
              {children}
            </FromWrapper>
          );
        },
      },
    };
  }, [defaultValues]);
};
