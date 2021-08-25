import { useEffect, useState } from 'react';
import { IEntity } from './App';
import jsonData from './data/default.json';

function useTransform() {
  const [data, setData] = useState(jsonData as IEntity[]);

  useEffect(() => {
    if (jsonData) {
      const parents = jsonData.filter((val) => !val.parentId) as IEntity[];
      jsonData
        .filter((val) => val.parentId)
        .forEach((val) => {
          const parent = parents.find((p) => p.id === val.parentId);
          if (parent) {
            if (!parent.children) {
              parent.children = [];
              parent.show = false;
            }
            parent.children.push(val as IEntity);
          }
        });

      setData(parents);
    }
  }, []);

  return data;
}

export default useTransform;
