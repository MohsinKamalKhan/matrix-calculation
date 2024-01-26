import { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-hot-toast'

export default function SetRowsColumns({ pasteArray, onChange, setRows, setColumns, isCols = true}){
    const rowsRef = useRef( null );
    const colsRef = useRef( null );

    useEffect( () => {
        rowsRef.current.value = 2;
        if( isCols ) colsRef.current.value = 2;
    }, []);

    function settingRows(){
        onChange();
        if(Number(rowsRef.current.value) > 9 )
            toast.error("Rows should be less than 10!")
        else{
            setRows( Number(rowsRef.current.value) )
            if ( isCols === false ) 
                setColumns( Number(rowsRef.current.value) )
        }
    }

    function settingCols(){
        onChange();
        if(Number(colsRef.current.value) > 9 )
            toast.error("Cols should be less than 10!")
        else
            setColumns( Number(colsRef.current.value) )
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