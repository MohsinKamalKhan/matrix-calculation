import { useCopiedArray } from '@/Lib/StorageContext';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function MatrixRepresentation({
  onChange,
  rowsCount,
  colsCount,
  twoDArray,
  editable = true,
  setTwoDArray
}) {
  const placeholderArray = new Array(rowsCount).fill(null);
  const placeholderArrayCols = new Array(colsCount).fill(null);

  function setToZero() {
    const newArray = [];
    for ( let i = 0; i < rowsCount; i++ )
      newArray[i] = [];
    for ( let i = 0; i < rowsCount; i++ )
      for ( let j = 0; j < colsCount; j++ )
        newArray[i][j] = 0;
    if ( setTwoDArray ) setTwoDArray( newArray );
  }
  useEffect( () => {
    setToZero();
  }, []);


  function deepCopy(arr) {
    return arr.map(row => [...row]);
  }

  const setElement = (i, j, newValue) => {
    const newArray = deepCopy(twoDArray);
    if (newArray[i]) newArray[i] = [...newArray[i]];
    else newArray[i] = [];
    newArray[i][j] = newValue;
    setTwoDArray(newArray);
  };

  const handleChange = (indexOut, indexIn) => (event) => {
    onChange();
    setElement(indexOut, indexIn, Number(event.target.value));
  };

  // handling copying to clipboard state
  const { updateCopiedArray } = useCopiedArray();
  const handleCopyToClipboard = async () => {
    const arr = deepCopy(twoDArray);
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
                readOnly={!editable}
                style={{ width: "50px" }}
                type="text"
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
