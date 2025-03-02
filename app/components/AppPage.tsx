import React, { ReactNode } from 'react';
import { Container, Title } from '@mantine/core';

interface AppPageProps {
  title: string;
  children?: ReactNode;
}

const AppPage: React.FC<AppPageProps> = ({ title, children }) => {
  return (
    <Container style={{ padding: '2em' }}>
      <Title style={{ marginBottom: '1em' }}>{title}</Title>
      <div>{children}</div>
    </Container>
  );
};

export default AppPage;