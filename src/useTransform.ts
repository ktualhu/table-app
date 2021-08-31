import { useEffect, useState } from 'react';
import IEntity from './types/entity';
import jsonData from './data/default.json';

function useTransform() {
  const [data, setData] = useState(jsonData as IEntity[]);

  useEffect(() => {
    if (jsonData) {
      const elems = jsonData.reduce((acc, val) => {
        if (!val.parentId) {
          const newVal = {
            ...val,
            show: false,
            children: nested(val as IEntity),
          } as IEntity;
          acc.push(newVal);
        }
        return acc;
      }, [] as IEntity[]);

      setData(elems);
    }
  }, []);

  const nested = (val: IEntity) => {
    return jsonData.reduce((acc, newVal) => {
      if (val.id === newVal.parentId) {
        const v: IEntity = {
          ...newVal,
          show: false,
          children: nested(newVal as IEntity),
        };
        acc.push(v);
      }
      return acc;
    }, [] as IEntity[]);
  };

  return data;
}

export default useTransform;
