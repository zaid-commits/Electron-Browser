import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${props => props.theme === 'dark' ? '#222' : '#f0f0f0'};
  padding: 20px;
  overflow-y: auto;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const Link = styled.a`
  color: ${props => props.theme === 'dark' ? '#ddd' : '#0066cc'};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Sidebar({ theme }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadBookmarks();
    loadHistory();
  }, []);

  const loadBookmarks = async () => {
    const savedBookmarks = await window.electronAPI.getBookmarks();
    setBookmarks(savedBookmarks);
  };

  const loadHistory = async () => {
    const savedHistory = await window.electronAPI.getHistory();
    setHistory(savedHistory);
  };

  return (
    <SidebarContainer theme={theme}>
      <SectionTitle theme={theme}>Bookmarks</SectionTitle>
      <List>
        {bookmarks.map((bookmark, index) => (
          <ListItem key={index}>
            <Link href={bookmark.url} theme={theme}>{bookmark.title}</Link>
          </ListItem>
        ))}
      </List>
      <SectionTitle theme={theme}>History</SectionTitle>
      <List>
        {history.slice(0, 10).map((item, index) => (
          <ListItem key={index}>
            <Link href={item.url} theme={theme}>{new URL(item.url).hostname}</Link>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
}