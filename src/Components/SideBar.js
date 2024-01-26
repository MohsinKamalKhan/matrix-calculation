import { useContext, useEffect, useState } from "react";
import { MobileContext } from "@/Lib/Context";

export default function SideBar(){
    const [ buttonClicked, setButtonClicked] = useState( true );
    const { mobileMode,  setMobileMode } = useContext( MobileContext );

    const buttonClickHandler = () => {
        setButtonClicked(!buttonClicked);
    }

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        setMobileMode(isMobile);
        if (isMobile)
          setMobileMode( true );

        const handleResize = () => {
          setMobileMode(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return(
        <>
        <nav id="sidebarMenu" className={`${ buttonClicked ?  'collapse' : ''} d-lg-block sidebar`}>
            <div className="position-sticky ">
            <div className="list-group  list-group-flush mx-2 mt-2">
                <a href="./" className="enlarge fw-bold list-group-item bg-dark text-white list-group-item-action py-2 ripple" aria-current="true">
                    <span>Home</span>
                </a>
                <a href="./determinant" className="enlarge fw-bold list-group-item bg-dark text-white list-group-item-action py-2 ripple" aria-current="true">
                    <span>Determinant of NxN Matrix</span>
                </a>
                <a href="./multiplication" className="enlarge list-group-item fw-bold bg-dark text-white  list-group-item-action py-2 ripple">
                    <span>Multiplication of 2 NxN Matrices</span>
                </a>
                <a href="./addition" className="enlarge list-group-item fw-bold bg-dark text-white  list-group-item-action py-2 ripple">
                    <span>Addition of 2 NxN Matrices</span></a>
                <a href="./rank" className="enlarge list-group-item fw-bold bg-dark text-white  list-group-item-action py-2 ripple">
                    <span>Rank of NxN Matrix</span></a>
                <a href="./scalar-multiplication" className=" enlarge list-group-item fw-bold bg-dark text-white  list-group-item-action py-2 ripple">
                    <span>Scalar Multiplication of NxN Matrix</span>
                </a>
                <a href="./transpose" className="enlarge list-group-item fw-bold bg-dark text-white  list-group-item-action py-2 ripple">
                    <span>Transpose of NxN Matrix</span></a>
                <a href="./inverse" className=" enlarge list-group-item fw-bold bg-dark text-white  list-group-item-action py-2 ripple">
                    <span>Inverse on NxN Matrix</span></a>
            </div>
            </div>
        </nav>

        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
            <div className="container-fluid">
                <button onClick={ buttonClickHandler} className="navbar-toggler text-white btn-primary btn" data-mdb-toggle="collapse" 
                    >
                    SideBar
                </button>        
            </div>
        </nav>

  </>
    );
}