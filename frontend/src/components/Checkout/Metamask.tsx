import { useState, useEffect } from 'react';
import { convertDollarEtherWEI, formatBalance, formatChainAsNum } from '../../services/utils';
import detectEthereumProvider from '@metamask/detect-provider';
import { Link } from 'react-router-dom';
import { getCheckout } from '../../services/Checkout/CheckoutService';
import {ethers}  from 'ethers'; 
import { closeMetamaskModal } from '../../services/ModalService';

import {cross} from 'react-icons-kit/icomoon/cross';
import {Icon} from 'react-icons-kit';
import { useMetamask } from '../../services/Checkout/PaymentService';
import CircularProgress from '@mui/material/CircularProgress';
import { getSessionUser } from '../../services/sessionService';
import jwt_decode from 'jwt-decode';
import { deleteCart } from '../../services/Cart/CartServices';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // replace '#root' with the id of your root element


// Define a type for the wallet state
interface WalletState {
    accounts: string[];
    balance: string;
    chainId: string;
  }
  
  // Define a type for the settings
  interface PaymentSettings {
    gasLimit: string;
    setGasLimit: (value: string) => void;   
    maxPriorityFeePerGas: string;
    setMaxPriorityFeePerGas: (value: string) => void;
    maxFeePerGas: string;
    setMaxFeePerGas: (value: string) => void;
  }

  interface ToggleInputButtonProps {
    showInputs: boolean;
    handleClick: () => void;
  }

    
  interface PaymentInputProps {
    value: string;
    setter: (value: string) => void;
    placeholder: string;
  }

  // The props for PaymentButton
interface PaymentButtonProps {
    handleClick: () => void;
    isPaymentInitiated: boolean;
  }

    // The props for CloseButton
  interface CloseButtonProps {
    closeMetamaskModal: () => void;
  }


  // The props for ConnectButton
  interface ConnectButtonProps {
    handleClick: () => void;
  }

  // The props for MetamaskLink
  interface MetamaskLinkProps {
    providerExists: boolean | null;
  }


  // The props for AccountInfo
  interface AccountInfoProps {
    wallet: WalletState;
    showInputs: boolean;
    toggleInputs: () => void;
    paymentSettings: PaymentSettings;
    handlePayment: () => void;
  }

    // The props for TransactionLink
    interface TransactionLinkProps {
        transactionHash: string;
      }

    interface TransactionStatusProps{
        isPaymentConfirmed: boolean;
        confirmationProgress: string|null;
    }
  

const Metamask = () => {
    const [amount, setAmount] = useState(0);
    const [userId,setUserId] = useState("");

    const {
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
      exitTransaction
    } = useMetamask();

    useEffect(() => {
        const fetchCartTotal = async () => {
          
          const checkoutSession = await getCheckout();
          if (checkoutSession && checkoutSession.totalPrice){
            const cart = JSON.parse(sessionStorage.getItem('cart')||'Error')
            console.log('cartfromsessionstorage',cart.totalPrice)
            await setAmount(cart.totalPrice);
            await console.log(amount)
          }
          try {
            const access_token = localStorage.getItem('access_token');

          if (access_token) {
            const decodedToken: any = jwt_decode(access_token); // Decode the access token
            const user: string = decodedToken.sub; // Extract the user ID from the decoded token
            setUserId(user)
          } else{
            const visitor_token: string = localStorage.getItem('visitor_token') || '';
            setUserId(visitor_token);
          }
        } catch (error){
          console.error(error)
        }

        };
      
        fetchCartTotal();
        return () => { // This function is the cleanup function
          if (isPaymentConfirmed) {
            deleteCart();
            exitTransaction();
          }
        };
        
      }, [isPaymentConfirmed]);




const AccountTable = ({ wallet }: { wallet: WalletState }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <table className="table-auto">
        <tbody>
          <tr className="border-t border-gray-200">
            <td className="px-4">Wallet:</td>
            <td className="px-4 cool-font block hover:bg-gray-300 hover:cursor-pointer bg-gray-200 rounded-full" onClick={() => setModalIsOpen(true)}>
              {wallet.accounts[0].substring(0, 6) + '...'}
            </td>
          </tr>
          <tr className="border-t border-gray-200">
              <td className="px-4">Balance:</td>
              <td className="px-4 cool-font">{wallet.balance}</td> 
            </tr>  
            <tr className="border-t border-gray-200">
              <td className="px-4">ChainId:</td>
              <td className="px-4 cool-font">{formatChainAsNum(wallet.chainId)}</td> 
            </tr>
        </tbody>
      </table>

      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Account Modal"
        style={{
          overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
              width: 'auto',
              maxWidth: '30rem',
              maxHeight: '5rem',
              height: 'auto',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              overflow:"hidden",
          },
          }}
      >
        <button 
        className="absolute top-0 right-0 m-2" 
        onClick={() => setModalIsOpen(false)}
        >
        <Icon icon = {cross}/>
        </button>
        <div>{wallet.accounts[0]}</div>
      </Modal>
    </div>
  );
};


