import React, { useState } from 'react'
import { ethers } from 'ethers'

import { useNetwork, useContractRead, useContractReads, useContractWrite, useAccount, erc20ABI } from 'wagmi'
import ERC721EnumABI from '../../pages/data/ABI/ERC721Enum.json'
import ERC1155ABI from '../../pages/data/ABI/ERC1155.json'



const SwapButton = ({ formikData, owner }) => {

    const [nftApproval, setNftApproval] = useState(false)
    // const { erc20Approval, setErc20Approval } = useState(false)



    const { data: nftApprovalData } = useContractRead({
        address: formikData.collection.address,
        abi: ERC721EnumABI,
        functionName: 'isApprovedForAll',
        args: [owner, formikData.golbalParams.router],
        watch: true,
        onSuccess(data) {
            console.log('nft approval', data)
            if (data) {
                setNftApproval(true)
            }
        }
    })


    const { data: approveNFTData, write: approveNFT } = useContractWrite({
        address: formikData.collection.address,
        abi: ERC721EnumABI,
        functionName: 'setApprovalForAll',
        args: [formikData.golbalParams.router, true],

    })


    // const { data: erc20AllowanceData } = useContractRead({
    //     address: (formikData.token && formikData.token !== "ETH" ? formikData.token : null),
    //     abi: erc20ABI,
    //     functionName: 'allowance',
    //     args: [owner, formikData.golbalParams.router],
    //     watch: true,
    //     onSuccess(data) {
    //         if (!data.gte(formikData.totalCost)) {
    //             console.log('not enought')
    //         } else {
    //             console.log('ok')
    //             setErc20Approval(true)
    //         }
    //     }
    // })



    // const { data: bb } = useContractReads(
    //     {
    //         contracts: [
    //             // nft approval
    //             // {
    //             //     address: formikData.collection.address,
    //             //     abi: ERC721EnumABI,
    //             //     functionName: 'isApprovedForAll',
    //             //     args: [owner, formikData.golbalParams.router],
    //             //     watch: false,
    //             // },
    //             // erc20 approval
    //             {
    //                 address: (formikData.token && formikData.token !== "ETH" ? formikData.token : null),
    //                 abi: erc20ABI,
    //                 functionName: 'allowance',
    //                 args: [owner, formikData.golbalParams.router],
    //                 watch: false,
    //             }
    //         ],
    //         onSuccess(data) {
    //             // console.log('success', data)
    //             // const num = data.map(item => parseInt(item._hex, 16))
    //             // // filter 1155 and 721
    //             // setUserCollection({
    //             //     tokenIds721: num
    //             // })
    //         }
    //     }
    // )

    const buttonText = () => {
        let text

        if (!owner) {
            text = 'connect wallet'
            return (<div>
                {text}
            </div>)

        }

        if (!formikData.collection.address || !formikData.token) {
            text = 'select nft and token first'
            return (<div>
                {text}
            </div>)
        }

        if (!nftApproval) {
            text = 'approve your nft to router'
            return (
                <button onClick={() => approveNFT()}>
                    {text}
                </button>
            )
        }


        return <div>
            swap
        </div>
    }



    return (
        <button className="btn mx-6 p-12">
            {buttonText()}
        </button>
    )
}

export default SwapButton