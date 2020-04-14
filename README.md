# Coffee Supply Chain DAPP 
This is the third project for @Udemy Blockchain developer Nanodegree. The purpose of this
project is to go over how smart contracts can work as an extremely valuable resource
for the management of supply chains.

## What this dapp will do:
 "Coffee Supply Chain" dapp is a decentralized application that covers the supply chain
 of Coffee, from farmers to consumers. The user story is similar to any commonly used supply 
 chain process. A Seller can add items to the inventory system stored in the blockchain. 
 A Buyer can purchase such items from the inventory system. Additionally, a Seller can 
 mark an item as Shipped, and similarly a Buyer can mark an item as Received.  
   
### Where you can find the contracts:
All contracts are on Rinkeby Ethereum test network.

- Contracts address and create transactions:

   -FarmerRole:   
    - 0x8B0a50441B91B1590c39622416DEc94B56D7EAF1
    - [0xfe712c580df53fed4ec426be28b542053c108c069a6767a74679f564e894a3e5](https://rinkeby.etherscan.io/tx/0xfe712c580df53fed4ec426be28b542053c108c069a6767a74679f564e894a3e5)
   
   -DistributorRole:
    - 0x0D1FB057EA85DF7FEE88e06E2cE0a7B8f30028FD
    - [0x908be5d3062bffea0dc3acbc14df473baa851de63b9d6383f0961a08d1d75fc5](https://rinkeby.etherscan.io/tx/0x908be5d3062bffea0dc3acbc14df473baa851de63b9d6383f0961a08d1d75fc5)
   
   -RetailerRole:
    -  0xC502282AdC3FB10fB272cb8fF1791869b0dC3B49
    - [0x2b823868dc92a565d3cbd1dcaba8aeeb81ee7efcdaf8749ce9fc24c30a6b9777](https://rinkeby.etherscan.io/tx/0x2b823868dc92a565d3cbd1dcaba8aeeb81ee7efcdaf8749ce9fc24c30a6b9777)
   
   -ConsumerRole:
    - 0x3DE8Cd83774872041C8142082b3F15f46252b901
    - [0x9c2945f7d9358dda0e1aa138c587e9922aa40e679d514e331e894b683097a076](https://rinkeby.etherscan.io/tx/0x9c2945f7d9358dda0e1aa138c587e9922aa40e679d514e331e894b683097a076)
   
   -SupplyChain:
    - 0xB90b438b5133eA5202E77b42a66cfd2953Eb1edb
    - [0x1527a4b04eca48f84d400c163e2863afee513415d856b55a054ff70b4491abb3](https://rinkeby.etherscan.io/tx/0x1527a4b04eca48f84d400c163e2863afee513415d856b55a054ff70b4491abb3)

## Technology versions used:
    - Solidity version ^0.5.16
    - Truffle version v5.1.20
    - truffle-hdwallet-provider version ^1.0.0-web3one.5
    - web3 version ^1.2.6
    - node version v10.15.0
    - npm version 6.4.1

For testing:

    - Chai
    - Mocha
        
### Run Crypto Star dapp local:

#### Prerequisites
You need to have a ganache ui up and running

#### Commands for running local
```
npm install
truffle compile
truffle migrate
cd app
npm run dev
```
To run the unit test:

```
truffle test
```
![TESTS](img/TestsPS.PNG?raw=true)

### Sample transactions from UI:
Product Overview:

   ![FarmerUI](img/ProductOverview.PNG?raw=true)

Farmer Details:

   ![FarmerUI](img/FarmerUI.PNG?raw=true)

Transactions to ehterscan:
 - [Harvest](https://rinkeby.etherscan.io/tx/0x20dff47ea47336f5f6d1b48dad6886bcd4647a2ad81016b7cd557c300d7a80ba)
 - [Process](https://rinkeby.etherscan.io/tx/0x41597493f1c60b7102d7add40be3e9271112d25d7900aa39ca5d7457d77b5f27)
 - [Pack](https://rinkeby.etherscan.io/tx/0xd931481d29bd9835a3295f18847fded690acb100e6a2d61aeac8c5635d3579a8)
 - [For Sale](https://rinkeby.etherscan.io/tx/0x1eb0a2e083cd2b7f3167804d1d3aaf7604e3d0ef8990e0c96ae12e985502adb1)

Product Details

![ProductUI](img/ProductUI.PNG?raw=true)

Transactions to ehterscan:
 - [Buy](https://rinkeby.etherscan.io/tx/0x3dbd70759787b52d1df7d404b3e66947b6041277f23a3ad9f3d2b377a46fe586)
 - [Ship](https://rinkeby.etherscan.io/tx/0x521b38a22bf7d6b395303f41c563e92484790561a2004ce7c2d1219e8f6a3384)
 - [Receive](https://rinkeby.etherscan.io/tx/0x14c5647fd740f0f4223075a8dfa8b762d7ab0cab96a375ff37f8cc5cf1c95915)
 - [Purchase](https://rinkeby.etherscan.io/tx/0x62f899532f815fdc61975526b35a2983b59118a92c130e728230693049d5e82e)
 
Transaction History

![TransactionHistory](img/TransactionHistory.PNG?raw=true)

