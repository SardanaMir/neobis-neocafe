import { useState } from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom'
import FinishedProducts from './FinishedProducts';
import RawMaterials from './RawMaterials';
import FinishingProducts from './FinishingProducts';
import styles from './storehouse.module.scss'


const Storehouse = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  const tabs = [
    { title: 'Готовая продукция', content: <FinishedProducts /> },
    { title: 'Сырье', content: <RawMaterials /> },
    { title: 'Заканчивающиеся продукты', content: <FinishingProducts /> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tab} ${index === activeTab ? styles.active : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {
        activeTab === 0 ? <div className={styles.line__first_active}></div> : ""
      }
      {
        activeTab === 1 ? <div className={styles.line__second_active}></div> : ""
      }
      {
        activeTab === 2 ? <div className={styles.line__third_active}></div> : ""
      }
      <span className={styles.main_line} />
      <div className={styles.content}>
        {tabs[activeTab]?.content}
      </div>
    </div>
    </div>
  )
};

export default Storehouse;
