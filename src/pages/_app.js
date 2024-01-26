import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast'
import styles from './index.module.css';
import { CopiedArrayProvider } from '@/Lib/StorageContext';
import TopAndSideBar from '@/Components/TopAndSideBar';
import { FaGithub } from 'react-icons/fa';

export default function App({ Component, pageProps }) {

  return(
    <CopiedArrayProvider>
      <div style={{ width:'100vw', height:'100vh'}} >
        <img className="w-100 h-100" alt="backgroundImage" src="/backgroundImage.jpeg" />
        <div className="w-100 h-100" style={{ position:'absolute', top:'0', left:'0', backdropFilter:'blur(2px)', backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
          <Toaster />
          <TopAndSideBar Component={Component} pageProps={pageProps}  />
          <a target='_blank' href='https://github.com/mohsinkamalkhan' className={`text-white fw-bold ${styles['github-tag']}`}>
            <FaGithub size={40} color='black' />
          </a>
        </div>
      </div>
    </CopiedArrayProvider>
  ); 
}
