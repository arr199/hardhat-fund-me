import { ethers, network } from 'hardhat'
import { networkConfig } from '../helper-hardhat-config'
import { developmentNetworks } from '../helper-hardhat-config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/dist/types'
import { verify } from '../utils/verify'

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

	const fundMe = await deploy('FundMe', {
		from: deployer,
		args: [ethUsdPriceFeedAddress],
		log: true,
		waitConfirmations: 6,
	})
	log('FundMe deployed!')
	log(fundMe.receipt)
	log('Network: ', network.name)
	log('--------------------------------------------')

	if (!developmentNetworks.includes(network.name)) {
		await verify(fundMe.address, [ethUsdPriceFeedAddress])
	}
}
export default deploy
