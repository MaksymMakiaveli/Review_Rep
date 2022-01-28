import React, { useEffect, useMemo } from 'react';
import classes from '../Contract.module.scss';
import { FileInput, CustomInput, CustomSelect, Divider, TextField } from '@UiKitComponents';
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
    setValue,
    handleSubmit,
  } = useForm<TFormCreateContract>({
    resolver: yupResolver(schemaContract),
  });

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
      contractFile: '',
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

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderSaveAction title="New Contract" onCancelButton={backHistory} />
          <div className="form_box">
            <div className={classes.form_box_help}>
              <InputContainer title="Summary">
                <CustomInput
                  errorText={errors.contractCode?.message}
                  label="Contract Code"
                  id="contractCode"
                  placeholder="Contract Code"
                  required
                  {...register('contractCode')}
                />
                <CustomInput
                  errorText={errors.no?.message}
                  label="Contract No"
                  id="no"
                  placeholder="Contract No"
                  required
                  {...register('no')}
                />
                <CustomInput
                  errorText={errors.name?.message}
                  label="Contract Name"
                  id="name"
                  placeholder="Contract Name"
                  required
                  {...register('name')}
                />
                <div className={classes.group_input_price}>
                  <CustomInput
                    errorText={errors.price?.message}
                    label="Agreement Price"
                    id="price"
                    placeholder="0,00"
                    required
                    {...register('price')}
                  />
                  <CustomSelect
                    label=""
                    id="currency"
                    name="currencyId"
                    control={control}
                    options={currencyList}
                    optionValue="currencyId"
                    optionLabel="symbol"
                    isDisabled={loadingCurrency}
                  />
                </div>
              </InputContainer>
              <InputContainer>
                <CustomSelect
                  label="Vendor"
                  id="partnerId"
                  name="partnerId"
                  control={control}
                  placeholder="Chose partner"
                  options={vendorList}
                  optionValue="partnerId"
                  optionLabel="name"
                  required
                  isLoading={loadingVendor}
                  isDisabled={loadingVendor}
                  setValue={setValue}
                />
                <div className={classes.group_input}>
                  <CustomInput
                    errorText={errors.startDate?.message}
                    label="Contract Start Date"
                    id="startDate"
                    placeholder="0000-00-12"
                    required
                    {...register('startDate')}
                  />
                  <CustomInput
                    errorText={errors.endDate?.message}
                    label="Contract End Date"
                    id="endDate"
                    placeholder="0000-00-12"
                    required
                    {...register('endDate')}
                  />
                </div>
                <TextField
                  errorText={errors.description?.message}
                  maxLength={150}
                  label="Description"
                  id="description"
                  name="description"
                  placeholder="Enter description here ..."
                  control={memoizedControl}
                />
              </InputContainer>
            </div>
            <Divider margin="53px 0 32px 0" />
            <div className={classes.form_box_help}>
              <InputContainer title="Documents" />
              <FileInput name="contractFile" control={control} />
              <input type="file" multiple />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;
