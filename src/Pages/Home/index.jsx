import React, { useEffect, useRef, useState } from 'react'
import Button from '../../Components/Button'

const Index = () => {


    const [triangleArray, setTriangleArray] = useState([])
    const [chkMainArr, setChkMainArr] = useState([])
    const [tracedArr, setTracedArr] = useState([])
    const [maxSum, setMaxSum] = useState(0)
    const [refArr, setRefArr] = useState([])

    const ref = useRef()

    // Function to calculate the maximum path sum
    const calculateMax = (triangleArray) => {
        let chkMainArr = [];
        for (const i of triangleArray) {
            chkMainArr.push([...i])
        }
        const length = triangleArray.length;
        for (let i = length - 2; i >= 0; i--) {
            const array1 = triangleArray[i + 1];
            const array2 = triangleArray[i];
            const chkArr2 = chkMainArr[i];
            for (let j = 0; j < array2.length; j++) {
                array2[j] += Math.max(array1[j], array1[j + 1]);
                let max = Math.max(array1[j], array1[j + 1])
                console.log(max);
                if (max == array1[j]) {
                    chkArr2[j] = 'left'
                }
                else {
                    chkArr2[j] = 'right'
                }

            }


        }
        console.log(chkMainArr);
        setChkMainArr(chkMainArr)
        setMaxSum(triangleArray[0][0])

    }

    const handleFileUpload = async (e) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text)

            const lines = text.trim().split('\n');
            const arr = lines.map((line) => line.split(' '));
            for (const i of arr) {
                const ind = i.indexOf("\r");
                console.log(ind);
                if (ind != -1) {
                    i.splice(ind, 1);
                }
            }
            const triangleArray = arr.map((line) => line.map(Number));
            setTriangleArray(triangleArray)
            setRefArr(arr.map((line) => line.map(Number)))
            calculateMax(triangleArray)
        };
        reader.readAsText(e.target.files[0])
    }


    const tracePath = () => {
        const arr = []
        const arr2 = [{
            row: 0,
            col: 0,
        }]
        for (const i of chkMainArr) {
            arr.push([...i])
        }

        for (let i = 0; i < arr.length; i++) {
            if (i == 0) continue;
            const obj = arr2[i - 1]
            if (arr[i][obj.col] == 'left') {
                arr2.push({
                    row: i,
                    col: obj.col
                })
            }
            else {
                arr2.push({
                    row: i,
                    col: obj.col + 1
                })
            }
        }
        setTracedArr([...arr2])
        console.log(arr2);
    }



    useEffect(() => {
        tracePath()
        window.scrollBy({
            top: 0,
            left: ref.current.offsetWidth * 0.5, // Scroll 50% of the window's width to the right
            behavior: 'smooth', // Use 'auto' for instant scrolling
        });
    }, [chkMainArr])



    return (
        <div className='min-h-screen pb-8'>
            {/* Uploader */}
            <div className='flex justify-center mt-4'>
                <div className='sm:w-[50%] w-[100%] flex flex-col'>
                    <label htmlFor="uploader cursor-pointer">Upload file in .txt file</label>
                    <input type="file" id='uploader' onChange={handleFileUpload} className='bg-gray-300 p-2 rounded-lg cursor-pointer' />
                </div>
            </div>

            {
                chkMainArr.length > 0 &&

                <div className='flex flex-center flex-col items-center'>
                    <div className="mt-4 sm:w-[50%] w-[100%] ">
                        <h1 className=''>Maximum Path Sum :<strong>{maxSum}</strong></h1>
                    </div>
                </div>
            }

            {/* Render Tree */}
            <div className='flex justify-center mt-4'>
                <div className='sm:w-[50%] w-[100%] flex flex-col'>
                    <Button handleClick={() => {
                        window.scrollBy({
                            top: 0,
                            left: ref.current.offsetWidth * 0.5,
                            behavior: 'smooth',
                        });
                    }}>
                        Render Tree
                    </Button>
                    <div className='flex justify'>
                        <div className='flex flex-col' ref={ref}>
                            {refArr.map((item, index) => {
                                return (
                                    <div className='flex gap-2 mb-2 justify-center' key={index}>
                                        {item.map((i, ind) => {
                                            return (
                                                <div className={`flex justify-center items-center h-20 w-20 border-black p-2 rounded-lg relative hover:-translate-y-1 transition cursor-pointer tooltip ${tracedArr?.find(s => s?.row == index)?.col == ind ? 'bg-red-200' : 'bg-blue-200'}`} key={ind}>
                                                    {i}
                                                    <span className="tooltiptext p-2 text-sm"> Sum at this point is : {triangleArray[index][ind]}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reference */}

            {
                chkMainArr.length > 0 &&
                <div className='flex flex-col mt-4 items-center'>
                    <div className='text-base lex mt-4 sm:w-[50%] w-[100%] '>
                        Reference
                    </div>
                    <div className="flex mt-4 sm:w-[50%] w-[100%] items-center gap-2 ">
                        <div className='w-4 h-4 rounded-full bg-red-200'></div>
                        Used Path
                    </div>
                    <div className="flex mt-4 sm:w-[50%] w-[100%] items-center gap-2 ">
                        <div className='w-4 h-4 rounded-full bg-blue-200'></div>
                        Not Used Path
                    </div>
                </div>
            }

        </div>
    )
}

export default Index