const SwitchAccountButton = () => (
    !isPaymentInitiated ? 
    <button 
        className="btn-wide m-2" 
        onClick={() => alert('To switch accounts, please select a different account in the MetaMask interface.')}
    >
        Switch Account
    </button> : null
);


  
  const ToggleInputButton = ({ showInputs, handleClick }: ToggleInputButtonProps) => (
    !isPaymentInitiated ? 
 
    <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={showInputs}
          onChange={handleClick}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-black">
          {showInputs ? 'Hide' : 'Show'} Payment Settings
        </span>
      </label>

    
    
    : null
  );

  
  const PaymentInput = ({ value, setter, placeholder }: PaymentInputProps) => (
    <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4" 
        type="text" 
        value={value} 
        onChange={e => setter(e.target.value)} 
        placeholder={placeholder}
    />
  );

const PaymentSettings =  ({ showInputs, settings, isPaymentInitiated }: { showInputs: boolean, settings: PaymentSettings , isPaymentInitiated:boolean}) => (
    showInputs && !isPaymentInitiated ?
    <>
        <PaymentInput 
            value={settings.gasLimit} 
            setter={settings.setGasLimit} 
            placeholder="Enter Gas Limit"
        />
        <PaymentInput 
            value={settings.maxPriorityFeePerGas} 
            setter={settings.setMaxPriorityFeePerGas} 
            placeholder="Enter Max Priority Fee Per Gas"
        />
        <PaymentInput 
            value={settings.maxFeePerGas} 
            setter={settings.setMaxFeePerGas} 
            placeholder="Enter Max Fee Per Gas"
        />
    </>
    : null
);

  const PaymentButton = ({ handleClick, isPaymentInitiated }: PaymentButtonProps) => (

    !isPaymentInitiated ? (<>
    
    <button 
        className="btn-wide-action m-2" 
        onClick={handleClick}
    >
        Pay with Metamask
    </button>
    </>):null
    
  );
  

  const CloseButton = ({ closeMetamaskModal }: CloseButtonProps) => (
    <button 
        className="absolute top-0 right-0 m-2" 
        onClick={closeMetamaskModal}
    >
        <Icon icon = {cross} />
    </button>
  );
  
  
  
  const MetamaskLink = ({ providerExists }: MetamaskLinkProps) => (
    providerExists ?
    <>
    </>
    :

        <Link 
            className="text-blue-500 hover:underline" 
            to={providerExists ? '' : "https://metamask.io/download/"} 
        >
            {providerExists ? '' : 'Please install Metamask'} 
        </Link>
  );
  
  
  const ConnectButton = ({ handleClick }: ConnectButtonProps) => (
    window.ethereum?.isMetaMask && wallet.accounts.length === 0 && 
    <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={handleClick}
    >
        Connect MetaMask
    </button>
  );
  
  const AccountInfo = ({ wallet, showInputs, toggleInputs, paymentSettings }: AccountInfoProps) => (
    wallet.accounts.length > 0 ?
    <>   
        <AccountTable wallet={wallet} />
        <SwitchAccountButton />
       
        
        <PaymentButton handleClick={() => handlePayment(amount)} isPaymentInitiated={isPaymentInitiated} />    
        <ToggleInputButton showInputs={showInputs} handleClick={toggleInputs} />              
        <PaymentSettings showInputs={showInputs} settings={paymentSettings} isPaymentInitiated={isPaymentInitiated}/>                              
    </>
    : null
  );

  const TransactionConfirmed = ({isPaymentConfirmed,confirmationProgress} :TransactionStatusProps) =>{
    useEffect(() => {
        
      }, [confirmationProgress]);

    return isPaymentConfirmed ? 
        <>
        <p className='text-green-500 text-lg py-4'>Transaction Completed</p>
       
        </>
    :
    <>
   { isPaymentInitiated && confirmationProgress ? (
        <div className='py-4 flex flex-col justify-center items-center'>
            <p className='pb-2'>Payment in progress...</p>
          <CircularProgress variant="determinate" value={Number(confirmationProgress)} />
        </div>
      ):
      (
        <div className='text-lg text-yellow-500 py-4'>
        Awaiting confirmation...
        </div>
        )
      }
    </>
  }
  
  const TransactionLink = ({ transactionHash }: TransactionLinkProps) => (
    transactionHash ? (
        <p className="max-w-full my-4 px-2 scrollable-row">
            View most recent transaction{" "}
            <a
            className="text-blue-500 hover:underline cool-font" 
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
           
            target="_blank"
            rel="noopener noreferrer"
            >
            {transactionHash.substring(0, 6) + '...'}
            </a>
        </p>
    ) : null
  );


  const OrdersLink = ({isPaymentConfirmed, userId}:{isPaymentConfirmed:boolean, userId:string})=>{
    return  isPaymentConfirmed ? (<button className='btn-wide'><Link to={`/orders/${userId}`}>Go to Orders</Link></button>):null
  }
  
  return  (
  
    <div className="flex flex-col items-center justify-center mx-auto max-w-full">
      <CloseButton closeMetamaskModal={closeMetamaskModal} />
      <TransactionConfirmed isPaymentConfirmed={isPaymentConfirmed} confirmationProgress={confirmationProgress}/>
      <OrdersLink isPaymentConfirmed={isPaymentConfirmed} userId={userId}/>
      <MetamaskLink providerExists={hasProvider} />
      <ConnectButton handleClick={handleConnect} />
      <AccountInfo 
        wallet={wallet} 
        showInputs={showInputs} 
        toggleInputs={toggleInputsVisibility} 
        paymentSettings={paymentSettings}
        handlePayment={() => handlePayment(amount)}
      />
      <TransactionLink transactionHash={transactionHash} />
    </div>
    
  )
}
export default Metamask;
