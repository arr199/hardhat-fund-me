const networkConfig = {
	11155111: {
		network: 'sepolia',
		ethUsdPriceFeed: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
	},
	137: {
		network: 'polygon',
		ethUsdPriceFeed: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
	},
}
// MOCK_V3_AGGREGATOR ARGUMENTS
const DECIMALS = 8
const INITIAL_ANSWER = 300000000000

const developmentNetworks = ['hardhat', 'localhost']

export { networkConfig, developmentNetworks, DECIMALS, INITIAL_ANSWER }
