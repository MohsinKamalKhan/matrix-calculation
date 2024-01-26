import {  useState } from 'react';
import SetRowsColumns from '@/Components/SetRowsColumns';
import MatrixRepresentation from '@/Components/MatrixRepresentation';
import { useCopiedArray } from '@/Lib/StorageContext';
import Head from 'next/head'
import { toast } from 'react-hot-toast';

export default function Determinant(){
    const [ rows, setRows ] = useState(2);
    const [cols, setCols] = useState( 2 );
    const [twoDArray, setTwoDArray] = useState([]);

    const [ determinant, setDeterminant ] = useState( undefined );
    const onChangeForDeterminant = () => {
        setDeterminant( undefined );
    }
    function deepCopy(arr) {
        return arr.map(row => [...row]);
    }
    function getCofactor(mat, temp, p, q, n) {
        let i = 0, j = 0;
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                if (row !== p && col !== q) {
                    temp[i][j++] = mat[row][col];
                    if (j === n - 1) {
                        j = 0;
                        i++;
                    }
                }
            }
        }
    }
    function determinantOfMatrix(mat, n) {
        let D = 0;
    
        if (n === 1)
            return mat[0][0];

        // To store cofactors
        const temp = new Array(n).fill(0).map(() => new Array(n).fill(0));
    
        // To store sign multiplier
        let sign = 1;
    
        // Iterate for each element of 
        // first row
        for (let f = 0; f < n; f++) {
            // Getting Cofactor of mat[0][f]
            getCofactor(mat, temp, 0, f, n);
            D += sign * mat[0][f] * determinantOfMatrix(temp, n - 1);
    
            // terms are to be added with alternate sign
            sign = -sign;
        }
    
        return D;
    }
    const findDeterminant = () => {
        const arr = deepCopy(twoDArray);
        setDeterminant(determinantOfMatrix( arr, rows ));
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
            <title>Determinant</title>
            <meta name="description" content="Calculate Determinant of Matrix" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='h-100 col-lg-11 col-md-12  pt-3' style={{overflowY:'scroll'}}>
            <h3 className='fst-italic d-inline-block text-dark mx-5 bg-light display-5'>Matrix Determinant: </h3>


            <div className='d-flex flex-wrap'>
                <div className='col-md-6 p-md-2 p-3'>
                    <SetRowsColumns isCols={false} pasteArray={PasteArray} onChange={onChangeForDeterminant} setColumns={setCols} setRows={setRows} />
                    { 
                        rows && cols ?
                        <MatrixRepresentation onChange={onChangeForDeterminant}  rowsCount={rows} colsCount={cols} twoDArray={twoDArray} setTwoDArray={setTwoDArray} />
                        :
                        <></>
                    }
                </div>
            </div>

            <div className='d-flex flex-wrap p-md-2 p-3'>
                <div>
                {
                    rows && cols ?
                    <button onClick={()=> findDeterminant() } className="btn btn-primary m-4">
                        Calculate Determinant
                    </button>
                    :<></>
                }
                </div>
                <div >
                    <div className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                    {
                        typeof determinant !== 'undefined' && rows && cols  ?
                        <div className='bg-dark h4 text-white fw-bold fst-italic d-inline p-2'>
                            The Determinant is {determinant}
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