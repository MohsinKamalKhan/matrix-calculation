import MatrixRepresentation from "./MatrixRepresentation";
import { useEffect } from "react";

export default function CompleteResultBlock(
{
    rows,
    cols,
    result,
    findResult,
}
){
    useEffect( ()=> {
        const targetElement = document.getElementById('result');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        };
    }, [result]);

    return (
        <>
            <div>
                <button onClick={()=> findResult() } className="btn btn-primary m-4">
                    Calculate Result
                </button>
            </div>
            <div >
                <div id="result" className='fst-italic text-dark bg-light p-2 h5'>Result: </div>
                {
                    typeof result !== 'undefined' ?
                    <MatrixRepresentation allowText={true} editable={false} rowsCount={rows} colsCount={cols} twoDArray={result}  />
                    :
                    <></>
                }
            </div>
        </>
    );
}
