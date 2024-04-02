async function main(): Promise<void> {
	console.log('Hello, world!')
}

main()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
