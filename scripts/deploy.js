const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "UFC Miami",
      cost: tokens(3),
      tickets: 0,
      date: "May 31, 2024",
      time: "6:00PM EST",
      location: "Miami-Dade Arena - Miami, FL"
    },
    {
      name: "UEFA Champions League Final",
      cost: tokens(1),
      tickets: 125,
      date: "May 25, 2024",
      time: " 21:00 CET",
      location: "Istanbul, Turkey"
    },
    {
      name: "Lakers vs Denver Nuggets",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9, 2024",
      time: "10:00AM TRT",
      location: "Los Angeles, California"
    },
    {
      name: "Dallas Mavericks vs. San Antonio Spurs",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11, 2024",
      time: "2:30PM CST",
      location: "American Airlines Center - Dallas, TX"
    },
    {
      name: "Golden State Warriors vs. Philadelphia 76ers",
      cost: tokens(3),
      tickets: 125,
      date: "May 10, 2024",
      time: "7:30 PM EST",
      location: " Chase Center, San Francisco, CA"
    },
    {
      name: "UFC 300",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23, 2024",
      time: "11:00AM EST",
      location: "Toronto, Canada"
    },
    {
      name: "Cleveland vs Golden State Warriors",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23, 2024",
      time: "11:00AM EST",
      location: "Toronto, Canada"
    },
    {
      name: "Los Angeles Lakers vs. Brooklyn Nets",
      cost: tokens(4),
      tickets: 125,
      date: "May 12, 2024",
      time: "8:00 PM EST",
      location: "Staples Center, Los Angeles, CA"
    },
    {
      name: "Miami Heat vs. Boston Celtics",
      cost: tokens(2.75),
      tickets: 125,
      date: "May 14, 2024",
      time: "8:00 PM EST",
      location: "American Airlines Arena, Miami, FL"
    }
  ]

  for (var i = 0; i < 9; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});