
import Head from 'next/head'
import styles from './index.module.css';

export default function Home() {
  return(
    <>
    <Head>
        <title>Addition</title>
        <meta name="description" content="Matrix Addition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={`h-100  pt-3 ${styles['index-body']}`} >
        <h3 className='fst-italic d-inline-block text-dark mx-5 mb-3 bg-light display-5'>Matrix Calculator: </h3>
        <div className="d-flex flex-wrap p-2 justify-content-around">
                <button className='btn m-2 btn-dark'>
                <a href="./determinant" className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>Determinant of NxN Matrix</span>
                </a>
                </button>
                <button className='btn m-2 btn-dark'>
                <a href="./multiplication" className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>Multiplication of 2 NxN Matrices</span>
                </a>
                </button>
                <button className='btn m-2 btn-dark'>
                <a href="./addition" className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>Addition of 2 NxN Matrices</span>
                </a>
                </button>
                <button className='btn m-2 btn-dark'>
                <a href="./rank" className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>Rank of NxN Matrix</span>
                </a>
                </button>
                <button className='btn m-2 btn-dark'>
                <a href="./scalar-multiplication" className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>Scalar Multiplication of NxN Matrix</span>
                </a>
                </button>
                <button className='btn m-2 btn-dark'>
                <a href="./transpose" className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>Transpose of NxN Matrix</span>
                </a>
                </button>
                <button className='btn m-2 btn-dark'>
                <a href="./inverse" className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>Inverse on NxN Matrix</span>
                </a>
                </button>
        </div>  

    </div>
    </>
);
}
