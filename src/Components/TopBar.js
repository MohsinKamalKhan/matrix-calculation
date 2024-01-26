import styles from './TopBar.module.css';
import { BsLayoutTextSidebar } from 'react-icons/bs';

export default function TopBar ( { setShowCanvas} ) {
    const setOffsetTrue = () => setShowCanvas( true );

    return(
        <div className={ `text-white d-flex justify-content-around align-items-center ${styles["top-bar"]} `}>
            <div className='mx-3 lead fw-bold fst-italic'>Matrix Calculator</div>
            <div className={`btn  text-white ${styles["sidebar-icon"]}`}><BsLayoutTextSidebar onClick={ setOffsetTrue } /></div>
        </div>
    );
};