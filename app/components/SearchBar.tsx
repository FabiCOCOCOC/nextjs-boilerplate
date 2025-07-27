'use client'
import axios from 'axios';
import styled from 'styled-components';
import React , {useState, useEffect,useRef, use} from 'react';
import { placeholder } from '@/lib/apiCall';

//temp 

const mockSuggestions = [
    { title: "Apple Inc." },
    { title: "Alphabet Inc." },
    { title: "Amazon.com Inc." },
    { title: "Microsoft Corporation" },
    { title: "Tesla Inc." },
];

//styling:
const SearchComponent = styled.div`
    position: relative;
    width:100%;
    max-width: 600px;
    margin: 20px auto; // centers horizontally
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
type Suggesions = {
    //additional attr
    name :string;
    
};

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  apiUrl?: string;
};

const SearchBarContainer: React.FC<SearchBarProps> = (
    {
        placeholder = "Type stock to search ...",
        onSearch,
    }
) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggesions[]>([]);
    const [isloading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim() === '') {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            setIsLoading(true);
            // Simulate API call or use mock data
            const filtered = mockSuggestions.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered.map(item => ({ name: item.title })));
            setShowSuggestions(true);
            setIsLoading(false);
            // Here do error handling for the API call if needed
        };

        fetchSuggestions();
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
            if (onSearch) {
                onSearch(query);
            }
            setShowSuggestions(false);
            setQuery('');
        }

        const handleSuggestionClick = (suggestion: Suggesions) => {
            setQuery(suggestion.name);
            setShowSuggestions(false);
            if (onSearch) {
                onSearch(suggestion.name);
            }
        }

    return (

        <SearchComponent ref={searchRef}>
            <form onSubmit={handleSearch}>
                <SearchInput
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                />
            </form>
            {showSuggestions && suggestions.length > 0 && (
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee'
                            }}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </SearchComponent>
        
    );
};

export default SearchBarContainer;