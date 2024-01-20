'use client';

import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import notify from 'src/common/utils/notify';
import { TabView } from './tabView';
import { FormConfig } from 'src/muiEazy';
import { FormView } from './formView'

export type FromRefType = UseFormReturn<
  {
    [key: string]: any;
  },
  any,
  undefined
>;

export interface TabFormRef {
  validate: (formArr: FromRefType[]) => Promise<boolean>;
  getTabFormRef: () => Record<PropertyKey, FromRefType>
}
// ----------------------------------------------------------------------
export default memo(forwardRef(function DealFormView({ tabConfig, tabId, handleTabChange }: {
  tabId: string,
  tabConfig: {
    id: string;
    label: string;
    node: FormConfig;
  }[],
  handleTabChange: (tabId: string) => void
}, ref) {
  const formMapRef = useRef<Record<PropertyKey, FromRefType>>({});
  const [errorResult, setErrRes] = useState<boolean[]>([]);
  const validate = async (formArr: FromRefType[]) => {
    let checkArr = formArr!.map((item) => {
      return item!.trigger();
    });
    const resArr = await Promise.all(checkArr);
    setErrRes(resArr);
    if (
      resArr.some((item) => {
        return !item;
      })
    ) {
      notify.error('error')
      return false;
    }
    return true
  }

  useImperativeHandle(ref, () => {
    return {
      validate,
      getTabFormRef: () => {
        return formMapRef.current
      }
    };
  }, [tabConfig]);
  const tabsNode = useMemo(() => {
    let result: {
      id: string;
      label: string;
      node: React.ReactNode;
    }[] = [];
    for (let i in tabConfig) {
      const item = tabConfig[i]
      result.push({
        id: item.id,
        label: item.label,
        node: <FormView id={item.id} formRef={formMapRef} formConfig={item.node} />
      })
    }
    return result
  }, [tabConfig])
  return (
    <TabView
      errorResult={errorResult}
      tabId={tabId}
      handleTabChange={handleTabChange}
      tabs={tabsNode}
    />
  );
}))


