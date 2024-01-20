'use client';

import { Alert, Button, Divider, Stack, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import notify from 'src/common/utils/notify';
import storageHelper from 'src/common/utils/storageHelper';
import { useFields } from 'src/muiEazy';
import useHashParams from 'src/routes/hooks/use-hash-params';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import { DealEntity, DealStatus, DealType } from 'src/types/deal';
import {
  useFormConfig_1,
  useFormConfig_1_1,
  useFormConfig_Highlights,
  useFormConfig_Media,
  useFormConfig_ask,
  useFormConfig_baseOther,
  useFormConfig_detail,
  useFormConfig_faq,
  useFormConfig_nor,
  useFormConfig_team,
} from './form-config';
import AboutYouSection from './tabFormSections/aboutYouSection';
import InvestmentSection from './tabFormSections/investmentSection';
import MarketSection from './tabFormSections/marketSection';
import SubcategoriesSection from './tabFormSections/subcategoriesSection';
import YourCompanySection from './tabFormSections/yourCompanySection';
import { TabView } from './tabView';
import useFieldsNew from './useFieldsNew';
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: '600px',
  },
}));

// ----------------------------------------------------------------------
export default function DealFormView() {
  const router = useRouter();
  const {
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
  const { attachments, components = {} } =
    id && currentDeal ? currentDeal : ({ components: {} } as DealEntity);
  const { media, pics } = (components as any) || {};

  const defaultValues =
    id && currentDeal ? currentDeal : { type: DealType.CAPITAL_RAISING, components: {} };
  const detailCofig = useFormConfig_detail({
    defaultValues: defaultValues,
  });
  const [type, setType] = useState<DealType>(defaultValues?.type || DealType.CAPITAL_RAISING);
  ;
  const highLights = useFormConfig_Highlights({
    defaultValues: defaultValues,
  });

  const baseOther = useFormConfig_baseOther({
    defaultValues: {
      ...defaultValues,
      pics: pics || [],
      type,
    },
  });

  // dealType
  const typeConfig = useFormConfig_1({
    defaultValues: defaultValues,
  });
  const typeConfig0_1 = useFormConfig_1_1({
    defaultValues: defaultValues,
    type,
  });
  const { formNode: formNode0, methods: methods0 } = useFields(typeConfig);
  const { formNode: formNode0_1, methods: methods0_1 } = useFields(typeConfig0_1, {
    sx: {
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      },
    },
  });
  const baseFormRef = [methods0, methods0_1];
  const ask = useFormConfig_ask({
    type,
    defaultValues: defaultValues,
  });
  // Deal Basics
  const { formNode: formNode1_1, methods: methods1_1 } = useFields(detailCofig);
  const { formNode: formNode1_2, methods: methods1_2 } = useFields(highLights);
  const { formNode: formNode1_3, methods: methods1_3 } = useFields(ask);
  const { formNode: formNode1_4, methods: methods1_4 } = useFields(baseOther);
  // Business Details
  const { formNode: formNode2_1, methods: methods2_1 } = useFieldsNew(
    useFormConfig_nor,
    'executive_summary',
    { defaultValues: defaultValues }
  );
  const { formNode: formNode2_2, methods: methods2_2 } = useFieldsNew(
    useFormConfig_nor,
    'problem_to_be_solved',
    { defaultValues: defaultValues }
  );
  const { formNode: formNode2_3, methods: methods2_3 } = useFieldsNew(useFormConfig_nor, 'vision', {
    defaultValues: defaultValues,
  });
  const { formNode: formNode2_4, methods: methods2_4 } = useFieldsNew(
    useFormConfig_nor,
    'product',
    {
      defaultValues: defaultValues,
    }
  );
  const { formNode: formNode2_5, methods: methods2_5 } = useFieldsNew(
    useFormConfig_nor,
    'traction',
    {
      defaultValues: defaultValues,
    }
  );
  const { formNode: formNode2_6, methods: methods2_6 } = useFieldsNew(
    useFormConfig_nor,
    'business_model',
    {
      defaultValues: defaultValues,
    }
  );
  const { formNode: formNode2_7, methods: methods2_7 } = useFieldsNew(
    useFormConfig_nor,
    'funding',
    {
      defaultValues: defaultValues,
    }
  );
  const teamConfig = useFormConfig_team({ defaultValue: defaultValues });
  const { formNode: formNode2_8, methods: methods2_8 } = useFields(teamConfig);
  // Market & Competition
  const { formNode: formNode3_1, methods: methods3_1 } = useFieldsNew(
    useFormConfig_nor,
    'customers',
    {
      defaultValues: defaultValues,
    }
  );
  const { formNode: formNode3_2, methods: methods3_2 } = useFieldsNew(useFormConfig_nor, 'market', {
    defaultValues: defaultValues,
  });
  const { formNode: formNode3_3, methods: methods3_3 } = useFieldsNew(
    useFormConfig_nor,
    'competition',
    {
      defaultValues: defaultValues,
    }
  );
  // Uploads & Media
  const { formNode: formNode4_1, methods: methods4_1 } = useFieldsNew(
    useFormConfig_Media,
    'media',
    {
      defaultValues: { ...media, attachments: attachments || [], type },
    }
  );
  //  faq
  const faqConfig = useFormConfig_faq({ defaultValues: defaultValues });
  const { formNode: formNode5_1, methods: methods5_1 } = useFields(faqConfig);
  const formRefSection1 = [methods1_1, methods1_2, methods1_3, methods1_4];
  const formRefSection2 = [
    methods2_1,
    methods2_2,
    methods2_3,
    methods2_4,
    methods2_5,
    methods2_6,
    methods2_7,
    methods2_8,
  ];
  const formRefSection3 = [methods3_1, methods3_2, methods3_3];
  const formRefSection4 = [methods4_1];
  const formRefSection5 = [methods5_1];
  const allFormRef = [
    ...formRefSection1,
    ...formRefSection2,
    ...formRefSection3,
    ...formRefSection4,
    ...formRefSection5,
  ];

  const tabConfig = useMemo(() => {
    return [
      {
        id: '1',
        label: 'Market',
        node: <MarketSection defaultValues={defaultValues} />,
      },
      {
        id: '2',
        label: 'About You',
        node: <AboutYouSection defaultValues={defaultValues} />,
      },
      {
        id: '3',
        label: 'Your Company',
        node: <YourCompanySection defaultValues={defaultValues} />,
      },
      {
        id: '4',
        label: 'Subcategories',
        node: <SubcategoriesSection defaultValues={defaultValues} />,
      },
      {
        id: '5',
        label: 'Investment',
        node: <InvestmentSection defaultValues={defaultValues} />,
      },
      // {
      //   id: '6',
      //   label: 'Review & Pay',
      //   node: (
      //     <ReviewSection defaultValues={defaultValues} />,
      //   ),
      // },
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
  }, [type, formNode1_1]);

  const handleSubmit = async (type: 'SUBMIT' | 'DRAFT' | 'UPDATE' = 'DRAFT') => {
    if (tabId == '1' && !id) {
      let req = {} as any;
      baseFormRef.forEach((item) => {
        req = { ...req, ...item.getValues() };
      });
      const data = await createDraftAct(req);
      notify.success('Draft Deal Success!');
      storageHelper.setItem('DEAL_ID', data.payload.content[0].id);
      window.location.hash = '#id=' + data.payload.content[0].id + '&tabId=2';
      setDealId(data.payload.content[0].id);
      setTabId('2');
    } else {
      let checkArr = allFormRef.map((item) => {
        return item.trigger();
      });
      const resArr = await Promise.all(checkArr);
      ;
      let flag = resArr.some((item) => {
        return !item;
      });
      if (flag) {
        return notify.error('error');
      }
      let components = {} as any;
      allFormRef.forEach((item) => {
        let values = item.getValues();
        if (values.media) {
          components.attachments = values.attachments;
          delete values.attachments;
        }
        components = { ...components, ...values };
      });
      let base = {} as any;
      formRefSection1.forEach((item) => {
        let values = item.getValues();
        if (values.pics) {
          components.pics = values.pics;
          delete values.pics;
        }

        if (values.highlights) {
          components.highlights = values.highlights;
          delete values.highlights;
        }
        base = { ...base, ...values };
      });
      let dealBody: DealEntity = {
        ...currentDeal,
        ...base,
        components: components,
        id: String(id),
      } as DealEntity;
      if (components.media?.attachments) {
        dealBody.attachments = components.media?.attachments;
        delete components.media.attachments;
      }
      if (type == 'SUBMIT') {
        await submitDraftAct(dealBody);
        notify.success('Submit Deal Success!');
      } else {
        await updateDraftAct(dealBody);
        notify.success('Update Deal Success!');
      }
    }
  };
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
        tabId={tabId}
        handleTabChange={(newTabId) => {
          // if (query.get('id') || getHashData().id) {
          //   setTabId(newTabId);
          // }
          setTabId(newTabId);
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
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
