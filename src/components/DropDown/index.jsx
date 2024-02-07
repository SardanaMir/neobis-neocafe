import React from 'react';
import { Button, Dropdown, Space } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Кофе
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Напитки
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Десерты
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Выпечка
      </a>
    ),
  },
];
const DropDown = ({name}) => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown
        menu={{
          items,
        }}
        placement="Категория"
      >
        <Button>{name}</Button>
      </Dropdown>
    </Space>
  </Space>
);
export default DropDown;