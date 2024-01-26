import { useEffect, useRef, useState } from 'react';
import SetRowsColumns from '@/Components/SetRowsColumns';
import MatrixRepresentation from '@/Components/MatrixRepresentation';
import { toast } from 'react-hot-toast'
import { useCopiedArray } from '@/Lib/StorageContext';
import Head from 'next/head'

export default function ScalarMultiplicationIndex(){
    const [ rowsFirst, setRowsFirst ] = useState(2);
    const [ colsFirst, setColsFirst ] = useState( 2 );

    const [twoDArrayFirst, setTwoDArrayFirst] = useState([]);

    const  inputRef = useRef( null );

    const [ multiplication, setMultiplication ] = useState( undefined );

    const onChangeForMultiplication = () => {
        setMultiplication( undefined );
    }
    function deepCopy(arr) {
        return arr.map(row => [...row]);
    }
    const findFirst = () => {
        let arr = deepCopy( twoDArrayFirst );
        const value = Number( inputRef.current.value );
        for ( let i = 0; i < rowsFirst; i++ )
            for ( let j = 0; j < colsFirst; j++)
                arr[i][j] *= value;
        setMultiplication(arr);
        handleScroll();
    }

    const { copiedArray, copiedRowsCount, copiedColsCount } = useCopiedArray();
    const PasteFirstArray = (rowsRef, colsRef) => {
        if( copiedArray != null ) {
            if ( copiedRowsCount !== copiedColsCount ) {
                toast.error('Rows and Cols should be equal!');
                return;
            }
            toast.success('Copied Matrix Pasted!');
            setRowsFirst( copiedRowsCount );
            setColsFirst( copiedColsCount );
            setTwoDArrayFirst( copiedArray );
            rowsRef.current.value = copiedRowsCount;
            colsRef.current.value = copiedColsCount;
        }else {
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
            <title>Scalar Multiplication</title>
            <meta name="description" content="Calculate Scalar Multiplication of Matrix" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='h-100 col-lg-11 col-md-12 pt-3' style={{overflowY:'scroll'}} >
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Scalar multiplication: </h3>


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
                    <h3 className='fst-italic d-inline-block text-dark bg-light p-2 h5'>Multiply With: </h3>
                    <div>
                        <input ref={inputRef} style={{ width:'50px'}} type="text" />
                    </div>
                </div>
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                <div>
                {
                    rowsFirst && colsFirst ?
                    <button onClick={()=> findFirst() } className="btn btn-primary m-4">
                        Multiply
                    </button>
                    :<></>
                }
                </div>
                
                <div >
                    <div id='yourH3Id' className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                    {
                        typeof multiplication !== 'undefined' && rowsFirst && colsFirst  ?
                        <MatrixRepresentation editable={false} rowsCount={rowsFirst} colsCount={colsFirst} twoDArray={multiplication}  />
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
        </>
    );

}