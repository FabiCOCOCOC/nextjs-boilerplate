'use client'
import React, { useState, useEffect } from 'react';
import APICall from '@/lib/StocksApiCall';

export default function ApiTest() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const result = await APICall("AAPL");
                console.log("Result:", result);
                setData(result);
            } catch (error) {
                console.error("Error:", error);
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data found</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Apple Stock Data (AAPL):</h2>
            <p><strong>Name:</strong> {data.name || 'N/A'}</p>
            <p><strong>Date:</strong> {data.date ? new Date(data.date).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Open:</strong> ${data.open || 'N/A'}</p>
            <p><strong>High:</strong> ${data.high || 'N/A'}</p>
            <p><strong>Low:</strong> ${data.low || 'N/A'}</p>
            <p><strong>Close:</strong> ${data.close || 'N/A'}</p>
            <p><strong>Current Price:</strong> ${data.adjClose || 'N/A'}</p>
            <p><strong>Volume:</strong> {data.volume ? data.volume.toLocaleString() : 'N/A'}</p>
            
            <details style={{ marginTop: '20px' }}>
                <summary>Raw Data (for debugging)</summary>
                <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </details>
        </div>
    );
}