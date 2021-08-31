import React from 'react';
import IEntity from '../../types/entity';
import './styles.scss';

interface IProps {
  data: IEntity[];
  active: boolean;
  handleShowChildren: (id: number) => void;
}

function Table(props: IProps) {
  const handleActiveRows = (item: IEntity) => {
    if (props.active) {
      if (item.isActive) return renderTableRow(item);
      return null;
    }
    return renderTableRow(item);
  };

  const nestedRender = (item: IEntity) => {
    if (item.show) {
      return item.children.map((val) => {
        return (
          <React.Fragment key={val.id}>
            {handleActiveRows(val)}
            {val.children.length ? nestedRender(val) : null}
          </React.Fragment>
        );
      });
    }
    return null;
  };

  const renderTableRow = (item: IEntity) => {
    return (
      <tr key={item.id} className={item.parentId ? 'trChild' : ''}>
        <td>{item.id}</td>
        <td>{item.parentId}</td>
        <td>{item.isActive ? 'true' : 'false'}</td>
        <td>{item.balance}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        {item.children?.length ? (
          <td>
            <button
              className="Button"
              onClick={() => props.handleShowChildren(item.id)}
            >
              {item.show ? 'Hide' : 'Show'}
            </button>
          </td>
        ) : (
          <td>-</td>
        )}
      </tr>
    );
  };

  return (
    <table className="Table">
      <thead>
        <tr className="header">
          <th>ID</th>
          <th>ParentID</th>
          <th>Active</th>
          <th>Balance</th>
          <th>Name</th>
          <th>Email</th>
          <th>Children</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => {
          if (!item.parentId) {
            return (
              <React.Fragment key={item.id}>
                {handleActiveRows(item)}
                {nestedRender(item)}
              </React.Fragment>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
}

export default Table;
