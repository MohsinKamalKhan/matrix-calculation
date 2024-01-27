import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './SideBarMobile.module.css';

const panels = [
    { text: "Home", link: "./", key:1 },
    { text: "Determinant of NxN Matrix", link: "./determinant",  key:2},
    { text: "Multiplication of 2 NxN Matrices", link: "./multiplication",  key:3},
    { text: "Addition of 2 NxN Matrices", link: "./addition",  key:4},
    { text: "Rank of NxN Matrix", link: "./rank",  key:5},
    { text: "Scalar Multiplication of NxN Matrix", link: "./scalar-multiplicaton",  key:6},
    { text: "Transpose of NxN Matrix", link: "./transpose",  key:7},
    { text: "Inverse of NxN Matrix", link: "./inverse",  key:8},
]

export default function SideBarMobile ( { show, setShow } ) {

    const handleClose = () => setShow( false );
    const classname = `enlarge fw-bold list-group-item bg-dark text-white list-group-item-action py-2 ripple ${styles["side-bar-item-responsive"]}`;

    const sidebar = panels.map( panel => {
        return (
            <Link onClick={handleClose} key={panel.key} href={panel.link}  className={`${classname}`} aria-current="true">
                <span>{panel.text}</span>
            </Link>
        )
    } )

    return (
        <Offcanvas  style={{backgroundColor: '#2A363B', width: '70%'}} show={show} onHide={handleClose}>
            <Offcanvas.Body>
                <div className={styles["side-bar-responsive"]}>
                {sidebar}
                </div>
            </Offcanvas.Body>
        </Offcanvas>      
    );
}