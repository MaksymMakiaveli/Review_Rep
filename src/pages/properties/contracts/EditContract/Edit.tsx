import React, { useEffect, useMemo } from 'react';
import { Contract, TFormCreateContract } from '@Types/contract.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaContract } from '@schema/contract';
import { HeaderSaveAction, InputContainer } from '@components';
import classes from '../Contract.module.scss';
import { TextField, Select, Divider, TextArea } from '@UiKitComponents';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@common';
import { GetVendorList } from '@Actions/vendor.action';
import { getCurrencyList } from '@Actions/currency.action';

interface EditProps {
  currentContract: Contract;
  backToPreview: (modeEdit: boolean) => void;
}

const getVendorState = (state: RootState) => state.VendorReducer;
const getCurrencyState = (state: RootState) => state.CurrencyReducer;

const Edit: React.FC<EditProps> = (props) => {
  const { currentContract, backToPreview } = props;
  const dispatch = useDispatch();
  const { vendorList, loadingVendor } = useSelector(getVendorState);
  const { currencyList, loadingCurrency } = useSelector(getCurrencyState);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<TFormCreateContract>({
    resolver: yupResolver(schemaContract),
  });

  const memoizedControl = useMemo(() => control, []);

  const onSubmit = (contract: TFormCreateContract) => {
    console.log(contract);
  };

  const currencySymbol = currencyList.filter(
    (currency) => currency.currencyId === currentContract.currencyId
  );

  const currencyDefaultValue = useMemo(
    () => ({
      value: currentContract.currencyId,
      label: currencySymbol[0]?.symbol,
    }),
    [currencySymbol]
  );
  const partnerDefaultValue = useMemo(
    () => ({
      value: currentContract.partner.partnerId,
      label: currentContract.partner.name,
    }),
    []
  );

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSaveAction
        title={`Contract ${currentContract.no}`}
        errors={errors}
        onCancelButton={backToPreview}
      />
      <div className="form_box">
        <div className={classes.form_box_help}>
          <InputContainer title="Summary">
            <TextField
              errorText={errors.contractCode?.message}
              label="Contract Code"
              id="contractCode"
              placeholder="Contract Code"
              defaultValue={currentContract.contractCode}
              required
              isActive
              {...register('contractCode')}
            />
            <TextField
              errorText={errors.no?.message}
              label="Contract No"
              id="no"
              placeholder="Contract No"
              defaultValue={currentContract.no}
              required
              isActive
              {...register('no')}
            />
            <TextField
              errorText={errors.name?.message}
              label="Contract Name"
              id="name"
              placeholder="Contract Name"
              defaultValue={currentContract.name}
              required
              isActive
              {...register('name')}
            />
            <div className={classes.group_input_price}>
              <TextField
                errorText={errors.price?.message}
                label="Agreement Price"
                id="price"
                placeholder="0,00"
                defaultValue={currentContract.price}
                required
                isActive
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
                isActive
                defaultValue={currencyDefaultValue}
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
              isActive
              defaultValue={partnerDefaultValue}
            />
            <div className={classes.group_input}>
              <TextField
                errorText={errors.startDate?.message}
                label="Contract Start Date"
                id="startDate"
                placeholder="0000-00-12"
                required
                isActive
                defaultValue={currentContract.startDate}
                {...register('startDate')}
              />
              <TextField
                errorText={errors.endDate?.message}
                label="Contract End Date"
                id="endDate"
                placeholder="0000-00-12"
                required
                isActive
                defaultValue={currentContract.endDate}
                {...register('endDate')}
              />
            </div>
            <TextArea
              errorText={errors.description?.message}
              label="Description"
              id="description"
              placeholder="Enter description here ..."
              isActive
              name="description"
              control={control}
              defaultValue="22312412342"
            />
          </InputContainer>
        </div>
        <Divider margin="25px 0 25px 0" />
        <div className={classes.form_box_document}>
          <InputContainer title="Documents" />
        </div>
      </div>
    </form>
  );
};
export default Edit;
