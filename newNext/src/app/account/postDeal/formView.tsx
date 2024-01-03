'use client';

import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { merge } from 'lodash-es';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import notify from 'src/common/utils/notify';
import storageHelper from 'src/common/utils/storageHelper';
import useHashParams from 'src/routes/hooks/use-hash-params';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import { DealEntity, DealStatus, DealType } from 'src/types/deal';
import { BusinessFormView } from './components/formViewSections/businessFormView';
import { DealBasicsFormView } from './components/formViewSections/dealBasicsFormView';
import { DealTypeView } from './components/formViewSections/dealTypeFormView';
import { FaqFromView } from './components/formViewSections/faqFromView';
import { MarketFormView } from './components/formViewSections/marketFormView';
import { MediaFormView } from './components/formViewSections/mediaFormView';
import { TabView } from './components/tabView';
import { useBoolean } from 'src/muiEazy';
import PostDealTipModal from './components/post-deal-tip-modal';
import { Modal } from 'src/muiEazy';

export type FromRefType = UseFormReturn<
  {
    [key: string]: any;
  },
  any,
  undefined
>;
// ----------------------------------------------------------------------
export default function DealFormView() {
  const router = useRouter();
  const {
    targetType: type,
    currentDeal,
    setCurrentDeal,
    createDraftAct,
    queryDealByIdAct,
    submitDraftAct,
    updateDraftAct,
  } = useFlatInject('dealStore');
  const query = useSearchParams();
  const getHashData = useHashParams();
  let id = query.get('id') || getHashData().id;
  const formRef_dealType = useRef<FromRefType>();
  const formRef_dealBasic = useRef<FromRefType>();
  const formRef_market = useRef<FromRefType>();
  const formRef_business = useRef<FromRefType>();
  const formRef_media = useRef<FromRefType>();
  const formRef_faq = useRef<FromRefType>();
  const allFormRef = useRef<FromRefType[]>();
  const [errorResult, setErrRes] = useState<boolean[]>([]);
  allFormRef.current = [
    formRef_dealBasic.current!,
    formRef_business.current!,
    formRef_market.current!,
    formRef_media.current!,
    formRef_faq.current!,
  ];
  useEffect(() => {
    if (!id) {
      setTabId('1');
    }
  }, [id]);
  const [dealId, setDealId] = useState(id || NaN);
  const [tabId, setTabId] = useState(query.get('tabId') || getHashData().tabId || '1');
  useEffect(() => {
    if (dealId) {
      queryDealByIdAct({
        id: Number(id),
      });
    } else {
      storageHelper.removeItem('DEAL_ID');
      setCurrentDeal(null);
    }
  }, [dealId]);

  const defaultValues =
    id && currentDeal ? currentDeal : { type: DealType.CAPITAL_RAISING, components: {} };

  const tabConfig = useMemo(() => {
    return [
      {
        id: '1',
        label: 'Deal Type',
        node: <DealTypeView formRef={formRef_dealType} defaultValues={defaultValues} />,
      },
      {
        id: '2',
        label: 'Deal Basics',
        node: (
          <DealBasicsFormView
            type={type}
            formRef={formRef_dealBasic}
            defaultValues={defaultValues}
          />
        ),
      },
      {
        id: '3',
        label: 'Business Details',
        node: (
          <>
            <BusinessFormView formRef={formRef_business} defaultValues={defaultValues} />
          </>
        ),
      },
      {
        id: '4',
        label: 'Market & Competition',
        node: <MarketFormView formRef={formRef_market} defaultValues={defaultValues} />,
      },
      {
        id: '5',
        label: 'Uploads & Media',
        node: (
          <>
            <MediaFormView formRef={formRef_media} defaultValues={defaultValues} />
          </>
        ),
      },
      {
        id: '6',
        label: 'FAQs',
        node: <FaqFromView formRef={formRef_faq} defaultValues={defaultValues} />,
      },
    ].filter((item) => {
      if (
        item.label == 'Business Details' ||
        item.label == 'FAQs' ||
        item.label === 'Market & Competition'
      ) {
        if ([DealType.PARTNERSHIPS, DealType.SELL_A_BUSINESS].includes(type)) {
          return false;
        }
      }
      return true;
    });
  }, [type]);

  const handleSubmit = async (type: 'SUBMIT' | 'DRAFT' | 'UPDATE' = 'DRAFT') => {
    if (tabId == '1' && !id) {
      let req = {} as any;
      [formRef_dealType.current].forEach((item) => {
        req = { ...req, ...item!.getValues() };
      });
      const data = await createDraftAct(req);
      notify.success('Draft Deal Success!');
      storageHelper.setItem('DEAL_ID', data.payload.content[0].id);
      window.location.hash = '#id=' + data.payload.content[0].id + '&tabId=2';
      setDealId(data.payload.content[0].id);
      setTabId('2');
    } else {
      let checkArr = allFormRef.current!.map((item) => {
        return item!.trigger();
      });
      const resArr = await Promise.all(checkArr);
      setErrRes(resArr);
      if (
        resArr.some((item) => {
          return !item;
        })
      ) {
        return notify.error('error');
      }
      let result = {};
      allFormRef.current!.forEach((item) => {
        let values = item!.getValues();
        result = merge(result, values);
      });
      let dealBody: DealEntity = {
        ...currentDeal!,
        ...result,
        id: id,
      };
      if (type == 'SUBMIT') {
        await submitDraftAct(dealBody);
        notify.success('Submit Deal Success!');
      } else {
        await updateDraftAct(dealBody);
        notify.success('Update Deal Success!');
      }
    }
  };

  const open = useBoolean(true);
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Post a Deal
      </Typography>
      <Stack
        sx={{
          width: '100%',
        }}
        flexDirection={'row'}
        justifyContent={'end'}
      >
        <Button
          sx={{
            mr: 4,
            padding: '0 20px',
            fontWeight: '700',
          }}
          onClick={() => {
            router.push(paths.marketplace.preview + '/' + id);
          }}
        >
          Preview
        </Button>
        <Button
          sx={{
            width: '180px',
            fontWeight: '700',
          }}
          variant="contained"
          onClick={() => {
            handleSubmit('SUBMIT');
          }}
        >
          Submit for approval
        </Button>
      </Stack>

      {currentDeal?.status === DealStatus.REJECTED && (
        <Alert severity="warning" sx={{ mb: 3, mt: 3 }}>
          {currentDeal?.reject_reason}
        </Alert>
      )}

      <TabView
        errorResult={errorResult}
        tabId={tabId}
        handleTabChange={(newTabId) => {
          if (query.get('id') || getHashData().id) {
            setTabId(newTabId);
          }
        }}
        tabs={tabConfig}
      />
      <Stack
        sx={{
          width: '100%',
        }}
        flexDirection={'row'}
        justifyContent={'end'}
      >
        <Button
          onClick={() => {
            router.push(paths.account.deals);
          }}
          sx={{ mr: 4 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            handleSubmit();
          }}
        >
          Save
        </Button>
      </Stack>
      <Modal
        title={''}
        actionConfig={[]}
        content={() => {
          return (
            <Box>
              <Typography
                sx={{
                  color: 'var(--Scaling-Blue, #256CCB)',
                  textAlign: 'center',
                  fontSize: '32px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '48px',
                  mb: '8px',
                }}
                textAlign={'center'}
              >
                Congrats!
              </Typography>
              <Typography
                sx={{
                  color: 'var(--Scaling-Black, #141414)',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '48px',
                  mb: '8px',
                }}
              >
                Your Deal has been submitted for approval.
              </Typography>
              <Typography
                sx={{
                  color: 'var(--Scaling-Grey2, #696969)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  mb: '8px',
                }}
              >
                The Scaling team are now reviewing your deal submission.. If you have any questions
                please don’t hesitate to reach out.
              </Typography>
              <Stack
                sx={{
                  mt: '32px',
                }}
                justifyContent={'center'}
                direction={'row'}
              >
                <Button
                  sx={{
                    margin: '0 12px',
                  }}
                  variant="contained"
                >
                  Return to Scaling
                </Button>
                <Button
                  sx={{
                    margin: '0 12px',
                  }}
                >
                  FAQ
                </Button>
              </Stack>
            </Box>
          );
        }}
      />
      {!id && <PostDealTipModal open={open.value} onClose={() => open.onFalse()} />}
    </>
  );
}
