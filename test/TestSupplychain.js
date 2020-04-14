// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within

var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function (accounts) {

    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        var eventEmitted = false

        await supplyChain.Harvested(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.harvestCoffee(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes)

        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        var eventEmitted = false
        supplyChain.Processed(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.processCoffee(upc, {from: accounts[1]});

        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {
        const supplyChain = await SupplyChain.deployed()
        var eventEmitted = false
        supplyChain.Packed(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.packItem(upc, {from: accounts[1]});

        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        var eventEmitted = false
        supplyChain.ForSale(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.sellItem(upc, productPrice, {from: accounts[1]})
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State')
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid item Price')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        var eventEmitted = false
        supplyChain.Sold(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.addDistributor(distributorID,{from: accounts[0]})
        await supplyChain.buyItem(upc, {from: distributorID, value: productPrice})

        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferTwo[5], 4, 'Error: Invalid item State')
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributorID')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Invalid ownerId')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        var eventEmitted = false
        supplyChain.Shipped(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.shipItem(upc, {from: accounts[2]});
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferTwo[5], 5, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
        const supplyChain = await SupplyChain.deployed()

        var eventEmitted = false
        supplyChain.Received(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.addRetailer(retailerID,{from: accounts[0]})
        await supplyChain.receiveItem(upc, {from: accounts[3]})

        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferTwo[5], 6, 'Error: Invalid item State')
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid distributorID')
        assert.equal(resultBufferOne[2], retailerID, 'Error: Invalid ownerId')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        var eventEmitted = false
        supplyChain.Purchased(upc, (err, res) => {
            eventEmitted = true
        });

        await supplyChain.addConsumer(consumerID,{from: accounts[0]})
        await supplyChain.purchaseItem(upc, {from: consumerID});

        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State')
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid distributorID')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Invalid ownerId')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()

        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()

        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        assert.equal(resultBufferTwo[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferTwo[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[2], productID, 'Error: Missing or Invalid productID')
        assert.equal(resultBufferTwo[3], productNotes, 'Error: Missing or Invalid productNotes')
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Missing or Invalid productPrice')
        assert.equal(resultBufferTwo[5], 7, 'Error: Missing or Invalid State')
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Missing or Invalid distributorID')
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Missing or Invalid retailerID')
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Missing or Invalid consumerID')

    })

});

