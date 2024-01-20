import Stack, { StackProps } from '@mui/material/Stack';
import { useResponsive } from 'src/muiEazy';
import { useFlatInject } from 'src/service';
import { DealType } from 'src/types/deal';
import DealTabSelectorItem from './deal-tab-selector-item';

// ----------------------------------------------------------------------

export const testData = [
  {
    icon: '/assets/icons/allDeal.svg',
    title: 'All',
    description: 'Secure funds to fuel your growth.',
    key: DealType.ALL,
  },
  {
    icon: '/assets/icons/vector.svg',
    title: 'Capital Raising',
    description: 'Secure funds to fuel your growth.',
    key: DealType.CAPITAL_RAISING,
  },
  {
    icon: '/assets/icons/equity.svg',
    title: 'Equity',
    description: 'Discover investment prospects and partnerships.',
    key: DealType.EQUITY,
  },
  {
    icon: '/assets/icons/ic_users_group.svg',
    title: 'Partnerships',
    description: 'Find strategic allies for your business.',
    key: DealType.PARTNERSHIPS,
  },
  {
    icon: '/assets/icons/icon.svg',
    title: 'Startup Pitch',
    description: 'Pitch your groundbreaking ideas.',
    key: DealType.STARTUP_PITCH,
  },
  {
    icon: '/assets/icons/ic_shopping_cart.svg',
    title: 'Business for Sale',
    description: 'Promote your venture.',
    key: DealType.SELL_A_BUSINESS,
  },
];

// ----------------------------------------------------------------------

export default function DealTabSelector({ sx, ...other }: StackProps) {
  const { marketDealType, setMarketDealType } = useFlatInject('marketStore');
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
                  setMarketDealType(DealType.ALL);
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
            <DealTabSelectorItem
              key={item.key}
              active={item.key === marketDealType}
              name={item.title}
              icon={item.icon}
            />
          </div>
        );
      })}
    </Stack>
  );
}
