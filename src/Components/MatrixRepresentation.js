import { CopyArrayContext } from '@/Lib/CopyArrayContext';
import { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function MatrixRepresentation({
  setResult,
  rowsCount,
  colsCount,
  twoDArray,
  editable = true,
  setTwoDArray
}) {
  const placeholderArray = new Array(rowsCount).fill(null);
  const placeholderArrayCols = new Array(colsCount).fill(null);

  useEffect( () => {
    const newArray = [];
  
    for ( let i = 0; i < rowsCount; i++ )
      newArray[i] = [];

    for ( let i = 0; i < rowsCount; i++ )
      for ( let j = 0; j < colsCount; j++ )
        newArray[i][j] = 0;

    console.log('here')
    if ( setTwoDArray ) setTwoDArray( newArray );
  }, []);


  const setElement = (i, j, newValue) => {
    const newArray = twoDArray.map( row => [...row]);
    newArray[i][j] = newValue;
    setTwoDArray( newArray );
  };

  const handleChange = (indexOut, indexIn) => (event) => {
    setResult( undefined );
    setElement(indexOut, indexIn, Number(event.target.value));
  };

  // handling copying to clipboard state
  const { updateCopiedArray } = useContext( CopyArrayContext );
  const handleCopyToClipboard = async () => {
    const arr = twoDArray.map(row => [...row]);
    updateCopiedArray( arr, rowsCount, colsCount);
    toast.success('Array Copied!');
  };

  return (
    <div className='d-inline-block'>
      <div>
      {placeholderArray.map((_, indexOuter) => (
        <div key={indexOuter} className="d-flex">
          {placeholderArrayCols.map((_, indexInner) => (
            <div key={indexOuter + indexInner}>
              <input
                type='number'
                readOnly={!editable}
                style={{ width: "50px" }}
                value={(twoDArray[indexOuter] && twoDArray[indexOuter][indexInner]) || 0}
                onChange={handleChange(indexOuter, indexInner)}
              />
            </div>
          ))}
          <br />
        </div>
      ))}
      </div>

      <button
        className="mx-5  btn btn-sm btn-primary"
        onClick={handleCopyToClipboard}
      >
        Copy Matrix
      </button>

    </div>
  );
}
