import { network } from 'hardhat'
import { networkConfig } from '../helper-hardhat-config'
import { developmentNetworks } from '../helper-hardhat-config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/dist/types'

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { getNamedAccounts, deployments } = hre
	const { deployer } = await getNamedAccounts()
	const { deploy, log } = deployments

	const chainId = network.config.chainId as keyof object
	let ethUsdPriceFeedAddress

	if (developmentNetworks.includes(network.name)) {
		const MockV3Aggregator = await deployments.get('MockV3Aggregator')
		ethUsdPriceFeedAddress = MockV3Aggregator.address
	} else {
		ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
	}
	log('Deploying FundMe...')

	const fundMe = deploy('FundMe', {
		from: deployer,
		args: [ethUsdPriceFeedAddress],
		log: true,
	})
	log('FundMe deployed!')
	log('--------------------------------------------')
}
export default deploy
