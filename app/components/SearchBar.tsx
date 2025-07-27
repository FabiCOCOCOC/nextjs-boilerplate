'use client'
import axios from 'axios';
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import APICall from '@/lib/StocksApiCall';

//styling:
const SearchComponent = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #0070f3;
        box-shadow: 0 0 5px rgba(0,112,243,0.5);
    }
`;

//Defined types
type Suggestions = {
    name: string;
    symbol: string;
};

type SearchBarProps = {
    placeholder?: string;
    onSearch?: (query: string) => void;
};

const SearchBarContainer: React.FC<SearchBarProps> = ({
    placeholder = "Type stock to search ...",
    onSearch,
}) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null); // Changed to HTMLDivElement

    useEffect(() => {
        const fetchSuggestions = async () => {
            // Fix: Check if query has content (not empty)
            if (query.trim() !== '' && query.length >= 2) {
                setIsLoading(true);
                try {
                    const results = await APICall(query);
                    interface FormattedSuggestion {
                        name: string;
                        symbol: string;
                    }
                    const formattedSuggestions: FormattedSuggestion[] = results.map((result: StockSearchResult) => ({
                        name: result.name,
                    }));
                    setSuggestions(formattedSuggestions);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching stock data:", error);
                    setSuggestions([]);
                } finally {
                    setIsLoading(false); // Always set loading to false
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
                setIsLoading(false);
            }
        };

        // Debounce the API call
        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);
    
    useEffect(() => {
        const clickingOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', clickingOutside);
        return () => {
            document.removeEventListener('mousedown', clickingOutside);
        };
    }, []);
        
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSearch && query) {
            onSearch(query);
        }
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion: Suggestions) => {
        setQuery(suggestion.symbol);
        setShowSuggestions(false);
        if (onSearch) {
            onSearch(suggestion.symbol);
        }
    };

    return (
        <SearchComponent ref={searchRef}>
            <form onSubmit={handleSearch}>
                <SearchInput
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => {
                        if (suggestions.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                />
            </form>
            
            {isLoading && (
                <div style={{ padding: '10px', textAlign: 'center', color: '#666' }}>
                    Searching...
                </div>
            )}
            
            {showSuggestions && suggestions.length > 0 && !isLoading && (
                <ul style={{ 
                    listStyle: 'none', 
                    margin: 0, 
                    padding: 0,
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    position: 'absolute',
                    width: '100%',
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto'
                }}>
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={`${suggestion.symbol}-${index}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: '12px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                            }}
                        >
                            <span>{suggestion.name}</span>
                            <span style={{ 
                                background: '#e9ecef', 
                                padding: '2px 6px', 
                                borderRadius: '3px',
                                fontSize: '0.9em',
                                color: '#666'
                            }}>
                                {suggestion.symbol}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </SearchComponent>
    );
};

export default SearchBarContainer;