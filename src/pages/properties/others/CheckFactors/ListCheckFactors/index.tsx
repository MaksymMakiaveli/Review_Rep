import React, { useMemo } from 'react';
import { RootState } from '@RootStateType';
import { useSelector } from 'react-redux';
import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { ReactTable } from '@UiKitComponents';

interface ListCheckFactorsProps {}

// const dataKeyCheckFactorsList: DataKeyType<CheckFactory>[] = [
//   {
//     key: 'name',
//     label: 'check out reason',
//     align: 'left',
//     flexGrow: 1,
//   },
//   {
//     key: 'checkFactorCode',
//     label: 'check out code',
//     align: 'left',
//     flexGrow: 1,
//   },
// ];

const getCheckFactorState = (state: RootState) => state.CheckFactorReducer;

const ListCheckFactors: React.FC<ListCheckFactorsProps> = () => {
  const { checkFactorList, loadingCheckFactor } = useSelector(getCheckFactorState);
  // const [checkedItemsList, setCheckedItemsList] = useState<number[] | string[]>([]);

  // Test Components
  const memoizedColumns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 200,
      },
      {
        Header: 'Check Factor Id',
        accessor: 'checkFactorId',
      },
    ],
    []
  );
  // Test Components
  const memoizedData = useMemo(() => checkFactorList, [checkFactorList]);
  //

  //

  if (loadingCheckFactor) {
    return <Loader />;
  }
  if (!checkFactorList.length) {
    return (
      <EmptyPage textButton="Check Factor" redirectPath="CreateCheckFactor">
        <h5>You don`t have any check factor yet.</h5>
        <h5>Click the button and add a new check factor</h5>
      </EmptyPage>
    );
  }

  // const listForTable: TCheckFactorTable[] = checkFactorList.map((checkFactor) => ({
  //   name: checkFactor.name,
  //   checkFactorCode: checkFactor.checkFactorCode,
  //   checkFactorId: checkFactor.checkFactorId,
  // }));

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          // checkedItemsList={checkedItemsList}
          pageCreatingUrl="CreateCheckFactor"
          textRedirectButton="New Check Factor"
        />
        {/* <CustomTable
          data={listForTable}
          dataKey={dataKeyCheckFactorsList}
          currentDataKey="checkFactorId"
          setCheckedItemsList={setCheckedItemsList}
        /> */}
        <ReactTable columns={memoizedColumns} data={memoizedData} />
      </div>
    </div>
  );
};

export default ListCheckFactors;
