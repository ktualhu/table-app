import { useState } from 'react';
import './styles/styles.scss';
import Panel from './UI/Panel/Panel';
import Table from './UI/Table/Table';
import { useEffect } from 'react';
import useTransform from './useTransform';
import cloneDeep from 'lodash.clonedeep';
import IEntity from './types/entity';

function App() {
  const defaultData = useTransform();
  const [data, setData] = useState([] as IEntity[]);
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('none');

  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  useEffect(() => {
    const tempData = cloneDeep(data);
    if (selectedValue !== 'none') {
      tempData
        .sort((a, b) => {
          if (selectedValue === 'email') return a.email < b.email ? -1 : 1;
          else return a.balance < b.balance ? -1 : 1;
        })
        .forEach((el) => {
          if (el.children.length) {
            sortNestedChild(el.children, selectedValue);
          }
        });
      setData(tempData);
    }
  }, [selectedValue]);

  const findNestedChild = (arr: IEntity[], id: number) => {
    arr.every((el) => {
      if (el.id === id) {
        el.show = !el.show;
        return false;
      }
      if (el.children.length) findNestedChild(el.children, id);
      return true;
    });
  };

  const sortNestedChild = (arr: IEntity[], filter: string) => {
    return arr
      .sort((a, b) => {
        if (selectedValue === 'email') return a.email < b.email ? -1 : 1;
        else return a.balance < b.balance ? -1 : 1;
      })
      .forEach((el) => {
        if (el.children.length) {
          sortNestedChild(el.children, filter);
        }
      });
  };

  const handleShowChildren = (id: number) => {
    const tempData = cloneDeep(data);
    tempData.every((el) => {
      if (el.id === id) {
        el.show = !el.show;
        return false;
      } else if (el.children.length) {
        findNestedChild(el.children, id);
      }
      return true;
    });
    setData(tempData);
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
