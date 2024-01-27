import { useContext, useState } from 'react';
import Head from 'next/head'
import {toast} from 'react-hot-toast';
import { CopyArrayContext } from '@/Lib/CopyArrayContext';
import CompleteMatrixBlock from '@/Components/CompleteMatrixBlock';
import CompleteResultBlock from '@/Components/CompleteResultBlock';

export default function Transpose(){
    const [ rows, setRows ] = useState(2);
    const [ cols, setCols ] = useState(2);
    const [twoDArray, setTwoDArray] = useState([]);

    const [ transpose, setTranspose ] = useState( undefined );




    // function to find transpose of matrix
    const findTranspose = () => {
        const arr = twoDArray.map( row => [...row]);
        setTranspose(transposeMatrix( arr ));
    }

    // function to handle pasting array
    const { copiedArray, copiedRowsCount, copiedColsCount } = useContext( CopyArrayContext );
    const pasteArray = (rowsRef, colsRef) => {
        if( copiedArray != null ) {
            if ( copiedRowsCount !== copiedColsCount ) {
                toast.error('Rows and Cols should be equal!');
                return;
            }
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

    return(
        <>
        <Head>
            <title>Transpose</title>
            <meta name="description" content="Find Transponse of NxN Matrix" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='h-100 col-lg-11 col-md-12  pt-3' style={{overflowY:'scroll'}} >
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Matrix Transpose: </h3>

            <div className='d-flex flex-wrap'>
                <CompleteMatrixBlock 
                    rows={rows}
                    setRows={setRows}
                    cols={cols}
                    setColumns={setCols}
                    array={twoDArray}
                    setArray={setTwoDArray}
                    setResult={setTranspose}
                    pasteArray={pasteArray}
                />
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                {
                rows && cols &&
                <CompleteResultBlock
                    rows={cols}
                    cols={rows}
                    result={transpose}
                    findResult={findTranspose}
                />
                }
            </div>
        </div>
        </>
    );
}

// function to calculate transpose of matrix
function transposeMatrix(matrix) {
    const n = matrix.length;

    // Create an empty matrix of size n x n for the transpose
    const transpose = new Array(n).fill(0).map(() => new Array(n).fill(0));

    // Compute the transpose
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            transpose[j][i] = matrix[i][j];
        }
    }

    return transpose;
}