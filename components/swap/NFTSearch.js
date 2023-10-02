
import React, { useState, useEffect } from 'react'

import { useNetwork, useContractRead, useAccount } from 'wagmi'

import ERC721EnumABI from '../../pages/data/ABI/ERC721Enum.json'


const NFTSearch = ({ formikData, owner, setCollection, setUserCollection, setPairs, setTokens, }) => {


    const handleNFTClick = (nft) => {
        setCollection(nft)
    }

    useEffect(() => {

        const fetchData = async () => {
            if (formikData.golbalParams.networkName && formikData.collection.address) {
                const params = {
                    contractAddress: formikData.collection.address,
                    network: formikData.golbalParams.networkName,
                };

                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                });

                const data = await response.json();

                if (data.success) {
                    const pairsList = data.data
                    const filteredData = pairsList.filter(item => item.type === 'buy' || item.type === 'trade');
                    setPairs(filteredData)

                    const canTradeToken = [...new Set(filteredData.map(item => item.token))].map(token => token === null ? 'ETH' : token);
                    setTokens(canTradeToken)
                }
            }
        }

        fetchData()

    }, [formikData.golbalParams.networkName, formikData.collection.address])


    const { data: bb } = useContractRead({
        address: formikData.collection.address,
        abi: ERC721EnumABI,
        functionName: 'tokensOfOwner',
        args: [owner],
        watch: false,
        onSuccess(data) {
            // console.log('success', data)
            const num = data.map(item => parseInt(item._hex, 16))
            // filter 1155 and 721
            setUserCollection({
                tokenIds721: num
            })
        }
    })





    return (
        <div className="form-control">
            <span className="label-text">NFT</span>

            <button className="btn" onClick={() => document.getElementById('nft_search_sell').showModal()}>
                {(formikData.collection.name) ? formikData.collection.name : "NFT name"}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
            </button>

            <dialog id="nft_search_sell" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">NFT Contract Address:</h3>
                    <div className='input-group'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input type="text" placeholder="NFT Contract Address" className="input input-bordered w-full" />
                    </div>
                    <div className="divider"></div>
                    <h3 className="font-bold text-lg">Collaborative Project:</h3>

                    <form method="dialog" className='flex flex-col space-y-2'>
                        {formikData.golbalParams.recommendNFT.map((nft, index) => (
                            <button
                                key={index}
                                className="btn"
                                onClick={() => handleNFTClick(nft)}>
                                {nft.name}: {nft.address}
                            </button>
                        ))}
                    </form>


                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>


                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>


            </dialog>


        </div>
    )
}

export default NFTSearch