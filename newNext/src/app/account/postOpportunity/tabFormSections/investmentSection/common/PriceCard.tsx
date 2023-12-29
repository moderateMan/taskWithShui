import React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Card, CardActionArea, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

type PriceCardPropsType = {
	className?: string,
	title: string,
}

const PriceCard = styled((props: PriceCardPropsType) => {

	return (
		<Card {...props}>
			<AppBar className="bar" position="static">
				{props.title}
			</AppBar>
			<CardActionArea className="action-area">
				<CardContent className="content">
					<div className="top">
						<Typography variant="h5" component="div">
							$2,499*
						</Typography>
						<Typography sx={{ fontSize: 14 }} color="text.secondary">
							Per month
						</Typography>
					</div>
					<div className="middle">
						<Typography sx={{ fontSize: 16 }} color="text.secondary">
							Benefits
						</Typography>
						<div className="each">
							<CheckOutlinedIcon color="primary"/>
							<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
								Live Lead Data
							</Typography>
						</div>
						<div className="each">
							<CheckOutlinedIcon color="primary"/>
							<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
								Multiple Offers
							</Typography>
						</div>
						<div className="each">
							<CheckOutlinedIcon color="primary"/>
							<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
								Weekly Reports
							</Typography>
						</div>
						<div className="each">
							<CheckOutlinedIcon color="primary"/>
							<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
								Social Media EDMs
							</Typography>
						</div>
						<div className="each">
							<CheckOutlinedIcon color="primary"/>
							<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
								Content & Speaking Opportunities
							</Typography>
						</div>
					</div>
					<div className="bottom">
						<Typography sx={{ fontSize: 14 }}>
							Lowest Pricing per Industry Category.<br/>
							Launch Price available for 3 Months.<br/>
							Cancel Anytime with 60 days Notice.
						</Typography>
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);

})(theme => ({
	'& > .bar': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '4px',
		cursor: 'default',
		userSelect: 'none',
	},

	'& > .action-area': {

		'& > .content': {
			display: 'flex',
			flexDirection: 'column',

			'& > .top': {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '8px 0',
			},

			'& > .middle': {
				margin: '8px 0',

				'& > .each': {
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					gap: '8px',
					margin: '8px 0',
				},
			},

			'& > .bottom': {
				display: 'flex',
				flexDirection: 'row',
				margin: '8px 0',

				':before': {
					content: '"*"',
					marginRight: '4px',
				},
			},
		},
	},
}));

export default PriceCard;
