import React, { ReactNode } from "react";
import { Container, Group, Title } from "@mantine/core";

interface AppPageProps {
  title: string;
  children?: ReactNode;
}

const AppPage: React.FC<AppPageProps> = ({ title, children }) => {
  return (
    <Container className="app-page-container">
      <Group grow preventGrowOverflow={false} wrap="nowrap" gap="0">
        <Title order={1}>{title}</Title>
      </Group>
      <div>{children}</div>
    </Container>
  );
};


export default AppPage;
