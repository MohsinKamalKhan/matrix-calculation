import { useContext, useEffect, useRef, useState } from 'react';
import MatrixRepresentation from '@/Components/MatrixRepresentation';
import { toast } from 'react-hot-toast'
import { CopyArrayContext } from '@/Lib/CopyArrayContext';
import Head from 'next/head';
import CompleteMatrixBlock from '@/Components/CompleteMatrixBlock';

export default function ScalarMultiplicationIndex(){

    // Matrix
    const [ rows, setRows ] = useState(2);
    const [ cols, setCols ] = useState( 2 );
    const [twoDArray, setTwoDArray] = useState([]);

    // Multiply With
    const  inputRef = useRef( null );

    // Result
    const [ multiplication, setMultiplication ] = useState( undefined );

    // function to calculate scalar product
    const findScalarProduct = () => {
        let arr = twoDArray.map( row => [...row] );
        const value = Number( inputRef.current.value );
        for ( let i = 0; i < rows; i++ )
            for ( let j = 0; j < cols; j++)
                arr[i][j] *= value;
        setMultiplication(arr);
    }

    // handling pasting of copied array
    const { copiedArray, copiedRowsCount, copiedColsCount } = useContext(CopyArrayContext);
    const pasteArray = (rowsRef, colsRef) => {
        if( copiedArray != undefined ) {
            setRows( copiedRowsCount );
            setCols( copiedColsCount );
            setTwoDArray( copiedArray );
            rowsRef.current.value = copiedRowsCount;
            colsRef.current.value = copiedColsCount;

            toast.success('Copied Matrix Pasted!');
        }else {
            toast.error('No Matrix Copied From Site!');
        }
    };

    // scrolling to result 
    useEffect( ()=> {
        const targetElement = document.getElementById('result');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [multiplication]);

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
                <CompleteMatrixBlock
                    rows={rows}
                    setRows={setRows}
                    cols={cols}
                    setColumns={setCols}
                    array={twoDArray}
                    setArray={setTwoDArray}
                    setResult={setMultiplication}
                    pasteArray={pasteArray}
                />
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
                    rows && cols &&
                    <button onClick={()=> findScalarProduct() } className="btn btn-primary m-4">
                        Multiply
                    </button>
                }
                </div>
                <div>
                    <div id='result' className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                    {
                        typeof multiplication !== 'undefined' && rows && cols  &&
                        <MatrixRepresentation 
                            editable={false} 
                            rowsCount={rows} 
                            colsCount={cols} 
                            twoDArray={multiplication}  
                        />
                    }
                </div>
            </div>
        </div>

        </>
    );

}