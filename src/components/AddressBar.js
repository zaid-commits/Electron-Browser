import React, { useState } from 'react';
import styled from '@emotion/styled';

const AddressBarContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: ${props => props.theme === 'dark' ? '#555' : '#fff'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
`;

export default function AddressBar({ currentURL, onURLChange, theme }) {
  const [inputValue, setInputValue] = useState(currentURL);

  const handleSubmit = (e) => {
    e.preventDefault();
    onURLChange(inputValue);
  };

  return (
    <AddressBarContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL or search"
          theme={theme}
        />
      </form>
    </AddressBarContainer>
  );
}