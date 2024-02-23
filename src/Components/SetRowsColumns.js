import { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-hot-toast'

export default function SetRowsColumns({ 
    pasteArray, 
    setResult, 
    setRows, 
    setColumns, 
    isCols
}){

    const rowsRef = useRef( null );
    const colsRef = useRef( null );

    useEffect( () => {
        rowsRef.current.value = 2;
        if( isCols ) colsRef.current.value = 2;
    }, []);

    function settingRows(){
        setResult( undefined );
        const rowsCount = rowsRef.current.value;
        if(Number(rowsCount) > 9 )
            toast.error("Rows should be less than 10!")
        else{
            if ( rowsCount == '' ) {
                setRows( undefined );
                if ( isCols === false ) 
                    setColumns( undefined )
                return;
            }
            setRows( Number(rowsCount) )
            if ( isCols === false ) 
                setColumns( Number(rowsCount) )
        }
    }

    function settingCols(){
        setResult( undefined );
        const colsCount = colsRef.current.value;
        if(Number(colsCount) > 9 )
            toast.error("Cols should be less than 10!")
        else{
            if ( colsCount == '' ) {
                setColumns( undefined );
                return;
            }
            setColumns( Number(colsCount) )
        }
    }

    return(
        <>
        <h3 className='fst-italic d-inline-block text-dark bg-light p-2 h5'>Set Matrix: </h3>
        <button onClick={ () => pasteArray( rowsRef, colsRef ) } className='btn mx-2 btn-sm btn-primary'>Paste Array</button>
        <div className='d-flex flex-wrap' >
        <InputGroup className="mb-2 w-75">
                <InputGroup.Text id="basic-addon1">Set Rows</InputGroup.Text>
                <Form.Control
                    ref={rowsRef}
                    onChange={settingRows}
                    placeholder="Rows"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        <InputGroup className="mb-2 w-75">
            <InputGroup.Text id="basic-addon1">{isCols ? <>Set Cols</> : <>Columns: Same As Rows</>}</InputGroup.Text>
            {
                isCols?
                    <Form.Control
                        ref={colsRef}
                        onChange={settingCols}
                        placeholder="Columns"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                :
                <></>
            }  
        </InputGroup>
        </div>
        </>
    );
}