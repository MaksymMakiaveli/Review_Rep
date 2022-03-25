import React from 'react';

import { updateVendor } from '@Actions/vendor.action';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaVendor } from '@schema/vendor';
import { Vendor, IFormVendor } from '@Types/vendor.types';
import { Divider, TextField, SelectNew } from '@UiKitComponents';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGetCityAndCountry } from '@hooks';
import { Loader } from '@common';

interface EditProps {
  currentVendor: Vendor;
  backToPreview: () => void;
}

const Edit: React.FC<EditProps> = (props) => {
  const { currentVendor, backToPreview } = props;
  const { countriesList, loadingDefinition, filteredCityList, getCountryId } =
    useGetCityAndCountry();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IFormVendor>({
    resolver: yupResolver(schemaVendor),
  });

  const onSubmit: SubmitHandler<IFormVendor> = (vendor) => {
    dispatch(updateVendor({ ...vendor, partnerId: currentVendor.partnerId }, backToPreview));
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
              <SelectNew
                errors={errors.countryId?.message}
                label="Country"
                control={control}
                name="countryId"
                options={countriesList}
                optionValue={'countryId'}
                optionLabel={'name'}
                getValue={getCountryId}
                defaultValue={currentVendor.city.countryId}
                isRequired
              />
              <SelectNew
                errors={errors.cityId?.message}
                options={filteredCityList}
                label="City"
                control={control}
                name="cityId"
                optionValue={'cityId'}
                optionLabel={'name'}
                defaultValue={currentVendor.city.cityId}
                isRequired
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
