// services/metamask.ts
import detectEthereumProvider from '@metamask/detect-provider';
import { useState, useEffect } from 'react';
import { convertDollarEtherWEI, formatBalance } from '../utils';
import Web3 from 'web3';
import { bignumber, subtract } from 'mathjs';
import { deleteCart } from '../Cart/CartServices';
import { getCheckout, initCheckout } from './CheckoutService';
import jwt_decode from 'jwt-decode';


 interface WalletState {
        accounts: string[];
        balance: string;
        chainId: string;
 }
  
  interface PaymentSettings {
    gasLimit: string;
    setGasLimit: (value: string) => void;
    maxPriorityFeePerGas: string;
    setMaxPriorityFeePerGas: (value: string) => void;
    maxFeePerGas: string;
    setMaxFeePerGas: (value: string) => void;
  }
  
  export function useMetamask() {
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState = { accounts: [], balance: "", chainId: "" };
    const [wallet, setWallet] = useState<WalletState>(initialState);
    const [showInputs, setShowInputs] = useState(false);
    const [transactionHash, setTransactionHash] = useState("");
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false); // New state for payment confirmation
    const [confirmationProgress,setConfirmationProgress] = useState<string|null>(null);
    const [isPaymentInitiated,setIsPaymentInitiated] = useState(false);
   
        
  
    // Define paymentSettings
    const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
      gasLimit: "0x5028",
      setGasLimit: (value: string) => {
        setPaymentSettings(prev => ({ ...prev, gasLimit: value }));
      },
      maxPriorityFeePerGas: "0x3b9aca00",
      setMaxPriorityFeePerGas: (value: string) => {
        setPaymentSettings(prev => ({ ...prev, maxPriorityFeePerGas: value }));
      },
      maxFeePerGas: "0x2540be400",
      setMaxFeePerGas: (value: string) => {
        setPaymentSettings(prev => ({ ...prev, maxFeePerGas: value }));
      },
    });

    useEffect(() => {
      const refreshAccounts = async (accounts: any) => {
        if (accounts.length > 0) {
          await updateWallet(accounts);
        } else {
          setWallet(initialState);
        }
      };
  
      const refreshChain = (chainId: any) => {
        setWallet((wallet) => ({ ...wallet, chainId }));
      };
  
      const getProvider = async () => {
        const provider = await detectEthereumProvider({ silent: true });
        setHasProvider(Boolean(provider));
  
        if (provider) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          await refreshAccounts(accounts);
          window.ethereum.on('accountsChanged', refreshAccounts);
          window.ethereum.on("chainChanged", refreshChain);
        }
      };
  
      getProvider();

      const showInputs = JSON.parse(sessionStorage.getItem('showInputs') || 'false');
      const transactionHash = sessionStorage.getItem('transactionHash') || '';
      const isPaymentConfirmed = JSON.parse(sessionStorage.getItem('isPaymentConfirmed') || 'false');
      const confirmationProgress = sessionStorage.getItem('confirmationProgress') || '';
      const isPaymentInitiated = JSON.parse(sessionStorage.getItem('isPaymentInitiated') || 'false');

      setShowInputs(showInputs);
      setTransactionHash(transactionHash);
      setIsPaymentConfirmed(isPaymentConfirmed);
      setConfirmationProgress(confirmationProgress);
      setIsPaymentInitiated(isPaymentInitiated);
  
      return () => {
        window.ethereum?.removeListener('accountsChanged', refreshAccounts);
        window.ethereum?.removeListener("chainChanged", refreshChain);
      };
    }, [showInputs,transactionHash,isPaymentConfirmed,confirmationProgress,isPaymentInitiated]);


  
    const toggleInputsVisibility = () => {
      setShowInputs(!showInputs);
      sessionStorage.setItem('showInputs',JSON.stringify(!showInputs));
    }

  
    const handlePayment = async (amount: number) => {
        const { gasLimit, maxPriorityFeePerGas, maxFeePerGas } = paymentSettings;
        console.log('amount',amount)
        const weiAmount = await convertDollarEtherWEI(amount);
        setIsPaymentInitiated(true);
        sessionStorage.setItem('isPaymentInitiated', JSON.stringify(true));

        
        try {
          const transaction = {
            from: wallet.accounts[0],
            to: "0x800f1bA13cAEb37f68FFbD7Bfb7f8ad695BFE871",
            value: weiAmount,
            gasLimit,
            maxPriorityFeePerGas,
            maxFeePerGas
          };
          console.log(transaction)
    
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transaction],
          });
          
    
          setTransactionHash(txHash);
          sessionStorage.setItem('transactionHash',txHash)
          watchEtherTransfers(txHash);
          // Update the account balance
          updateWallet(wallet.accounts);
          
        } catch (error) {
          console.error("Error during transaction: ", error);
          setTimeout(()=>{exitTransaction()},2000)
        }
      };
  
    const handleConnect = async () => {
      let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      await updateWallet(accounts);
    }
  
    
  
    const updateWallet = async (accounts: any) => {
      const balance = await getBalance(accounts);
      const chainId = await getChainId();
      setWallet({ accounts, balance, chainId });
    }

    async function watchEtherTransfers(txHash: string) {
        try {
          // Instantiate web3 with WebSocket provider
          const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/96a7db0df5004bec93daf4b9ef9c89d9'));
    
          // Get transaction details
          const trx = await web3.eth.getTransaction(txHash);
    
          const valid = validateTransaction(trx);
          // If transaction is not valid, simply return
          if (!valid) return setTimeout(()=>{exitTransaction()},5000);

          // Initiate transaction confirmation
          confirmEtherTransaction(txHash);
          
        } catch (error) {
          console.log(error);
        }
      }
    
      function confirmEtherTransaction(txHash: string, confirmations = 2) {
        setTimeout(async () => {
    
          // Get current number of confirmations and compare it with the sought-for value
          const trxConfirmations = await getConfirmations(txHash)
    
          console.log('Transaction with hash ' + txHash + ' has ' + trxConfirmations + ' confirmation(s)');
          if (trxConfirmations){
            const progress = (Number(trxConfirmations)/2)*100
            setConfirmationProgress(progress.toString())
            sessionStorage.setItem('confirmationProgress', progress.toString());
          } 
          if (trxConfirmations) {
            if (Number(trxConfirmations) >= confirmations) {
              // Handle confirmation event according to your business logic
    
              console.log('Transaction with hash ' + txHash + ' has been successfully confirmed');



              await createOrder(txHash);
              //deleteCart();
              
              
    
              setIsPaymentConfirmed(true); // Set payment confirmation state to true
              sessionStorage.setItem('isPaymentConfirmed', JSON.stringify(true));
                  //reset component
              
              

              return;
            }
          }
          // Recursive call
          confirmEtherTransaction(txHash, confirmations);
        }, 30 * 1000);
      }
    
      async function getConfirmations(txHash: string) {
        try {
          // Instantiate web3 with HttpProvider
          const web3 = new Web3('https://sepolia.infura.io/v3/96a7db0df5004bec93daf4b9ef9c89d9');
    
          // Get transaction details
          const trx = await web3.eth.getTransaction(txHash);
    
          // Get current block number
          const currentBlock = await web3.eth.getBlockNumber();
          if (trx.blockNumber === null) {
            return null;
          }
      
          const blockNumber = Number(trx.blockNumber);
    
          const confirmations = trx.blockNumber === null ? 0 : subtract(bignumber(currentBlock.toString()), bignumber((blockNumber)));
    
          // When the transaction is unconfirmed, its block number is null.
          // In this case, we return 0 as the number of confirmations
          return confirmations.toString();
        } catch (error) {
          console.log(error);
        }
      }
    
      function validateTransaction(trx: any) {
        //const walletFrom = process.env.WALLET_FROM;
        //const walletTo = process.env.WALLET_TO;
        //const amount = process.env.AMOUNT;
    
        // Check that the transaction is to the desired wallet
        //if (trx.to.toLowerCase() !== walletTo.toLowerCase()) return false;
    
        // Check that the transaction is from the desired wallet
        //if (trx.from.toLowerCase() !== walletFrom.toLowerCase()) return false;
    
        // Check that the transaction value is above the desired amount
        //if (parseFloat(web3.utils.fromWei(trx.value, 'ether')) < parseFloat(amount)) return false;
    
        // If all checks have passed, return true
        console.log('payment validated',trx);
        return true;
      }


       function exitTransaction() {
              setIsPaymentConfirmed(true); // Set payment confirmation state to true
              sessionStorage.setItem('isPaymentConfirmed', JSON.stringify(true));
                  //reset component
              setIsPaymentInitiated(false);
              sessionStorage.setItem('isPaymentInitiated', JSON.stringify(false));
              setTransactionHash("");
              sessionStorage.setItem('isPaymentConfirmed', JSON.stringify(false));
              setConfirmationProgress(null)
              sessionStorage.setItem('confirmationProgress', JSON.stringify(null));
      }
  
    return {
      hasProvider,
      wallet,
      handleConnect,
      showInputs,
      toggleInputsVisibility,
      handlePayment,
      paymentSettings,
      transactionHash,
      isPaymentConfirmed,
      confirmationProgress,
      isPaymentInitiated,
      exitTransaction,
    };
  }


  async function createOrder(txHash:string){
    const cart = JSON.parse(sessionStorage.getItem('cart') || 'false');
    if (cart) {
      const access_token = localStorage.getItem('access_token')
      if (access_token){
        const user:any = jwt_decode(access_token);
        console.log(user)
        initCheckout(cart,user.sub,txHash);
      }
      
    }
  }
  
  async function getBalance(accounts: string[]) {
    return formatBalance(await window.ethereum!.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    }));
  }
  
  async function getChainId() {
    return await window.ethereum!.request({ method: "eth_chainId" });
  }