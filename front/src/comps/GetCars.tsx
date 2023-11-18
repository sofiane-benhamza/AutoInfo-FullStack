import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetLogo from './GetLogo';

interface Props {
    make: string;
    type: string;
    year: string;
}

function GetCars({ make, type, year }: Props) {
    const [posts, setPosts] = useState<any[]>([]);
    const [savedCars, setSavedCars] = useState<any[]>([]);

    // Load saved cars from localStorage on component mount
    useEffect(() => {
        axios.get('http://localhost:3001/getcars')
            .then(response => {
                const savedCarsData = response.data;
                setSavedCars(savedCarsData);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Function to save a car
    const saveCar = async (car: any) => {
        // Check if the car is already saved by comparing IDs
        const isCarSaved = savedCars.some((savedCar) => savedCar.id === car.id);

        if (!isCarSaved) {
            // Send the car data to the "localhost:9999/savecars" endpoint
            try {
                await axios.post('http://localhost:3001/setcars', car);
                console.log('Car saved successfully');
            } catch (error) {
                console.error('Error saving car:', error.message);
            }

            // Add the car to the savedCars array
            const updatedSavedCars = [...savedCars, car];
            setSavedCars(updatedSavedCars);
        }
    };


    useEffect(() => {
        /*        axios.defaults.headers['X-RapidAPI-Key'] = '4162e2dfa3mshf0649fbee3b7ddcp12cf7fjsn70630caf6ddb';
                axios.defaults.headers['X-RapidAPI-Host'] = 'car-data.p.rapidapi.com';
        */

        const RAPIDAPI_KEY = '4162e2dfa3mshf0649fbee3b7ddcp12cf7fjsn70630caf6ddb';
        const RAPIDAPI_HOST = 'car-data.p.rapidapi.com';

        axios.interceptors.request.use((config) => {
            const isRapidAPIEndpoint = config.url.startsWith('https://car-data.p.rapidapi.com');

            if (isRapidAPIEndpoint) {
                config.headers['X-RapidAPI-Key'] = RAPIDAPI_KEY;
                config.headers['X-RapidAPI-Host'] = RAPIDAPI_HOST;
            }

            return config;
        });


        var URL = `https://car-data.p.rapidapi.com/cars?limit=40`;
        if (make.length > 0) URL += `&make=${make}`;
        if (type.length > 0) URL += `&type=${type}`;
        if (year.length > 0) URL += `&year=${year}`;

        axios
            .get(URL)
            .then((res) => {
                console.log(res);
                setPosts(res.data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });

    }, [make, type, year]);

    return (
        <>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-12 overflow-hidden" key={index}>
                        <div className="card text-center">
                            <div className="card-header border-primary border">{post.make}</div>
                            <div className="card-body bg-black text-light">
                                <h5 className="card-title">
                                    <GetLogo title={post.make.toLowerCase()} />
                                </h5>
                                <p className="card-text">
                                    model: <i>{post.model}</i>
                                    <br />
                                    class: <i>{post.type}</i>
                                    <br />
                                    year: <i>{post.year}</i>
                                    <br />
                                </p>
                            </div>
                            <span
                                className="card-footer bg-black text-muted"
                                onClick={() => {
                                    let car = {
                                        id: post.id,
                                        model: post.model,
                                        type: post.type,
                                        make: post.make,
                                        year: post.year
                                    };

                                    saveCar(car);
                                    console.log(car);

                                    // Find the button by its ID
                                    const button = document.getElementById(`saveButton-${post.id}`);

                                    if (button) {
                                        // Change the button texthesoyam
                                        button.textContent = 'Saved';
                                    }
                                }}
                            >
                                <i className="btn btn-primary text-light border border-light" id={`saveButton-${post.id}`}>
                                    Save Advert
                                </i>
                            </span>

                        </div>
                    </div>
                ))
            ) : null}
        </>
    );
}

export default GetCars;