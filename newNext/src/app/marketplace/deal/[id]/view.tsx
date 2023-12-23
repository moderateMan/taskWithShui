'use client';

import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useResponsive } from 'mui-eazy';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import CustomBreadcrumbs from 'src/commonOld/components/custom-breadcrumbs';
import { SplashScreen } from 'src/commonOld/components/loading-screen';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { useFlatInject } from 'src/service';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import { IDealGeneralComponent } from 'src/types/deal';
import Comment from './_components/comment';
import DeailSection from './_components/deail-section';
import DealDetailsCarousel from './_components/deal-details-carousel';
import DealDetailsInfo from './_components/deal-details-info';
import DealSection from './_components/deal-section';
import Team from './_components/deal-team-about';

// ----------------------------------------------------------------------

export default function DealDetailView() {
  const loading = useBoolean(true);
  const { fetchDealDetailAct, setCurrentDealId, dealDetail } = useFlatInject('ecommerceStore');
  const params = useParams();
  const mdUp = useResponsive('up', 'md');
  const { title = '', amount = 0, sub_title = '', expire_at = '', components } = dealDetail || {};
  const pathName = usePathname();
  useEffect(() => {
    if (params.id) {
      setCurrentDealId(parseInt(params.id));
      fetchDealDetailAct({
        id: parseInt(params.id),
      });
      loading.onFalse();
    }
  }, []);
  const { team, highlights, faq } = components || {};
  const sectionInfoList = useMemo(() => {
    let temp = components!;
    if (!temp) return [];
    let nameDir = {
      executive_summary: 'Executive summary',
      problem_to_be_solved: 'Problem / Gap',
      vision: 'Vision / Strategy',
      product: 'Product / Service',
      traction: 'Traction',
      business_model: 'Business model',
      funding: 'Funding',
      customers: 'Customers',
      market: 'Market',
      competition: 'Competition',
      media: 'Uploads & Media',
      faq: 'FAQs',
    };
    return [
      'executive_summary',
      'problem_to_be_solved',
      'vision',
      'product',
      'traction',
      'business_model',
      'funding',
      'customers',
      'market',
      'competition',
      'media',
      'faq',
    ]
      .map((key) => {
        if (key in temp || {}) {
          let value: any = temp[key as keyof typeof dealDetail];
          if (Array.isArray(value)) {
            return value;
          } else if (typeof value === 'object') {
            value = { ...value };
            (value as any).key = key;
          }
          return { ...value, name: nameDir[key as keyof typeof nameDir] };
        }
        return null;
      })
      .filter((item) => {
        return item ? true : false;
      }) as (IDealGeneralComponent & { key: string })[];
  }, [dealDetail]);
  return (
    <>
      <Container>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Marketplace',
              href: '/marketplace',
            },
            {
              name: dealDetail?.title || '',
            },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid item xs={12} md={6}>
            <DealDetailsCarousel images={components ? components.pics : []} />
          </Grid>

          <Grid item xs={12} md={6}>
            {dealDetail && (
              <DealDetailsInfo
                liked={dealDetail.liked}
                tags={dealDetail.tags || []}
                deal_id={dealDetail.id}
                name={title}
                logo={dealDetail.logo || ''}
                price={amount ? amount : undefined}
                desc={sub_title}
                expireTime={expire_at}
                type={dealDetail.type}
              />
            )}
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            mt: 10,
            minHeight: '100vh',
          }}
          spacing={8}
        >
          <Grid item xs={mdUp ? 8 : 12}>
            {
              <Grid item xs={12} md={12}>
                <Stack
                  spacing={4}
                  sx={{
                    py: { xs: 5, md: 2 },
                  }}
                >
                  <Stack spacing={2}>
                    <Typography
                      fontFamily={secondaryFont.style.fontFamily}
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '24px',
                        color: '#14417D',
                        marginBottom: '16px',
                      }}
                    >
                      {'Highlights'}
                    </Typography>

                    {highlights!?.map((item, index) => {
                      return (
                        <Box key={index}>
                          <Typography
                            fontFamily={primaryFont.style.fontFamily}
                            sx={{
                              color: '#232323',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              lineHeight: '16px',
                              fontSize: '16px',
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-block',
                                backgroundColor: 'black',
                                width: '5px',
                                height: '5px',
                                borderRadius: '5px',
                                marginRight: '10px',
                                marginBottom: '3px',
                              }}
                            ></span>
                            {item}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                  <Divider
                    sx={{
                      marginBottom: '60px',
                    }}
                  />
                </Stack>
              </Grid>
            }
            {sectionInfoList.map((item) => {
              return item.title ? (
                <Grid key={item.key} item xs={12} md={12}>
                  <DealSection data={item} />
                </Grid>
              ) : (
                ''
              );
            })}
            {team && (
              <Grid item xs={12} md={12}>
                <Team members={team} title={dealDetail?.title}></Team>
              </Grid>
            )}
            {Array.isArray(faq) && faq.length && (
              <Grid item xs={12} md={12}>
                <Stack
                  spacing={4}
                  sx={{
                    py: { xs: 5, md: 2 },
                  }}
                >
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      fontFamily={secondaryFont.style.fontFamily}
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '24px',
                        color: '#14417D',
                      }}
                    >
                      {'FAQ'}
                    </Typography>

                    {Array.isArray(faq) &&
                      faq?.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              marginBottom: '32px',
                            }}
                          >
                            <Stack spacing={4}>
                              <Typography
                                sx={{
                                  color: '#232323',
                                  fontFamily: 'Inter',
                                  fontSize: '18px',
                                  fontStyle: 'normal',
                                  lineHeight: '27px',
                                  fontWeight: 600,
                                }}
                              >
                                {item.question}
                              </Typography>
                              <Typography
                                fontFamily={primaryFont.style.fontFamily}
                                sx={{
                                  color: 'var(--text-primary, #14417D)',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  lineHeight: '24px',
                                  fontSize: '16px',
                                }}
                              >
                                {item.answer}
                              </Typography>
                            </Stack>
                          </Box>
                        );
                      })}
                  </Stack>
                  <Divider
                    sx={{
                      marginBottom: '60px',
                    }}
                  />
                </Stack>
              </Grid>
            )}
          </Grid>
          {mdUp && (
            <Grid item xs={4}>
              <DeailSection deal={dealDetail!} />
            </Grid>
          )}
        </Grid>
        {!pathName.includes('preview') && <Comment></Comment>}
        {loading.value && <SplashScreen />}
      </Container>
    </>
  );
}
