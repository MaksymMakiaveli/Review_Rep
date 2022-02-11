import React, { useState, useEffect, useMemo } from 'react';
import { Divider, TextField, Select } from '@UiKitComponents';
import { Vendor, TFormCreateVendor, TUpdateVendor } from '@Types/vendor.types';
import { HeaderSaveAction, InputContainer } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { updateVendor } from '@Actions/vendor.action';
import { schemaVendor } from '@schema/vendor';
import { RootState } from '@RootStateType';
import { getCitiesList, getCountriesList } from '@Actions/definition.action';
import { City } from '@Types/definition.types';
import { TSelectValue } from '@Types/application.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditProps {
  currentVendor: Vendor;
  backToPreview: (modeEdit: boolean) => void;
}

const getDefinitionState = (state: RootState) => state.DefinitionReducer;

const Edit: React.FC<EditProps> = (props) => {
  const { currentVendor, backToPreview } = props;
  const { loadingDefinition, countriesList, citiesList } = useSelector(getDefinitionState);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TFormCreateVendor>({
    resolver: yupResolver(schemaVendor),
  });
  const memoizedControl = useMemo(() => control, []);

  const countryDefaultValue = useMemo(
    () => ({
      value: currentVendor.city.countryId,
      label: currentVendor.city.country.name,
    }),
    []
  );
  const cityDefaultValue = useMemo(
    () => ({
      value: currentVendor.city.cityId,
      label: currentVendor.city.name,
    }),
    []
  );

  const [countryValue, setCountryValue] = useState<TSelectValue<number>>(countryDefaultValue);

  const getCountryValue = (country: TSelectValue<number>) => {
    setCountryValue(country);
  };

  const filterCitiesList = (): City[] => {
    return citiesList.filter((city) => city.countryId === countryValue.value);
  };

  useEffect(() => {
    if (!countriesList.length && !loadingDefinition) {
      dispatch(getCountriesList());
    }
    if (!citiesList.length && !loadingDefinition) {
      dispatch(getCitiesList());
    }
  }, []);

  const onSubmit = (vendor: TFormCreateVendor) => {
    const NewVendor: TUpdateVendor = {
      ...vendor,
      countryId: vendor.countryId.value,
      cityId: vendor.cityId.value,
      partnerId: currentVendor.partnerId,
    };
    dispatch(updateVendor(NewVendor));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderSaveAction
          title={currentVendor.name}
          errors={errors}
          onCancelButton={backToPreview}
        />
        <div className="form_box">
          <InputContainer title="Summary" columns={2}>
            <TextField
              errorText={errors.name?.message}
              id="VendorName"
              placeholder="Vendor name"
              label="Vendor name"
              defaultValue={currentVendor.name}
              isActive
              {...register('name')}
            />
            <TextField
              errorText={errors.taxOffice?.message}
              id="TaxOffice"
              placeholder="Tax Office"
              label="Tax Office"
              defaultValue={currentVendor.taxOffice}
              isActive
              {...register('taxOffice')}
            />
            <TextField
              errorText={errors.partnerCode?.message}
              id="PartnerCode"
              placeholder="Vendor code"
              label="Vendor code"
              defaultValue={currentVendor.partnerCode}
              isActive
              {...register('partnerCode')}
            />
            <TextField
              errorText={errors.taxNumber?.message}
              id="TXN"
              placeholder="TXN"
              label="TXN"
              defaultValue={currentVendor.taxNumber}
              isActive
              {...register('taxNumber')}
            />
          </InputContainer>
          <Divider margin="40px 0 20px 0" />
          <div className="markup_helper-box">
            <InputContainer title="Location">
              <Select
                options={countriesList}
                defaultValue={countryDefaultValue}
                label="Country"
                id="Country"
                name="countryId"
                control={memoizedControl}
                placeholder="Choose country"
                optionValue="countryId"
                optionLabel="name"
                isLoading={loadingDefinition}
                isDisabled={loadingDefinition}
                getSelectValue={getCountryValue}
                isActive
              />

              <Select
                options={filterCitiesList()}
                defaultValue={cityDefaultValue}
                name="cityId"
                control={memoizedControl}
                label="City"
                id="City"
                placeholder="Choose city"
                optionValue="cityId"
                optionLabel="name"
                isLoading={loadingDefinition}
                isDisabled={!filterCitiesList().length || loadingDefinition}
                isActive
              />

              <TextField
                errorText={errors.address?.message}
                id="Address"
                placeholder="Add address"
                label="Address"
                defaultValue={currentVendor.address}
                isActive
                {...register('address')}
              />
            </InputContainer>
            <InputContainer title="Contacts">
              <TextField
                errorText={errors.email?.message}
                id="Email"
                placeholder="Email"
                label="Email"
                defaultValue={currentVendor.email}
                isActive
                {...register('email')}
              />
              <TextField
                errorText={errors.phone?.message}
                id="PhoneNumber"
                placeholder="Phone number"
                label="Phone number"
                defaultValue={currentVendor.phone}
                isActive
                {...register('phone')}
              />
            </InputContainer>
          </div>
        </div>
      </form>
    </>
  );
};

export default Edit;