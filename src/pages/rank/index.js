import { useContext, useState } from 'react';
import Head from 'next/head'
import {toast} from 'react-hot-toast';
import CompleteMatrixBlock from '@/Components/CompleteMatrixBlock';
import { CopyArrayContext } from '@/Lib/CopyArrayContext';

export default function Rank(){

    // start matrix
    const [ rows, setRows ] = useState(2);
    const [ cols, setCols ] = useState(2);
    const [twoDArray, setTwoDArray] = useState([]);

    // result state
    const [ rank, setRank ] = useState( undefined );



    // function to find rank of matrix
    const findRank = () => {
        const arr = twoDArray.map(row => [...row]);
        setRank( rankOfMatrix( arr ) );
    }

    // function to handle pasting an array
    const { copiedArray, copiedRowsCount, copiedColsCount } = useContext( CopyArrayContext );
    const pasteArray = (rowsRef, colsRef) => {
        if( copiedArray != null ) {
            if ( copiedRowsCount !== copiedColsCount ) {
                toast.error('Rows and Cols should be equal!');
                return;
            }
            toast.success('Copied Matrix Pasted!');
            setRows( copiedRowsCount );
            setCols( copiedColsCount );
            setTwoDArray( copiedArray );
            rowsRef.current.value = copiedRowsCount;
            colsRef.current.value = copiedColsCount;
        }else {
            toast.error('No Matrix Copied From Site!');
        }
    };

    return(
        <>
        <Head>
            <title>Rank</title>
            <meta name="description" content="Calculate Rank of Matrix" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='h-100 col-lg-11 col-md-12 pt-3' >
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Matrix Rank: </h3>

            <div className='d-flex flex-wrap'>
                <CompleteMatrixBlock 
                    rows={rows}
                    setRows={setRows}
                    cols={cols}
                    setColumns={setCols}
                    array={twoDArray}
                    setArray={setTwoDArray}
                    setResult={setRank}
                    pasteArray={pasteArray}
                />
            </div>
            <div className='d-flex col-md-11 flex-wrap p-md-2 p-3' >
                { rows && cols &&
                    <>
                    <div>
                        <button onClick={()=> findRank() } className="btn btn-primary m-4">
                            Calculate Rank
                        </button>
                    </div>
                    <div >
                        <div className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                        {
                            typeof rank !== 'undefined'   &&
                            <div className='bg-dark h4 text-white fw-bold fst-italic d-inline p-2'>
                                The Rank is {rank}
                            </div>
                        }
                    </div>
                    </>
                }
            </div>
        </div>
        </>
    );

}

// function to calculate rank of matrix
function rankOfMatrix(matrix) {
    function swapRows(matrix, row1, row2) {
        [matrix[row1], matrix[row2]] = [matrix[row2], matrix[row1]];
    }
    function makePivot(matrix, pivotRow, pivotCol) {
        const numRows = matrix.length;
        const pivotValue = matrix[pivotRow][pivotCol];
    
        for (let i = pivotRow + 1; i < numRows; i++) {
            const factor = matrix[i][pivotCol] / pivotValue;
            for (let j = pivotCol; j < matrix[i].length; j++) {
                matrix[i][j] -= factor * matrix[pivotRow][j];
            }
        }
    }
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let rank = 0;

    let pivotRow = 0;
    for (let pivotCol = 0; pivotCol < numCols && pivotRow < numRows; pivotCol++) {
        let found = false;

        for (let i = pivotRow; i < numRows; i++) {
            if (matrix[i][pivotCol] !== 0) {
                swapRows(matrix, pivotRow, i);
                found = true;
                break;
            }
        }

        if (found) {
            makePivot(matrix, pivotRow, pivotCol);
            rank++;
            pivotRow++;
        }
    }

    return rank;
}