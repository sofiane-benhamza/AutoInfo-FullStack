import GetLogo from "./GetLogo";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';




function SavedCars() {
    const [savedCars, setSavedCars] = useState<any[]>([]);

    useEffect(() => {
        // Fetch car data from the server
        axios.get('http://localhost:3001/getcars')
            .then(response => {
                const savedCarsData = response.data;
                setSavedCars(savedCarsData);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Load saved cars from localStorage on component mount


    function clearLS() {
        localStorage.clear();
        window.location.reload();
    }

    // Usage example:




    return (
        <div className="bg-black min-vh-100"><br />
            <div onClick={clearLS} className="text-center"><span className="btn btn-primary"><Icon.Trash2Fill />  Clear Saved Cars</span></div>
            <div className="container d-flex gap-1 flex-wrap justify-content-around bg-black">
                {savedCars.length > 0 ? (
                    savedCars.map((post, index) => (
                        <div key={index} className="col-lg-2 col-md-3 col-sm-12 overflow-hidden m-3">
                            <div className="card text-center">
                                <div className="card-header border-primary border ">
                                    {post.make}
                                </div>
                                <div className="card-body bg-black text-light">
                                    <h5 className="card-title">
                                        <GetLogo title={post.make.toLowerCase()} />
                                    </h5>
                                    <p className="card-text">
                                        model : <i>{post.model}</i><br />
                                        class : <i>{post.type}</i><br />
                                        year : <i>{post.year}</i>
                                        <br />
                                    </p>

                                    <p className="btn btn-primary" onClick={() => { }}>
                                        More details
                                    </p>
                                </div>
                            </div>
                        </div >
                    ))
                ) : <h2 className="text-center btn btn-warning p-3 m-5"><i>no cars saved yet</i></h2>
                }
            </div>
        </div>
    );
}

export default SavedCars;
