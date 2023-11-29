import { useCollection } from "@/contexts/CollectionContext";
import { REDIRECT_URL } from "@/config/constant";

const ButtonGroup = ({ collectionName, contractAddress, collectionType,chainId, type, tokenId1155 }) => {
  const { openPopup } = useCollection();

  function handleBuyClick() {
    // openPopup("BUY", collectionName);
  }

  function handleSellClick() {
    // openPopup("SELL", collectionName);
  }

  function handlePlaceBidClick() {
    // openPopup("PLACEBIDS", collectionName);

    let url = `${REDIRECT_URL}#/pool/create?contractAddress=${contractAddress}&collectionType=${collectionType}&chainId=${chainId}&poolType=0`;
    url = type==="ERC1155" ? url+`&tokenId=${tokenId1155}` : url;

    window.open(url, `newTab_${Date.now()}`);
  }

  function handleDepositClick() {
    // openPopup("DEPOSIT", collectionName);

    let url = `${REDIRECT_URL}#/pool/create?contractAddress=${contractAddress}&collectionType=${collectionType}&chainId=${chainId}&poolType=1`;
    url = type==="ERC1155" ? url+`&tokenId=${tokenId1155}` : url;

    window.open(url, `newTab_${Date.now()}`);
  }
  return (
    <section className="flex items-center justify-start gap-x-2 md:gap-x-4 lg:gap-x-8">
      <button
        className="btn ezBtn ezBtnPrimaryOutline  btn-xs lg:btn-sm w-16 sm:w-20 md:w-[6.4rem] lg:w-32 h-10 lg:h-11"
        onClick={handleBuyClick}
      >
        Buy
      </button>
      <button
        className="btn ezBtn ezBtnPrimaryOutline btn-xs lg:btn-sm w-16 sm:w-20 md:w-[6.4rem] lg:w-32 h-10 lg:h-11"
        onClick={handleSellClick}
      >
        Quick Sell
      </button>
      <button
        className="btn ezBtn ezBtnPrimary btn-xs lg:btn-sm w-16 sm:w-20 md:w-[6.4rem] lg:w-32 h-10 lg:h-11"
        onClick={handlePlaceBidClick}
      >
        Place Bid
      </button>
      <button
        className="btn ezBtn ezBtnPrimary btn-xs lg:btn-sm w-16 sm:w-20 md:w-[6.4rem] lg:w-32 h-10 lg:h-11"
        onClick={handleDepositClick}
      >
        Deposit NFT
      </button>
    </section>
  );
};

export default ButtonGroup;
