import React from 'react';
import { Checkbox, CheckboxProps, Table } from 'semantic-ui-react';

const MemoizedCheckboxCell = React.memo(Table.Cell);

interface CheckboxCellProps {
  id: number;
  checked: boolean;
  handleCheckbox: (value?: number | string, checked?: boolean) => void;
}

const CheckboxCell = (props: CheckboxCellProps) => {
  const { id, checked, handleCheckbox } = props;
  // const [checked, setChecked] = useState(false);

  const onChange = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    const dataCheckbox: CheckboxProps = {
      ...data,
      id: id,
    };
    handleCheckbox(dataCheckbox.id, dataCheckbox.checked);
    // setChecked(event.currentTarget.checked);
  };

  return (
    <MemoizedCheckboxCell className="checkbox-cell" textAlign="center">
      <Checkbox checked={checked} onChange={onChange} />
    </MemoizedCheckboxCell>
  );
};

export default React.memo(CheckboxCell);
