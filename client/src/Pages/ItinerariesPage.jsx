// my trips

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ItinerariesPage = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="p-4">
            <h1 className="text-3xl my-4">Itineraries page</h1>
            { loading ? <p>loading...</p> : ''}
        </div>
    )
}

export default ItinerariesPage;