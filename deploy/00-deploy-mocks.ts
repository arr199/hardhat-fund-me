import { network } from 'hardhat'
import {
	developmentNetworks,
	DECIMALS,
	INITIAL_ANSWER,
} from '../helper-hardhat-config'
import { DeployFunction } from 'hardhat-deploy/dist/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { getNamedAccounts, deployments } = hre
	const { deployer } = await getNamedAccounts()
	const { deploy, log } = deployments

	if (developmentNetworks.includes(network.name)) {
		log('Deploying MockV3Aggregator... ')

		await deploy('MockV3Aggregator', {
			contract: 'MockV3Aggregator',
			log: true,
			args: [DECIMALS, INITIAL_ANSWER],
			from: deployer,
		})
		log('MockV3Aggregator deployed!')
		log('--------------------------------------------')
	}
}
export default deploy
module.exports.tags = ['all', 'mocks']
