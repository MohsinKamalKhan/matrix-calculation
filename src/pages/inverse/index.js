import { useState } from 'react';
import SetRowsColumns from '@/Components/SetRowsColumns';
import MatrixRepresentation from '@/Components/MatrixRepresentation';
import Fraction from 'fraction.js';
import { useCopiedArray } from '@/Lib/StorageContext';
import Head from 'next/head';
import { toast } from 'react-hot-toast';

export default function Inverse(){
    const [ rows, setRows ] = useState(2);
    const [ cols, setCols ] = useState(2);
    const [twoDArray, setTwoDArray] = useState([]);


    const [ inverse, setInverse ] = useState( undefined );

    function deepCopy(arr) {
        return arr.map(row => [...row]);
    }
    const onChangeForInverse = () => {
        setInverse( undefined );
    }
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
    const findInverse = () => {
        const arr = deepCopy( twoDArray );
        setInverse(matrixInverse( arr ));
    }

    const { copiedArray, copiedRowsCount, copiedColsCount } = useCopiedArray();
    const PasteArray = (rowsRef, colsRef) => {
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
            <title>Inverse</title>
            <meta name="description" content="Calculate Inverse of Matrix" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='h-100 col-lg-11 col-md-12 pt-3' style={{overflowY:'scroll'}} >
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Matrix Inverse: </h3>

            <div className='d-flex flex-wrap'>
                <div className='col-md-6 p-md-2 p-3'>
                    <SetRowsColumns isCols={false} pasteArray={PasteArray} onChange={onChangeForInverse} setColumns={setCols} setRows={setRows} />
                    { 
                        rows && cols ?
                        <MatrixRepresentation onChange={onChangeForInverse}  rowsCount={rows} colsCount={cols} twoDArray={twoDArray} setTwoDArray={setTwoDArray} />
                        :
                        <></>
                    }
                </div>
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                <div>
                {
                    rows && cols ?
                    <button onClick={()=> findInverse() } className="btn btn-primary m-4">
                        Calculate Inverse
                    </button>
                    :<></>
                }
                </div>
                <div >
                    <div className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                    {
                        typeof inverse !== 'undefined' && rows && cols  ?
                        inverse !== -1 ?
                        <MatrixRepresentation editable={false} rowsCount={rows} colsCount={cols} twoDArray={inverse}  />
                        :
                        <div className='bg-dark h4 text-white fw-bold fst-italic d-inline p-2'>
                            The Inverse does not exist
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
        </>
    );


}