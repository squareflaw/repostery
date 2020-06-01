import React from 'reactn';
import { Card } from 'antd';

const Card = ({repo}) => (
  <Card title={repo.name} bordered={false} style={{ width: 300 }}>
    <p>{repo.description}</p>
    <p>{repo.stargazers_count}</p>
    <p>{repo.language}</p>
  </Card>
);