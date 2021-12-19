import React, { useState, useEffect } from "react";
import TokenContract from "./artifacts/contracts/Token.sol/Token.json";
import {ethers} from 'ethers';

import "./App.css";

const App = () =>  {
  const [currentAccount, setCurrentAccount ] = useState(null);
  const [tokenContract, settTkenContract] = useState(null);
  const TOKEN_CONTRACT_ADDRESS = "0xF1e396B9528EfBCE40Db6Ba0962EbcdF947Cb590";

	const checkIfWalletIsConnected = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log('Make sure you have MetaMask!');
				setIsLoading(false);
				return;
			} else {
				console.log('We have the ethereum object', ethereum);
        
        let chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Connected to chain " + chainId);
        // String, hex code of the chainId of the Rinkebey test network
        const rinkebyChainId = "0x4"; 
        if (chainId !== rinkebyChainId) {
          alert("You are not connected to the Rinkeby Test Network!");
          setIsLoading(false);
          return;
        }

				const accounts = await ethereum.request({ method: 'eth_accounts' });

				if (accounts.length !== 0) {
					const account = accounts[0];
					console.log('Found an authorized account:', account);
          // toast.success('Connected!')
					setCurrentAccount(account);
          setIsLoading(false);
				} else {
					console.log('No authorized account found');
          setIsLoading(false);
				}
			}
		} catch (error) {
			console.log(error);
      setIsLoading(false);
		}
	};

	const connectWalletAction = async () => {.
    tart
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}
      

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts'
			});
      // toast.success('Connection established!')
			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
      setIsLoading(false);
		} catch (error) {
			console.log(error);
      setIsLoading(false);
		}
	};

  useEffect(() => {
		checkIfWalletIsConnected();
		setIsLoading(false);
	}, []);

  useEffect(() => {
		const { ethereum } = window;

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const itemManagerContractEther = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenContract.abi, signer);
			// setItemManagerContract(itemManagerContractEther);
      // itemManagerContractEther.on('SupplyChainStep', (index, step, address) => {
      //   console.log("listing ...")
      // } )
      setIsLoading(false);
		} else {
			console.log('Ethereum object not found');
      setIsLoading(false);
		}
	}, []);

  const handlerSubmit = async () => {
    try {
      const newItem = await tokenContract.createItem();
      console.log('mining ....' , newItem);
      await newItem.wait();
      console.log('Mined' , newItem.hash);
      setIsLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  console.log(currentItem);

  return (
    <>
      <header className="App-header">
      <h2>Re-think your supply-chain</h2>
        {
          currentAccount === null ? 
          <button onClick={connectWalletAction}>Get connected</button>
          : ''
        }
          <p>connected</p>
        <button onClick={null} className="button">hello</button>
      </header>
    </>
  );
}

export default App;
