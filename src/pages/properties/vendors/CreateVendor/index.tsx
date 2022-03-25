import React, { memo, useEffect } from 'react';

import { postNewVendor } from '@Actions/vendor.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackHistory, useGetCityAndCountry } from '@hooks';
import { schemaVendor } from '@schema/vendor';
import { IFormVendor } from '@Types/vendor.types';
import { TextField, Divider, SelectNew } from '@UiKitComponents';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface CreateVendorProps {}

const CreateVendor: React.FC<CreateVendorProps> = () => {
  const { countriesList, loadingDefinition, filteredCityList, getCountryId } =
    useGetCityAndCountry();
  const dispatch = useDispatch();
  const backHistory = useBackHistory();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<IFormVendor>({
    resolver: yupResolver(schemaVendor),
  });

  useEffect(() => {
    if (filteredCityList.length) {
      setValue('cityId', filteredCityList[0].cityId);
    }
  }, [filteredCityList]);

  const onSubmit: SubmitHandler<IFormVendor> = (vendor) => {
    dispatch(postNewVendor(vendor));
  };

  if (loadingDefinition) {
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
                <SelectNew
                  errors={errors.countryId?.message}
                  label="Country"
                  control={control}
                  name="countryId"
                  options={countriesList}
                  optionValue={'countryId'}
                  optionLabel={'name'}
                  getValue={getCountryId}
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
                  isRequired
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
