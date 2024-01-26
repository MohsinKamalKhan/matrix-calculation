import { useEffect, useState } from 'react';
import SetRowsColumns from '@/Components/SetRowsColumns';
import MatrixRepresentation from '@/Components/MatrixRepresentation';
import { toast } from 'react-hot-toast'
import { useCopiedArray } from '@/Lib/StorageContext';
import Head from 'next/head'

export default function MultiplicationIndex(){
    const [ rowsFirst, setRowsFirst ] = useState(2);
    const [ colsFirst, setColsFirst ] = useState( 2 );

    const [ rowsSecond, setRowsSecond] = useState( 2 );
    const [ colsSecond, setColsSecond] = useState( 2 );

    const [twoDArrayFirst, setTwoDArrayFirst] = useState([]);
    const [twoDArraySecond, setTwoDArraySecond] = useState([]);

    const [ multiplication, setMultiplication ] = useState( undefined );

    const onChangeForMultiplication = () => {
        setMultiplication( undefined );
    }
    function deepCopy(arr) {
        return arr.map(row => [...row]);
    }
    const findFirst = () => {
        const arr = deepCopy( twoDArrayFirst );
        const arr2 = deepCopy( twoDArraySecond );

        let matrixA = arr;
        let matrixB = arr2;

        let result = [];

        console.log( matrixA[0].length , matrixB.length )
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

    const { copiedArray, copiedRowsCount, copiedColsCount } = useCopiedArray();
    const PasteFirstArray = ( rowsRef, colsRef ) => {
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
    const PasteSecondArray = ( rowsRef, colsRef ) => {
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

    useEffect( ()=> {
        handleScroll();
    }, [multiplication]);
    const handleScroll = () => {
        const targetElement = document.getElementById('yourH3Id');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
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
                <div className='col-md-6 p-md-2 p-3'>
                    <SetRowsColumns pasteArray={PasteFirstArray} onChange={onChangeForMultiplication} setColumns={setColsFirst} setRows={setRowsFirst} />
                    { 
                        rowsFirst && colsFirst ?
                        <MatrixRepresentation onChange={onChangeForMultiplication}  rowsCount={rowsFirst} colsCount={colsFirst} twoDArray={twoDArrayFirst} setTwoDArray={setTwoDArrayFirst} />
                        :
                        <></>
                    }
                </div>

                <div className='col-md-6 p-md-2 p-3' >
                    <SetRowsColumns  pasteArray={PasteSecondArray} onChange={onChangeForMultiplication} setColumns={setColsSecond}  setRows={setRowsSecond} />
                    {
                        rowsSecond && colsSecond ?
                        <MatrixRepresentation onChange={onChangeForMultiplication} rowsCount={rowsSecond} colsCount={colsSecond} twoDArray={twoDArraySecond} setTwoDArray={setTwoDArraySecond} />
                        :
                        <></>
                    }
                </div>
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                <div>
                {
                    rowsFirst && colsFirst && colsFirst && colsSecond ?
                    <button onClick={()=> findFirst() } className="btn btn-primary m-4">
                        Press To Multiply
                    </button>
                    :<></>
                }
                </div>
                <div >
                    <div id="yourH3Id" className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                    {
                        typeof multiplication !== 'undefined' && rowsFirst && colsFirst && colsFirst && colsSecond ?
                        <MatrixRepresentation editable={false} rowsCount={rowsFirst} colsCount={colsSecond} twoDArray={multiplication}  />
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
        </>
    );

}