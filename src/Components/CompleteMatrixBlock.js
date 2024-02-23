import SetRowsColumns from "./SetRowsColumns";
import MatrixRepresentation from "./MatrixRepresentation";

export default function CompleteMatrixBlock(
{
    rows,
    setRows,
    cols,
    setColumns,
    array,
    setArray,
    setResult,
    pasteArray,
    isCols = true
}
){

    return (
        <div className='col-md-6 p-md-2 p-3'>
            <SetRowsColumns 
                pasteArray={pasteArray} 
                setResult={setResult} 
                setColumns={setColumns} 
                setRows={setRows} 
                isCols={isCols}
            />
            { 
                rows && cols &&
                <MatrixRepresentation 
                    setResult={setResult} 
                    rowsCount={rows} 
                    colsCount={cols} 
                    twoDArray={array} 
                    setTwoDArray={setArray} 
                />
            }
        </div>
    );
}