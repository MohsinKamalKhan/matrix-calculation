import { useState } from "react";
import SideBarMobile from "./SideBarMobile";
import SideBarDesktop from "./SideBarDesktop";
import TopBar from "./TopBar";

export default function TopAndSideBar ({ Component, pageProps }) {
    const [ showCanvas, setShowCanvas ] = useState( false );

    return (
        <>
            <div style={{height:'7%'}}>
                <TopBar  setShowCanvas={setShowCanvas} />
            </div>
            <div className="d-flex w-100" style={{height:'93%'}}>
            {
                showCanvas ? <SideBarMobile show={showCanvas} setShow={setShowCanvas} /> : <SideBarDesktop />
            }
            <Component {...pageProps} />
            </div>
        </>
    );
}