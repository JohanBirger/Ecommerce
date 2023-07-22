import axios from 'axios'
import {bignumber, multiply} from 'mathjs'

export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(4)
    return balance
  }
  
  export const formatChainAsNum = (chainIdHex: string) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
  }

  export const convertDollarEtherWEI = async (totalPrice: number): Promise<string | undefined> => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD');
      const EtherUSD_ExRate = 1/response.data.ethereum.usd;
      const totalPriceEther = totalPrice*EtherUSD_ExRate;
      const totalPriceEtherBigInt = bignumber(totalPriceEther)
      const WEI = bignumber('1e+18');
      const totalWei = multiply(totalPriceEtherBigInt,WEI);
      const totalWeiString = Number(totalWei).toString(16);
     
      return "0x"+totalWeiString;
     
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };