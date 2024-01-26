import { useEffect, useState } from 'react';
import SetRowsColumns from '@/Components/SetRowsColumns';
import MatrixRepresentation from '@/Components/MatrixRepresentation';
import { toast } from 'react-hot-toast';
import { useCopiedArray } from '@/Lib/StorageContext';
import Head from 'next/head';

export default function AdditionIndex (){
    const [ rowsFirst, setRowsFirst ] = useState(2);
    const [ colsFirst, setColsFirst ] = useState( 2 );
    const [ rowsSecond, setRowsSecond] = useState( 2 );
    const [ colsSecond, setColsSecond] = useState( 2 );

    const [twoDArrayFirst, setTwoDArrayFirst] = useState([]);
    const [twoDArraySecond, setTwoDArraySecond] = useState([]);

    const [ addition, setaddition ] = useState( undefined );

    const onChangeForaddition = () => {
        setaddition( undefined );
    }
    function deepCopy(arr) {
        return arr.map(row => [...row]);
    }
    const findFirst = () => {
        const matrixA = deepCopy(twoDArrayFirst);
        const matrixB = deepCopy(twoDArraySecond);

        // Check if matrices have the same dimensions
        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
            toast.error('Matrices must have the same dimensions for addition.');
            console.log( matrixA.length,matrixB.length, matrixB[0].length, matrixA[0].length)
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
        handleScroll();
    }

    // Managing Copying the Array
    const { copiedArray, copiedRowsCount, copiedColsCount } = useCopiedArray();
    const PasteFirstArray = ( rowsRef, colsRef ) => {
        if( copiedArray != null ) {

            setRowsFirst( copiedRowsCount );
            setColsFirst( copiedColsCount );

            const arr = deepCopy( copiedArray );
            setTwoDArrayFirst( arr );

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

            const arr = deepCopy( copiedArray );
            setTwoDArraySecond( arr );
            rowsRef.current.value = copiedRowsCount;
            colsRef.current.value = copiedColsCount;
            toast.success('Copied Matrix Pasted!');
        } else {
            toast.error('No Matrix Copied From Site!');
        }
    };

    useEffect( ()=> {
        handleScroll();
    }, [addition]);
    const handleScroll = () => {
        const targetElement = document.getElementById('yourH3Id');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
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
                <div className='col-md-6 p-md-2 p-3'>
                    <SetRowsColumns  pasteArray={PasteFirstArray} onChange={onChangeForaddition} setColumns={setColsFirst} setRows={setRowsFirst} />
                    { 
                        rowsFirst && colsFirst ?
                        <MatrixRepresentation onChange={onChangeForaddition}  rowsCount={rowsFirst} colsCount={colsFirst} twoDArray={twoDArrayFirst} setTwoDArray={setTwoDArrayFirst} />
                        :
                        <></>
                    }
                </div>

                <div className='col-md-6 p-md-2 p-3' >
                    <SetRowsColumns rows={rowsSecond} cols={colsSecond}  pasteArray={PasteSecondArray} onChange={onChangeForaddition} setColumns={setColsSecond}  setRows={setRowsSecond} />
                    {
                        rowsSecond && colsSecond ?
                        <MatrixRepresentation onChange={onChangeForaddition} rowsCount={rowsSecond} colsCount={colsSecond} twoDArray={twoDArraySecond} setTwoDArray={setTwoDArraySecond} />
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
                        Press To Add
                    </button>
                    :<></>
                }
                </div>
                <div >
                    <div id="yourH3Id" className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                    {
                        typeof addition !== 'undefined' && rowsFirst && colsFirst && colsFirst && colsSecond ?
                        <MatrixRepresentation editable={false} rowsCount={rowsSecond} colsCount={colsSecond} twoDArray={addition}  />
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
        </>
    );
}