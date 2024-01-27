// import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast'
import styles from './index.module.css';
import TopAndSideBar from '@/Components/TopAndSideBar';
import { FaGithub } from 'react-icons/fa';
import { CopyArrayContext } from '@/Lib/CopyArrayContext.js';
import { useState } from 'react';

export default function App({ Component, pageProps }) {

  const [ copiedArray, setCopiedArray ] = useState( undefined );
  const [ copiedRowsCount, setcopiedRowsCount ] = useState( undefined );
  const [ copiedColsCount, setCopiedColsCount ] = useState( undefined );

  function updateCopiedArray( arr, rowsCount, colsCount ) {
    setCopiedArray( arr );
    setcopiedRowsCount( rowsCount );
    setCopiedColsCount( colsCount );
  }

  return(
    <CopyArrayContext.Provider value={ {copiedArray, copiedRowsCount, copiedColsCount, updateCopiedArray} }>

        <div className={styles.image}></div>
        <div className="w-100 h-100" style={{ position:'absolute', top:'0', left:'0', backdropFilter:'blur(2px)', backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
          <Toaster />
          <TopAndSideBar Component={Component} pageProps={pageProps}  />
          <a target='_blank' href='https://github.com/mohsinkamalkhan' className={`text-white fw-bold ${styles['github-tag']}`}>
            <FaGithub size={40} color='black' />
          </a>
        </div>

    </CopyArrayContext.Provider>
  ); 
}
