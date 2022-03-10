import React, { useState, useMemo } from 'react';

import { updateSite } from '@Actions/site.action';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetCityAndCountry } from '@hooks';
import { RootState } from '@RootStateType';
import { schemaSite } from '@schema/site';
import { TSelectValue } from '@Types/application.types';
import { City } from '@Types/definition.types';
import { Site, TFormCreateSite, TUpdateSite } from '@Types/site.types';
import { Divider, TextField, TextArea, Select } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface EditProps {
  currentSite: Site;
  backToPreview: (modeEdit: boolean) => void;
}

const getSiteState = (state: RootState) => state.SiteReducer;
const getLoadingDefinition = (state: RootState) => state.DefinitionReducer.loadingDefinition;

const Edit: React.FC<EditProps> = (props) => {
  const { currentSite, backToPreview } = props;
  const { citiesList, countriesList } = useGetCityAndCountry();
  const loadingDefinition = useSelector(getLoadingDefinition);
  const { siteList, loadingSite } = useSelector(getSiteState);
  const parentSite = currentSite.parentSite ? currentSite.parentSite.name : '';
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TFormCreateSite>({
    resolver: yupResolver(schemaSite),
  });
  const memoizedControl = useMemo(() => control, []);

  const countryDefaultValue = useMemo(
    () => ({
      value: currentSite.countryId,
      label: currentSite.city.country.name,
    }),
    []
  );
  const cityDefaultValue = useMemo(
    () => ({
      value: currentSite.cityId,
      label: currentSite.city.name,
    }),
    []
  );
  const parentDefaultValue = useMemo(
    () => ({
      value: currentSite.parentSiteId,
      label: parentSite,
    }),
    []
  );  

  const [countryValue, setCountryValue] = useState<TSelectValue<number>>(countryDefaultValue);

  const getCountryValue = (country: TSelectValue<number>) => {
    setCountryValue(country);
  };

  const filterCity = (): City[] => {
    return citiesList.filter((city) => city.countryId === countryValue?.value);
  };

  const onSubmit = (site: TFormCreateSite) => {
    const newSite: TUpdateSite = {
      ...site,
      siteId: currentSite.siteId,
      countryId: site.countryId.value,
      cityId: site.cityId.value,
      parentSiteId: site.parentSiteId.value,
    };
    
    dispatch(updateSite(newSite));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderSaveAction title={currentSite.name} errors={errors} onCancelButton={backToPreview} />
        <div className="form_box">
        <InputContainer columns={2} title="Summary">
              <TextField
                errorText={errors.name?.message}
                id="SiteName"
                placeholder="Site name"
                label="Site name"
                defaultValue={currentSite.name}
                isActive
                required
                {...register('name')}
              />
              <TextField
                errorText={errors.barcode?.message}
                id="SiteBarcode"
                placeholder="Site Barcode"
                label="Site Barcode"
                defaultValue={currentSite.barcode}
                isActive
                required
                {...register('barcode')}
              />
              <TextField
                errorText={errors.siteCode?.message}
                id="SiteCode"
                placeholder="Site code"
                label="Site code"
                defaultValue={currentSite.siteCode}
                isActive
                required
                {...register('siteCode')}
              />
              <Select
                label="Parent site"
                id="ParentSiteId"
                name="parentSiteId"
                control={memoizedControl}
                placeholder="Choose parent site"
                options={siteList}
                optionValue="siteId"
                optionLabel="name"
                isLoading={loadingSite}
                isDisabled={loadingSite}
                defaultValue={parentDefaultValue}
                isActive
              />
            </InputContainer>
            <Divider margin="50px 0 30px 0" />
            <div className="markup_helper-box">
              <InputContainer title="Location">
                <Select
                  errorText={errors.countryId?.value?.message}
                  options={countriesList}
                  defaultValue={countryDefaultValue}
                  label="Country"
                  id="Country"
                  name="countryId"
                  control={control}
                  placeholder="Choose country"
                  optionValue="countryId"
                  optionLabel="name"
                  isLoading={loadingDefinition}
                  isDisabled={loadingDefinition}
                  getSelectValue={getCountryValue}
                  isActive
                  required
                />
                <Select
                  errorText={errors.cityId?.value?.message}
                  options={filterCity()}
                  defaultValue={cityDefaultValue}
                  name="cityId"
                  control={control}
                  label="City"
                  id="City"
                  placeholder="Choose city"
                  optionValue="cityId"
                  optionLabel="name"
                  isLoading={loadingDefinition}
                  isDisabled={!filterCity().length || loadingDefinition}
                  isActive
                  required
                />

                <TextField
                  errorText={errors.town?.message}
                  id="Town"
                  placeholder="Text"
                  label="Town"
                  defaultValue={currentSite.town}
                  isActive
                  {...register('town')}
                />
                <TextField
                  errorText={errors.area?.message}
                  id="Area"
                  placeholder="Area"
                  label="Area"
                  defaultValue={currentSite.area}
                  isActive
                  {...register('area')}
                /> 
              </InputContainer>
              <InputContainer title="">
                <TextField
                  errorText={errors.address?.message}
                  id="Address"
                  placeholder="Add address"
                  label="Address"
                  defaultValue={currentSite.address}
                  isActive
                  required
                  {...register('address')}
                />
                <TextArea
                  errorText={errors.description?.message}
                  label="Description"
                  id="description"
                  placeholder="Enter description here ..."
                  control={control}
                  name="description"
                  defaultValue={currentSite.description}
                  isActive
                />
              </InputContainer>
          </div>
        </div>
      </form>
    </>
  );
};

export default Edit;