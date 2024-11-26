import React, { useEffect, useState } from 'react';
import { fetchChecklistResults } from '../services/api';
import './ChecklistDashboard.css';

const ChecklistDashboard = () => {
    const [results, setResults] = useState([]);
    const [applicationDetails, setApplicationDetails] = useState(null);

    useEffect(() => {

        fetchChecklistResults()
            .then((data) => {
                if (data.results) {
                    setResults(data.results);
                    setApplicationDetails(data.applicationDetails); 
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch((error) => console.error('Error fetching checklist results:', error));
    }, []);

    return (
        <div className="dashboard-container">
            {applicationDetails && (
                <>
                    <h2>Checklist Results for Application Number : {applicationDetails.applicationNumber}</h2>
                    <p>
                        <strong>Broker:</strong> {applicationDetails.brokerName} (
                        {applicationDetails.brokerEmail})

                    </p>
                    <p>                        
                        <strong>Application Type: </strong> {applicationDetails.applicationTypeName}
                    </p>
                    <p>
                        <strong>Solicitor:</strong> {applicationDetails.solicitorName} (
                        {applicationDetails.solicitorFirm})
                    </p>
                    <p>
                        <strong>Loan-to-Value (LTV):</strong> {applicationDetails.ltv}
                    </p>
                </>
            )}
            <h3>Checklist:</h3>
            <ul className="checklist-results">
                {results.map((result, index) => (
                    <li className="checklist-item" key={index}>
                        <span>{result.ruleName}</span>: <strong>{result.status}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChecklistDashboard;
