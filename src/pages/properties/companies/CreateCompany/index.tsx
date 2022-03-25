import React, { memo, useEffect } from 'react';

import { Loader } from '@common';
import { InputContainer, PageHeaderActions } from '@components';

import { useGetCityAndCountry } from '@hooks';

import { IFormCompany } from '@Types/company.types';
import { Divider, SelectNew, TextField } from '@UiKitComponents';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postNewCompany } from '@Actions/company.action';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCompany } from '@schema/company';

interface CreateCompanyProps {}

const CreateCompany: React.FC<CreateCompanyProps> = () => {
  const dispatch = useDispatch();
  const { countriesList, loadingDefinition, filteredCityList, getCountryId } =
    useGetCityAndCountry();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<IFormCompany>({
    resolver: yupResolver(schemaCompany),
  });

  useEffect(() => {
    if (filteredCityList.length) {
      setValue('cityId', filteredCityList[0].cityId);
    }
  }, [filteredCityList]);

  const onSubmit: SubmitHandler<IFormCompany> = (company) => {
    dispatch(postNewCompany(company));
  };

  if (loadingDefinition) {
    return <Loader />;
  }

  return (
    <div className="padding_wrapper_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeaderActions.SaveForm errors={errors} title="New Company" />
        <div className="form_box">
          <InputContainer columns={2} title="Summary">
            <TextField
              errorText={errors.name?.message}
              id="CompanyName"
              placeholder="Company name"
              label="Company name"
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
              errorText={errors.companyCode?.message}
              id="CompanyCode"
              placeholder="Company code"
              label="Company code"
              required
              {...register('companyCode')}
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
                errorText={errors.contactName?.message}
                id="Email"
                placeholder="Email"
                label="Email"
                required
                {...register('contactName')}
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
  );
};

export default memo(CreateCompany);
