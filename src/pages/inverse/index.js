import { useContext, useState } from 'react';
import Fraction from 'fraction.js';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import CompleteMatrixBlock from '@/Components/CompleteMatrixBlock';
import CompleteResultBlock from '@/Components/CompleteResultBlock';
import { CopyArrayContext } from '@/Lib/CopyArrayContext';

export default function Inverse(){

    // Matrix
    const [ rows, setRows ] = useState(2);
    const [ cols, setCols ] = useState(2);
    const [twoDArray, setTwoDArray] = useState([]);

    // Result
    const [ inverse, setInverse ] = useState( undefined );


    // function to find inverse
    const findInverse = () => {
        const arr = twoDArray.map(row => [...row]);
        setInverse(matrixInverse( arr ));
    }

    // function to handle pasting of matrix
    const { copiedArray, copiedRowsCount, copiedColsCount } = useContext(CopyArrayContext);
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
            <title>Inverse</title>
            <meta name="description" content="Calculate Inverse of Matrix" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='h-100 col-lg-11 col-md-12 pt-3' style={{overflowY:'scroll'}} >
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Matrix Inverse: </h3>

            <div className='d-flex flex-wrap'>
                <CompleteMatrixBlock
                    rows={rows}
                    setRows={setRows}
                    cols={cols}
                    setColumns={setCols}
                    array={twoDArray}
                    setArray={setTwoDArray}
                    setResult={setInverse}
                    pasteArray={pasteArray}
                />
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                {
                    inverse !== -1 ?
                        <CompleteResultBlock
                            rows={rows}
                            cols={cols}
                            result={inverse}
                            findResult={findInverse}
                        />
                    :
                        <div className='bg-dark h4 text-white fw-bold fst-italic d-inline p-2'>
                            The Inverse does not exist
                        </div>
                }
            </div>
        </div>
        </>
    );


}

// function to calculate inverse
function matrixInverse(matrix) {
    const n = matrix.length;

    // Convert matrix to fractions
    const fractionMatrix = matrix.map(row => row.map(element => new Fraction(element)));

    // Augment the matrix with the identity matrix
    const augmentedMatrix = new Array(n).fill(0).map((row, i) => {
        return [...fractionMatrix[i], ...new Array(n).fill(0).map((_, j) => i === j ? new Fraction(1) : new Fraction(0))];
    });

    // Perform Gauss-Jordan elimination to get the inverse
    for (let pivotRow = 0; pivotRow < n; pivotRow++) {
        const pivotValue = augmentedMatrix[pivotRow][pivotRow];
        if (pivotValue.equals(0)) {
            return -1; // Return -1 if inverse does not exist
        }

        for (let j = pivotRow; j < 2 * n; j++) {
            augmentedMatrix[pivotRow][j] = augmentedMatrix[pivotRow][j].div(pivotValue);
        }

        for (let i = 0; i < n; i++) {
            if (i !== pivotRow) {
                const factor = augmentedMatrix[i][pivotRow];
                for (let j = pivotRow; j < 2 * n; j++) {
                    augmentedMatrix[i][j] = augmentedMatrix[i][j].sub(factor.mul(augmentedMatrix[pivotRow][j]));
                }
            }
        }
    }

    // Extract the inverse matrix from the augmented matrix
    const inverseMatrix = augmentedMatrix.map(row => row.slice(n));

    // Convert each fraction to a traditional string format
    const stringInverseMatrix = inverseMatrix.map(row => row.map(element => element.toFraction()));

    return stringInverseMatrix;
}