interface IProps {
  isChecked: boolean;
  selectedValue: string;
  handleFilter: () => void;
  handleSelect: (val: string) => void;
}

function Panel(props: IProps) {
  return (
    <div className="Panel">
      <div className="Checkbox">
        <input
          type="checkbox"
          id="filter"
          name="filter"
          checked={props.isChecked}
          onChange={props.handleFilter}
        />
        <label htmlFor="filter">Show only active</label>
      </div>
      <div className="Select">
        <select
          value={props.selectedValue}
          onChange={(e) =>
            props.handleSelect(e.target.options[e.target.selectedIndex].value)
          }
        >
          <option value="none" defaultValue="none" disabled hidden>
            Select Filter
          </option>
          <option value={'email'}>Sort by Email</option>
          <option value={'balance'}>Sort by Balance</option>
        </select>
      </div>
    </div>
  );
}

export default Panel;
