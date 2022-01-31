import React, { useEffect, useMemo, useState } from 'react';
import classes from '../Contract.module.scss';
import { FileInput, TextField, Select, Divider, TextArea, PreviewFile } from '@UiKitComponents';
import { TFormCreateContract } from '@Types/contract.types';
import { HeaderSaveAction, InputContainer } from '@components';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { GetVendorList } from '@Actions/vendor.action';
import { getCurrencyList } from '@Actions/currency.action';
import { schemaContract } from '@schema/contract';
import { useBackHistory } from '@hooks';
// import { postNewContract } from '@Actions/contracts.action';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from '@common';

interface CreateContractProps {}

const getVendorState = (state: RootState) => state.VendorReducer;
const getCurrencyState = (state: RootState) => state.CurrencyReducer;

const CreateContract: React.FC<CreateContractProps> = () => {
  const backHistory = useBackHistory();
  const dispatch = useDispatch();
  const { vendorList, loadingVendor } = useSelector(getVendorState);
  const { currencyList, loadingCurrency } = useSelector(getCurrencyState);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormCreateContract>({
    resolver: yupResolver(schemaContract),
  });
  const [files, setFiles] = useState<File[]>();
  const memoizedControl = useMemo(() => control, []);

  const onSubmit = (contract: TFormCreateContract) => {
    const endDate = new Date(contract.endDate).toISOString();
    const startDate = new Date(contract.startDate).toISOString();

    const newContract = {
      ...contract,
      endDate: endDate,
      startDate: startDate,
      currencyId: contract.currencyId.value,
      partnerId: contract.partnerId.value,
    };

    console.log(newContract);
    // dispatch(postNewContract(newContract));
  };

  useEffect(() => {
    if (!vendorList.length) {
      dispatch(GetVendorList());
    }
    if (!currencyList.length) {
      dispatch(getCurrencyList());
    }
  }, []);

  if (loadingVendor || loadingCurrency) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderSaveAction title="New Contract" onCancelButton={backHistory} />
          <div className="form_box">
            <div className={classes.form_box_help}>
              <InputContainer title="Summary">
                <TextField
                  errorText={errors.contractCode?.message}
                  label="Contract Code"
                  id="contractCode"
                  placeholder="Contract Code"
                  required
                  {...register('contractCode')}
                />
                <TextField
                  errorText={errors.no?.message}
                  label="Contract No"
                  id="no"
                  placeholder="Contract No"
                  required
                  {...register('no')}
                />
                <TextField
                  errorText={errors.name?.message}
                  label="Contract Name"
                  id="name"
                  placeholder="Contract Name"
                  required
                  {...register('name')}
                />
                <div className={classes.group_input_price}>
                  <TextField
                    errorText={errors.price?.message}
                    label="Agreement Price"
                    id="price"
                    placeholder="0,00"
                    required
                    {...register('price')}
                  />
                  <Select
                    label=""
                    id="currency"
                    name="currencyId"
                    control={memoizedControl}
                    options={currencyList}
                    optionValue="currencyId"
                    optionLabel="symbol"
                    defaultValue={{
                      value: currencyList[0]?.currencyId,
                      label: currencyList[0]?.symbol,
                    }}
                  />
                </div>
              </InputContainer>
              <InputContainer>
                <Select
                  errorText={errors.partnerId?.value?.message}
                  label="Vendor"
                  id="partnerId"
                  name="partnerId"
                  control={memoizedControl}
                  placeholder="Chose partner"
                  options={vendorList}
                  optionValue="partnerId"
                  optionLabel="name"
                  required
                  isLoading={loadingVendor}
                  isDisabled={loadingVendor}
                />
                <div className={classes.group_input}>
                  <TextField
                    errorText={errors.startDate?.message}
                    label="Contract Start Date"
                    id="startDate"
                    placeholder="0000-00-12"
                    required
                    {...register('startDate')}
                  />
                  <TextField
                    errorText={errors.endDate?.message}
                    label="Contract End Date"
                    id="endDate"
                    placeholder="0000-00-12"
                    required
                    {...register('endDate')}
                  />
                </div>
                <TextArea
                  errorText={errors.description?.message}
                  label="Description"
                  id="description"
                  placeholder="Enter description here ..."
                  control={control}
                  name="description"
                />
              </InputContainer>
            </div>
            <Divider margin="53px 0 32px 0" />
            <div className={classes.form_box_document}>
              <InputContainer title="Documents" />
              <FileInput getFiles={setFiles} name="contractFile" control={control} />
            </div>
            <div className={classes.form_box_files}>
              {files
                ? files.map((file) => <PreviewFile nameFile={file.name} key={file.name} />)
                : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;
