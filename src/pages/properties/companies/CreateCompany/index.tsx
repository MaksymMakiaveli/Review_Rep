import React, { memo, useState } from 'react';

import { postNewCompany } from '@Actions/company.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackHistory, useGetCityAndCountry } from '@hooks';
import { RootState } from '@RootStateType';
import { schemaCompany } from '@schema/company';
import { TSelectValue } from '@Types/application.types';
import { TFormCreateCompany } from '@Types/company.types';
import { City } from '@Types/definition.types';
import { Divider, TextField, Select } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface CreateCompanyProps {}

const getLoadingCompany = (state: RootState) => state.CompanyReducer.loadingCompany;

const getLoadingDefinition = (state: RootState) => state.DefinitionReducer.loadingDefinition;

const CreateCompany: React.FC<CreateCompanyProps> = () => {
  const dispatch = useDispatch();
  const backHistory = useBackHistory();
  const loadingCompany = useSelector(getLoadingCompany);
  const loadingDefinition = useSelector(getLoadingDefinition);
  const { citiesList, countriesList } = useGetCityAndCountry();
  const [countryValue, setCountryValue] = useState<TSelectValue<number>>();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TFormCreateCompany>({ resolver: yupResolver(schemaCompany) });

  const onSubmit = (company: TFormCreateCompany) => {
    const newCompany = {
      ...company,
      cityId: company.cityId.value,
      countryId: company.countryId.value,
    };
    dispatch(postNewCompany(newCompany));
  };

  const getCountryValue = (countryId: TSelectValue<number>) => {
    setCountryValue(countryId);
  };

  const filterCity = (): City[] => {
    return citiesList.filter((city) => city.countryId === countryValue?.value);
  };

  if (loadingCompany) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderSaveAction title="New Company" errors={errors} onCancelButton={backHistory} />
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
                <Select
                  errorText={errors.countryId?.value?.message}
                  label="Country"
                  id="Country"
                  name="countryId"
                  control={control}
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
                  errorText={errors.cityId?.value?.message}
                  label="City"
                  id="City"
                  name="cityId"
                  control={control}
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
    </div>
  );
};

export default memo(CreateCompany);
