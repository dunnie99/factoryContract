import { ethers } from "hardhat";

async function main() {
  const [owner, admin2] = await ethers.getSigners();
  const admin = [owner.address,admin2.address,"0x20e77cD9C1a3EeA1Bb1BD64da536a33B0df7248e"];

   const CloneMultiSig = await ethers.getContractFactory("cloneMultiSig");
   const cloneMultiSig = await CloneMultiSig.deploy();
   await cloneMultiSig.deployed();

   console.log(`Multisig Address is ${cloneMultiSig.address}`);
   //console.log(addr1.address, addr2.address, owner.address);

   const newMultisig = await cloneMultiSig.createMultiSig(admin);
   let event = await newMultisig.wait();
   console.log(event);
   let newChild = event.events[0].args[0];
   console.log(newChild);

  //////////////////////////////////////////////////

  const childMultisig = await ethers.getContractAt("IMultisig", "0x7955159986dD324a6143AF62092862f1E66b99e9");
  const addresses = await childMultisig.returnAdmins();
  console.log(addresses);

   await childMultisig.addAdmin("0x0B85caaeB9cbC780b016f1088BD3deA58c82324F");
   await childMultisig.connect(admin2).addAdmin("0x0B85caaeB9cbC780b016f1088BD3deA58c82324F");

  const addressesNew = await childMultisig.returnAdmins();
  console.log(addressesNew);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});