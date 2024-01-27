import {  useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import Head from 'next/head';
import CompleteMatrixBlock from '@/Components/CompleteMatrixBlock';
import CompleteResultBlock from '@/Components/CompleteResultBlock';
import { CopyArrayContext } from '@/Lib/CopyArrayContext';

export default function AdditionIndex (){

    // First Matrix
    const [ rowsFirst, setRowsFirst ] = useState(2);
    const [ colsFirst, setColsFirst ] = useState( 2 );
    const [twoDArrayFirst, setTwoDArrayFirst] = useState([]);

    // Second Matrix
    const [ rowsSecond, setRowsSecond] = useState( 2 );
    const [ colsSecond, setColsSecond] = useState( 2 );
    const [twoDArraySecond, setTwoDArraySecond] = useState([]);

    // Result
    const [ addition, setaddition ] = useState( undefined );

    // function to find and calculate addition
    const findAddition = () => {
        const matrixA = twoDArrayFirst.map(row => [...row]);
        const matrixB = twoDArraySecond.map(row => [...row]);

        // Check if matrices have the same dimensions
        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
            toast.error('Matrices must have the same dimensions for addition.');
            return;
        }

        const result = [];
        for (let i = 0; i < matrixA.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrixA[0].length; j++) {
                result[i][j] = matrixA[i][j] + matrixB[i][j];
            }
        }
        setaddition(result);
    }

    // Managing Copying the Array
    const { copiedArray, copiedRowsCount, copiedColsCount } = useContext(CopyArrayContext);
    const pasteFirstArray = ( rowsRef, colsRef ) => {
        if( copiedArray != null ) {
            setRowsFirst( copiedRowsCount );
            setColsFirst( copiedColsCount );
            setTwoDArrayFirst( copiedArray );
            rowsRef.current.value = copiedRowsCount;
            colsRef.current.value = copiedColsCount;
            toast.success('Copied Matrix Pasted!');
        } else {
            toast.error('No Matrix Copied From Site!');
        }
    };
    const pasteSecondArray = ( rowsRef, colsRef ) => {
        if ( copiedArray != null ) {
            setColsSecond( copiedColsCount );
            setRowsSecond( copiedRowsCount );
            setTwoDArraySecond( copiedArray );
            rowsRef.current.value = copiedRowsCount;
            colsRef.current.value = copiedColsCount;
            toast.success('Copied Matrix Pasted!');
        } else {
            toast.error('No Matrix Copied From Site!');
        }
    };


    return(
        <>
        <Head>
            <title>Addition</title>
            <meta name="description" content="Matrix Addition" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='h-100  pt-3' style={{overflowY:'scroll'}} >
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Matrix Addition: </h3>

            <div className='d-flex flex-wrap'>
                <CompleteMatrixBlock
                    rows={rowsFirst}
                    setRows={setRowsFirst}
                    cols={colsFirst}
                    setColumns={setColsFirst}
                    array={twoDArrayFirst}
                    setArray={setTwoDArrayFirst}
                    setResult={setaddition}
                    pasteArray={pasteFirstArray}
                />

                <CompleteMatrixBlock
                    rows={rowsSecond}
                    setRows={setRowsSecond}
                    cols={colsSecond}
                    setColumns={setColsSecond}
                    array={twoDArraySecond}
                    setArray={setTwoDArraySecond}
                    setResult={setaddition}
                    pasteArray={pasteSecondArray}
                />
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                {   rowsFirst && colsFirst && colsFirst && colsSecond &&
                    <CompleteResultBlock
                        rows={rowsFirst}
                        cols={colsFirst}
                        result={addition}
                        findResult={findAddition}
                    />
                }
            </div>
        </div>
        </>
    );
}