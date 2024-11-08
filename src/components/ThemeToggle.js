import React from 'react';
import styled from '@emotion/styled';

const ToggleButton = styled.button`
  background-color: ${props => props.theme === 'dark' ? '#555' : '#e0e0e0'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#666' : '#d0d0d0'};
  }
`;

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <ToggleButton onClick={onToggle} theme={theme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
}