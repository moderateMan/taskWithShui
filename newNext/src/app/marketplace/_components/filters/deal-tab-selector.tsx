import Stack, { StackProps } from '@mui/material/Stack';
import { useFlatInject } from 'src/service';
import { DealType } from 'src/types/deal';
import DealTabSelectorItem from './deal-tab-selector-item';
import { useResponsive } from 'mui-eazy';

// ----------------------------------------------------------------------

const testData = [
  {
    icon: '/assets/icons/allDeal.svg',
    title: 'All',
    description: 'Secure funds to fuel your growth.',
  },
  {
    icon: '/assets/icons/vector.svg',
    title: 'Capital Raising',
    description: 'Secure funds to fuel your growth.',
  },
  {
    icon: '/assets/icons/equity.svg',
    title: 'Equity',
    description: 'Discover investment prospects and partnerships.',
  },
  {
    icon: '/assets/icons/ic_users_group.svg',
    title: 'Partnerships',
    description: 'Find strategic allies for your business.',
  },
  {
    icon: '/assets/icons/icon.svg',
    title: 'Startup Pitch',
    description: 'Pitch your groundbreaking ideas.',
  },
  {
    icon: '/assets/icons/ic_shopping_cart.svg',
    title: 'Business for Sale',
    description: 'Promote your venture.',
  },
];

// ----------------------------------------------------------------------

export default function DealTabSelector({ sx, ...other }: StackProps) {
  const { marketplaceDealQueryAct } = useFlatInject('dealStore');
  const { seachParams, marketDealType, setSeachParams, setMarketDealType } =
    useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');

  return (
    <Stack
      spacing={mdUp ? 8 : 1}
      direction={'row'}
      sx={{
        p: mdUp ? 4 : 1,
        borderRadius: 2,
        bgcolor: 'background.white',
        ...sx,
      }}
      {...other}
    >
      {testData.map((item, index) => {
        return (
          <div
            onClick={() => {
              switch (item.title) {
                case 'All':
                  setMarketDealType(undefined);
                  break;
                case 'Capital Raising':
                  setMarketDealType(DealType.CAPITAL_RAISING);
                  break;
                case 'Equity':
                  setMarketDealType(DealType.EQUITY);
                  break;
                case 'Partnerships':
                  setMarketDealType(DealType.PARTNERSHIPS);
                  break;
                case 'Startup Pitch':
                  setMarketDealType(DealType.STARTUP_PITCH);
                  break;
                case 'Business for Sale':
                  setMarketDealType(DealType.SELL_A_BUSINESS);
                  break;
                default:
                  setMarketDealType(undefined);
                  break;
              }
            }}
            style={{
              cursor: 'pointer',
            }}
            key={index}
          >
            <DealTabSelectorItem key={index} name={item.title} pic_url={item.icon} />
          </div>
        );
      })}
    </Stack>
  );
}
