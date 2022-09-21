import { ethers, run, network } from 'hardhat';

async function main() {
    const DonateCryptoFactory = await ethers.getContractFactory('DonateCrypto');

    console.log('Deploying contract...');

    const donateCrypto = await DonateCryptoFactory.deploy();
    await donateCrypto.deployed();

    console.log(`Deployed to ${donateCrypto.address}`);

    if (network.config.chainId === 31337 || network.config.chainId === 1337) {
        console.log('You are on a local network, verification is not needed!');
    } else {
        console.log('Verification needed!');

        if (process.env.ETERSCAN_API_KEY) {
            await donateCrypto.deployTransaction.wait(6);
            await verify(donateCrypto.address, []);
        }
    }
}

async function verify(contractAddress: string, args: any[]) {
    console.log('Verifying contract..');

    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        console.log(error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
