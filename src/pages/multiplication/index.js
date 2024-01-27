import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast'
import Head from 'next/head';
import CompleteMatrixBlock from '@/Components/CompleteMatrixBlock';
import CompleteResultBlock from '@/Components/CompleteResultBlock';
import { CopyArrayContext } from '@/Lib/CopyArrayContext';

export default function MultiplicationIndex(){

    // first matrix
    const [ rowsFirst, setRowsFirst ] = useState(2);
    const [ colsFirst, setColsFirst ] = useState( 2 );
    const [twoDArrayFirst, setTwoDArrayFirst] = useState([]);

    // second matrix
    const [ rowsSecond, setRowsSecond] = useState( 2 );
    const [ colsSecond, setColsSecond] = useState( 2 );
    const [twoDArraySecond, setTwoDArraySecond] = useState([]);

    // result
    const [ multiplication, setMultiplication ] = useState( undefined );

    // function to calculate and find matrix multiplication
    const findMultiplication = () => {
        let matrixA = twoDArrayFirst.map(row => [...row]);
        let matrixB = twoDArraySecond.map(row => [...row]);

        let result = [];
        // Check if matrices can be multiplied
        if (matrixA[0].length !== matrixB.length) {
            toast.error('Matrices cannot be multiplied. Invalid dimensions.');
            return;
        }

        const numRowsA = matrixA.length;
        const numColsA = matrixA[0].length;
        const numColsB = matrixB[0].length;

        // Initialize result matrix with zeros
        for (let i = 0; i < numRowsA; i++) {
            result[i] = [];
            for (let j = 0; j < numColsB; j++) {
                result[i][j] = 0;
            }
        }

        // Perform matrix multiplication
        for (let i = 0; i < numRowsA; i++) {
            for (let j = 0; j < numColsB; j++) {
            for (let k = 0; k < numColsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
            }
        }

        setMultiplication(result);
    }

    // handling pasting array
    const { copiedArray, copiedRowsCount, copiedColsCount } = useContext( CopyArrayContext );
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
            <title>Multiplication</title>
            <meta name="description" content="Calculate Multiplication of two matrices" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='h-100  pt-3' style={{overflowY:'scroll'}} >
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Matrix Multiplication: </h3>
            <div className='d-flex flex-wrap'>
                <CompleteMatrixBlock
                    rows={rowsFirst}
                    setRows={setRowsFirst}
                    cols={colsFirst}
                    setColumns={setColsFirst}
                    array={twoDArrayFirst}
                    setArray={setTwoDArrayFirst}
                    setResult={setMultiplication}
                    pasteArray={pasteFirstArray}
                />

                <CompleteMatrixBlock
                    rows={rowsSecond}
                    setRows={setRowsSecond}
                    cols={colsSecond}
                    setColumns={setColsSecond}
                    array={twoDArraySecond}
                    setArray={setTwoDArraySecond}
                    setResult={setMultiplication}
                    pasteArray={pasteSecondArray}
                />
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                {   rowsFirst && colsFirst && colsFirst && colsSecond  &&
                    <CompleteResultBlock
                        rows={rowsFirst}
                        cols={colsSecond}
                        result={multiplication}
                        findResult={findMultiplication}
                    />
                }
            </div>
        </div>
        </>
    );

}

