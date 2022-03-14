import React, { useState, useMemo } from 'react';

import { updateVendor } from '@Actions/vendor.action';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaVendor } from '@schema/vendor';
import { TSelectValue } from '@Types/application.types';
import { City } from '@Types/definition.types';
import { Vendor, TFormCreateVendor, TUpdateVendor } from '@Types/vendor.types';
import { Divider, TextField, Select } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGetCityAndCountry } from '@hooks';
import { Loader } from '@common';

interface EditProps {
  currentVendor: Vendor;
  backToPreview: () => void;
}

const Edit: React.FC<EditProps> = (props) => {
  const { currentVendor, backToPreview } = props;
  const { loadingDefinition, countriesList, citiesList } = useGetCityAndCountry();
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

  const onSubmit = (vendor: TFormCreateVendor) => {
    const NewVendor: TUpdateVendor = {
      ...vendor,
      countryId: vendor.countryId.value,
      cityId: vendor.cityId.value,
      partnerId: currentVendor.partnerId,
    };
    dispatch(updateVendor(NewVendor, backToPreview));
  };

  if (loadingDefinition) {
    return <Loader />;
  }

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
              required
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
              required
              {...register('partnerCode')}
            />
            <TextField
              errorText={errors.taxNumber?.message}
              id="TXN"
              placeholder="TXN"
              label="TXN"
              defaultValue={currentVendor.taxNumber}
              isActive
              required
              {...register('taxNumber')}
            />
          </InputContainer>
          <Divider margin="40px 0 20px 0" />
          <div className="markup_helper-box">
            <InputContainer title="Location">
              <Select
                errorText={errors.countryId?.value?.message}
                options={countriesList}
                defaultValue={countryDefaultValue}
                label="Country"
                id="Country"
                name="countryId"
                control={memoizedControl}
                placeholder="Choose country"
                optionValue="countryId"
                optionLabel="name"
                getSelectValue={getCountryValue}
                isActive
                required
              />

              <Select
                errorText={errors.cityId?.value?.message}
                options={filterCitiesList()}
                defaultValue={cityDefaultValue}
                name="cityId"
                control={memoizedControl}
                label="City"
                id="City"
                placeholder="Choose city"
                optionValue="cityId"
                optionLabel="name"
                isDisabled={!filterCitiesList().length}
                isActive
                required
              />

              <TextField
                errorText={errors.address?.message}
                id="Address"
                placeholder="Add address"
                label="Address"
                defaultValue={currentVendor.address}
                isActive
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
                required
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
