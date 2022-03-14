import React, { useMemo, useState } from 'react';

import { updateCompany } from '@Actions/company.action';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCompany } from '@schema/company';
import { Company, TFormCreateCompany, TUpdateCompany } from '@Types/company.types';
import { TextField, Divider, Select } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { TSelectValue } from '@Types/application.types';
import { City } from '@Types/definition.types';
import { useGetCityAndCountry } from '@hooks';
import { Loader } from '@common';

interface EditProps {
  currentCompany: Company;
  backToPreview: () => void;
}

const Edit: React.FC<EditProps> = (props) => {
  const { currentCompany, backToPreview } = props;
  const { citiesList, countriesList, loadingDefinition } = useGetCityAndCountry();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<TFormCreateCompany>({
    resolver: yupResolver(schemaCompany),
  });

  const memoizedControl = useMemo(() => control, []);

  const countryDefaultValue = useMemo(
    () => ({
      value: currentCompany.city.countryId,
      label: currentCompany.city.country.name,
    }),
    []
  );
  const cityDefaultValue = useMemo(
    () => ({
      value: currentCompany.city.cityId,
      label: currentCompany.city.name,
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

  const onSubmit = (company: TFormCreateCompany) => {
    const newCompany: TUpdateCompany = {
      ...company,
      companyId: currentCompany.companyId,
      cityId: company.cityId.value,
      countryId: company.countryId.value,
    };
    dispatch(updateCompany(newCompany, backToPreview));
  };

  if (loadingDefinition) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSaveAction
        title={currentCompany.name}
        errors={errors}
        onCancelButton={backToPreview}
      />
      <div className="form_box">
        <InputContainer title="Summary" columns={2}>
          <TextField
            errorText={errors.name?.message}
            id="CompanyName"
            placeholder="Company name"
            label="Company name"
            defaultValue={currentCompany.name}
            isActive
            {...register('name')}
          />

          <TextField
            errorText={errors.taxOffice?.message}
            id="TaxOffice"
            placeholder="Tax Office"
            label="Tax Office"
            defaultValue={currentCompany.taxOffice}
            isActive
            {...register('taxOffice')}
          />

          <TextField
            errorText={errors.companyCode?.message}
            id="CompanyCode"
            placeholder="Company code"
            label="Company code"
            defaultValue={currentCompany.companyCode}
            isActive
            {...register('companyCode')}
          />
          <TextField
            errorText={errors.taxNumber?.message}
            id="TXN"
            placeholder="TXN"
            label="TXN"
            defaultValue={currentCompany.taxNumber}
            isActive
            {...register('taxNumber', { valueAsNumber: true })}
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
              isDisabled={loadingDefinition}
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
              defaultValue={currentCompany.address}
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
              defaultValue={currentCompany.contactName}
              isActive
              {...register('contactName')}
            />
            <TextField
              errorText={errors.phone?.message}
              id="PhoneNumber"
              placeholder="Phone number"
              label="Phone number"
              defaultValue={currentCompany.phone}
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
