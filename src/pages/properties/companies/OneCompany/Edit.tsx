import React, { useEffect } from 'react';

import { updateCompany } from '@Actions/company.action';
import { InputContainer, PageHeaderActions } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCompany } from '@schema/company';
import { Company, IFormCompany } from '@Types/company.types';
import { TextField, Divider, SelectNew } from '@UiKitComponents';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGetCityAndCountry } from '@hooks';
import { Loader } from '@common';

interface EditProps {
  company: Company;
}

const Edit: React.FC<EditProps> = (props) => {
  const { company } = props;
  const { filteredCityList, countriesList, loadingDefinition, getCountryId } =
    useGetCityAndCountry();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<IFormCompany>({
    resolver: yupResolver(schemaCompany),
  });

  useEffect(() => {
    if (filteredCityList.length) {
      setValue('cityId', filteredCityList[0].cityId);
    }
  }, [filteredCityList]);

  const onSubmit: SubmitHandler<IFormCompany> = (updatedCompany) => {
    dispatch(updateCompany({ ...updatedCompany, companyId: company.companyId }));
  };

  if (loadingDefinition) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageHeaderActions.SaveForm title={company.name} errors={errors} />
      <div className="form_box">
        <InputContainer title="Summary" columns={2}>
          <TextField
            errorText={errors.name?.message}
            id="CompanyName"
            placeholder="Company name"
            label="Company name"
            defaultValue={company.name}
            isActive
            {...register('name')}
          />

          <TextField
            errorText={errors.taxOffice?.message}
            id="TaxOffice"
            placeholder="Tax Office"
            label="Tax Office"
            defaultValue={company.taxOffice}
            isActive
            {...register('taxOffice')}
          />

          <TextField
            errorText={errors.companyCode?.message}
            id="CompanyCode"
            placeholder="Company code"
            label="Company code"
            defaultValue={company.companyCode}
            isActive
            {...register('companyCode')}
          />
          <TextField
            errorText={errors.taxNumber?.message}
            id="TXN"
            placeholder="TXN"
            label="TXN"
            defaultValue={company.taxNumber}
            isActive
            {...register('taxNumber', { valueAsNumber: true })}
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
              defaultValue={company.city.countryId}
              getValue={getCountryId}
              isRequired
              isActive
            />
            <SelectNew
              errors={errors.cityId?.message}
              options={filteredCityList}
              label="City"
              control={control}
              name="cityId"
              optionValue={'cityId'}
              optionLabel={'name'}
              defaultValue={company.city.cityId}
              isRequired
              isActive
            />
            <TextField
              errorText={errors.address?.message}
              id="Address"
              placeholder="Add address"
              label="Address"
              defaultValue={company.address}
              isActive
              {...register('address')}
            />
          </InputContainer>
          <InputContainer title="Contacts">
            <TextField
              errorText={errors.contactName?.message}
              id="Email"
              placeholder="Email"
              label="Email"
              defaultValue={company.contactName}
              isActive
              {...register('contactName')}
            />
            <TextField
              errorText={errors.phone?.message}
              id="PhoneNumber"
              placeholder="Phone number"
              label="Phone number"
              defaultValue={company.phone}
              isActive
              {...register('phone')}
            />
          </InputContainer>
        </div>
      </div>
    </form>
  );
};
export default Edit;
