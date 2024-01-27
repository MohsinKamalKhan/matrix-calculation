
import Head from 'next/head'
import styles from './index.module.css';
import Link from 'next/link';

const panels = [
    { text: "Determinant of NxN Matrix", link: "./determinant",  key:1},
    { text: "Multiplication of 2 NxN Matrices", link: "./multiplication",  key:2},
    { text: "Addition of 2 NxN Matrices", link: "./addition",  key:3},
    { text: "Rank of NxN Matrix", link: "./rank",  key:4},
    { text: "Scalar Multiplication of NxN Matrix", link: "./scalar-multiplicaton",  key:5},
    { text: "Transpose of NxN Matrix", link: "./transpose",  key:6},
    { text: "Inverse of NxN Matrix", link: "./inverse",  key:7},
]

export default function Home() {

    const sidebar = panels.map( panel => {
        return (
            <button key={panel.key} className='btn m-2 btn-dark'>
                <Link href={panel.link} className="enlarge list-group-item fw-bold bg-dark text-white  py-2 ripple" aria-current="true">
                    <span>{panel.text}</span>
                </Link>
            </button>
        )
    } )

    return(
        <>
        <Head>
            <title>Matrix Calculator</title>
            <meta name="description" content="Matrix Calculator! Calculate Determinant, Multiplication, Addition, Rank, Scalar, Inverse, Transpose and more!" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={`h-100  pt-3 ${styles['index-body']}`} >
            <h3 className='fst-italic d-inline-block text-dark mx-5 mb-3 bg-light display-5'>Matrix Calculator: </h3>
            <div className="d-flex flex-wrap p-2 justify-content-around">
                {sidebar}
            </div>  
        </div>
        </>
    );
}
