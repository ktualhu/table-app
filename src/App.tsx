import { useState } from 'react';
import './styles/styles.scss';
import Panel from './UI/Panel';
import Table from './UI/Table';
import { useEffect } from 'react';
import useTransform from './useTransform';

export interface IEntity {
  id: number;
  parentId: number;
  isActive: boolean;
  balance: string;
  name: string;
  email: string;
  children: IEntity[];
  show: boolean;
}

function App() {
  const defaultData = useTransform();
  const [data, setData] = useState(defaultData);
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('none');

  useEffect(() => {
    switch (selectedValue) {
      case 'email':
        setData((prevData) => {
          const temp = [...prevData];
          temp.forEach((val) => {
            if (val.children?.length) {
              val.children.sort((a, b) => (a.email < b.email ? -1 : 1));
            }
          });
          return [...temp.sort((a, b) => (a.email < b.email ? -1 : 1))];
        });
        break;
      case 'balance':
        setData((prevData) => {
          const temp = [...prevData];
          temp.forEach((val) => {
            if (val.children?.length) {
              val.children.sort((a, b) => (a.balance < b.balance ? -1 : 1));
            }
          });
          return [...temp.sort((a, b) => (a.balance < b.balance ? -1 : 1))];
        });
        break;
    }
  }, [selectedValue]);

  const handleShowChildren = (id: number) => {
    const tempData = [...data];
    const itemInd = tempData.findIndex((val) => val.id === id);
    if (itemInd > -1) {
      const item = tempData[itemInd];
      item.show = !item.show;
      tempData[itemInd] = item;
      setData(tempData);
    }
  };

  return (
    <div className="main">
      <Panel
        isChecked={checked}
        selectedValue={selectedValue}
        handleFilter={() => setChecked(!checked)}
        handleSelect={(val) => setSelectedValue(val)}
      />
      <Table
        data={data}
        active={checked}
        handleShowChildren={handleShowChildren}
      />
    </div>
  );
}

export default App;
