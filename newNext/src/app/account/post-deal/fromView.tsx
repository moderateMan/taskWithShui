'use client';

import { Alert, Button, Divider, Stack, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useFields } from 'mui-eazy';
import notify from 'src/common/utils/notify';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import IconTip from 'src/common/components/icon-tip';
import storageHelper from 'src/common/utils/storageHelper';
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
import { TabView } from './tabView';
import useFieldsNew from './useFieldsNew';
import useHashParams from 'src/routes/hooks/use-hash-params';
import { paths } from 'src/routes/paths';
import { primaryFont } from 'src/theme/typography';

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
  debugger
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
  const { formNode: formNode0_1, methods: methods0_1 } = useFields(typeConfig0_1);
  const baseFormRef = [methods0, methods0_1];
  methods0.watch((e: any) => {
    setType(e.type);
  });
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

  const TypographyNode = ({ children }: { children: ReactNode }) => {
    return (
      <Typography
        variant="h4"
        sx={{
          mb: 3,
        }}
      >
        {children}
      </Typography>
    );
  };
  const DividerNode = () => {
    return (
      <Divider
        sx={{
          mb: 3,
          mt: 3,
        }}
      />
    );
  };
  const tabConfig = useMemo(() => {
    return [
      {
        id: '1',
        label: 'Deal Type',
        node: (
          <>
            <>
              <Typography
                fontFamily={primaryFont.style.fontFamily}
                fontSize={'14px'}
                fontStyle={'normal'}
                fontWeight={400}
                lineHeight={'22px'}
                mb={'24px'}
              >
                * Required information
              </Typography>
              <Stack alignItems={'center'} direction="row" spacing={2}>
                <TypographyNode>
                  Deal name
                  <IconTip
                    info={
                      <Typography
                        sx={{
                          color: '#59745D',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '18px',
                        }}
                      >
                        This is the headline for your opportunity. It should be attention-grabbing
                        and concise. Whether it's your company name or a catchy tagline, make it
                        memorable. This is the first thing potential investors or partners will see,
                        so choose something that reflects the essence of your opportunity. Keep it
                        short and impactful!
                      </Typography>
                    }
                  />
                </TypographyNode>
              </Stack>

              {formNode0_1}
              <DividerNode />
            </>
            <>
              <TypographyNode>Select your deal type*</TypographyNode>
              {formNode0}
              <DividerNode />
            </>
          </>
        ),
      },
      {
        id: '2',
        label: 'Deal Basics',
        node: (
          <>
            <>
              <TypographyNode>
                Deal details
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      The Sub-heading is your opportunity to complete the headline with a punchy and
                      brief description. This is your chance to provide a little more context or
                      excitement about your deal. Think of it as a tagline that adds flavor to your
                      Deal Title. Keep it concise but compelling, giving potential investors or
                      partners a sneak peek into what makes your opportunity special. Make them want
                      to read more!
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode1_1}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Highlights
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      This is your chance to grab attention quickly. Use bullet points to highlight
                      the key features or benefits of your deal. Keep it concise and impactful.
                      Minimum 3.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode1_2}
              <DividerNode />
            </>

            {currentDeal?.type !== DealType.PARTNERSHIPS && (
              <>
                <TypographyNode>
                  Ask
                  <IconTip
                    info={
                      <Typography
                        sx={{
                          color: '#59745D',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '18px',
                        }}
                      >
                        Be explicit about what you're seeking from potential investors or partners.
                        Whether it's funding, expertise, resources, or something else, clarity is
                        key.
                      </Typography>
                    }
                  />
                </TypographyNode>
                {formNode1_3}
                <DividerNode />
              </>
            )}
            {formNode1_4}
          </>
        ),
      },
      {
        id: '3',
        label: 'Business Details',
        node: (
          <>
            <>
              <TypographyNode>
                Executive summary
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Summarise your deal in a concise manner. Provide an overview of your
                      opportunity, including its key benefits and potential impact.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_1}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Problem / Gap
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Describe the problem your deal addresses or the gap it fills in the market.
                      Help others understand the need your deal fulfills.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_2}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Vision / Strategy
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Share your long-term vision and strategy. Describe where you see your project
                      or business heading in the future.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_3}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Product / Service
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Detail your product, service, or solution. Explain what it does, how it works,
                      and why it's valuable. Focus on its unique features.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_4}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Traction
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Share any relevant milestones or achievements your project or business has
                      reached. Traction can include customer acquisitions, revenue growth,
                      partnerships, or successful pilot programs.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_5}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Business model
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Explain how your venture generates revenue or plans to do so. Detail your
                      pricing strategy, target customers, and any monetization methods. You can also
                      pload any images or slides that may help your pitch.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_6}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Funding
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Specify your existing funding position &/or your funding requirements and how
                      you plan to utilise the funds. Investors need to know where their investment
                      will go.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_7}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Team
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Introduce the key members of your team. Highlight their relevant experience
                      and expertise. A strong team can significantly boost investor and partner
                      confidence.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode2_8}
              <DividerNode />
            </>
          </>
        ),
      },
      {
        id: '4',
        label: 'Market & Competition',
        node: (
          <>
            <>
              <TypographyNode>
                Customers
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Describe your target customers. Who will benefit most from your deal?
                      Understanding your audience is crucial for potential partners or investors.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode3_1}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Market
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Discuss the market size, trends, and potential. Highlight opportunities and
                      challenges within your target market.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode3_2}
              <DividerNode />
            </>
            <>
              <TypographyNode>
                Competition
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Identify your competitors and explain how your deal stands out. What gives you
                      a competitive advantage?
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode3_3}
              <DividerNode />
            </>
          </>
        ),
      },
      {
        id: '5',
        label: 'Uploads & Media',
        node: (
          <>
            <>{formNode4_1}</>
          </>
        ),
      },
      {
        id: '6',
        label: 'FAQs',
        node: (
          <>
            <>
              <TypographyNode>
                FAQs
                <IconTip
                  info={
                    <Typography
                      sx={{
                        color: '#59745D',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
                      Anticipate questions from potential partners or investors and provide answers.
                      This helps clarify common queries upfront.
                    </Typography>
                  }
                />
              </TypographyNode>
              {formNode5_1}
              <DividerNode />
            </>
          </>
        ),
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
      debugger
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
