import React, { memo, useEffect, useMemo, useState } from 'react';

import { getCitiesList, getCountriesList } from '@Actions/definition.action';
import { postNewVendor } from '@Actions/vendor.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackHistory } from '@hooks';
import { RootState } from '@RootStateType';
import { schemaVendor } from '@schema/vendor';
import { TSelectValue } from '@Types/application.types';
import { City } from '@Types/definition.types';
import { TFormCreateVendor } from '@Types/vendor.types';
import { TextField, Select, Divider } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface CreateVendorProps {}

const getLoadingVendor = (state: RootState) => state.VendorReducer.loadingVendor;
const getDefinitionState = (state: RootState) => state.DefinitionReducer;

const CreateVendor: React.FC<CreateVendorProps> = () => {
  const { citiesList, countriesList, loadingDefinition } = useSelector(getDefinitionState);
  const loadingVendor = useSelector(getLoadingVendor);

  const dispatch = useDispatch();
  const backHistory = useBackHistory();

  const [countryValue, setCountryValue] = useState<TSelectValue<number>>();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TFormCreateVendor>({
    resolver: yupResolver(schemaVendor),
  });

  const memoizedControl = useMemo(() => control, []);

  const onSubmit = (vendor: TFormCreateVendor) => {
    const newVendor = {
      ...vendor,
      cityId: vendor.cityId.value,
      countryId: vendor.countryId.value,
    };
    dispatch(postNewVendor(newVendor));
  };

  const getCountryValue = (country: TSelectValue<number>) => {
    setCountryValue(country);
  };

  const filterCity = (): City[] => {
    return citiesList.filter((city) => city.countryId === countryValue?.value);
  };

  useEffect(() => {
    if (!countriesList.length && !loadingDefinition) {
      dispatch(getCountriesList());
    }
    if (!citiesList.length && !loadingDefinition) {
      dispatch(getCitiesList());
    }
  }, []);

  if (loadingVendor) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderSaveAction title="New Vendor" errors={errors} onCancelButton={backHistory} />
          <div className="form_box">
            <InputContainer title="Summary" columns={2}>
              <TextField
                errorText={errors.name?.message}
                id="VendorName"
                placeholder="Vendor name"
                label="Vendor name"
                required
                {...register('name')}
              />
              <TextField
                errorText={errors.taxOffice?.message}
                id="TaxOffice"
                placeholder="Tax Office"
                label="Tax Office"
                {...register('taxOffice')}
              />
              <TextField
                errorText={errors.partnerCode?.message}
                id="PartnerCode"
                placeholder="Vendor code"
                label="Vendor code"
                required
                {...register('partnerCode')}
              />
              <TextField
                errorText={errors.taxNumber?.message}
                id="TXN"
                placeholder="TXN"
                label="TXN"
                required
                {...register('taxNumber')}
              />
            </InputContainer>
            <Divider margin="50px 0 30px 0" />
            <div className="markup_helper-box">
              <InputContainer title="Location">
                <Select
                  label="Country"
                  id="Country"
                  name="countryId"
                  control={memoizedControl}
                  placeholder="Choose country"
                  options={countriesList}
                  optionValue="countryId"
                  optionLabel="name"
                  isLoading={loadingDefinition}
                  isDisabled={loadingDefinition}
                  getSelectValue={getCountryValue}
                  required
                />
                <Select
                  label="City"
                  id="City"
                  name="cityId"
                  control={memoizedControl}
                  placeholder="Choose city"
                  options={filterCity()}
                  optionValue="cityId"
                  optionLabel="name"
                  isDisabled={loadingDefinition || !filterCity().length}
                  isLoading={loadingDefinition}
                  required
                />

                <TextField
                  errorText={errors.address?.message}
                  id="Address"
                  placeholder="Add address"
                  label="Address"
                  required
                  {...register('address')}
                />
              </InputContainer>
              <InputContainer title="Contacts">
                <TextField
                  errorText={errors.email?.message}
                  id="Email"
                  placeholder="Email"
                  label="Email"
                  {...register('email')}
                />
                <TextField
                  errorText={errors.phone?.message}
                  id="PhoneNumber"
                  placeholder="Phone number"
                  label="Phone number"
                  required
                  {...register('phone')}
                />
              </InputContainer>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateVendor);
