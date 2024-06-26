import { run } from 'hardhat'

export const verify = async (contractAddress: string, args: string[]) => {
	console.log('Verifying contract...')
	try {
		await run('verify:verify', {
			address: contractAddress,
			constructorArguments: args,
		})
		console.log('Contract verified!')
	} catch (e) {
		if (e.message.toLowerCase().includes('already verified')) {
			console.log('Already verified!')
		} else {
			console.log(e)
		}
	}
}
