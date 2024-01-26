
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './SideBarMobile.module.css';

export default function SideBarMobile ( { show, setShow } ) {

    const handleClose = () => setShow( false );
    const classname = `enlarge fw-bold list-group-item bg-dark text-white list-group-item-action py-2 ripple ${styles["side-bar-item-responsive"]}`;

    return (
        <Offcanvas  style={{backgroundColor: '#2A363B', width: '70%'}} show={show} onHide={handleClose}>
            <Offcanvas.Body>
                <div className={styles["side-bar-responsive"]}>
                <a  href="./"  className={`${classname}`} aria-current="true">
                    <span>Home</span>
                </a>
                <a  href="./determinant" className={`${classname}`} aria-current="true">
                    <span>Determinant of NxN Matrix</span>
                </a>
                <a href="./multiplication" className={`${classname}`}>
                    <span>Multiplication of 2 NxN Matrices</span>
                </a>
                <a href="./addition" className={`${classname}`} >
                    <span>Addition of 2 NxN Matrices</span></a>
                <a href="./rank" className={`${classname}`}>
                    <span>Rank of NxN Matrix</span></a>
                <a href="./scalar-multiplication" className={`${classname}`} >
                    <span>Scalar Multiplication of NxN Matrix</span>
                </a>
                <a href="./transpose" className={`${classname}`}>
                    <span>Transpose of NxN Matrix</span></a>
                <a href="./inverse" className={`${classname}`}>
                    <span>Inverse on NxN Matrix</span></a>
                </div>
            </Offcanvas.Body>
        </Offcanvas>      
    );
}