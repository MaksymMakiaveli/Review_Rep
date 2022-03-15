import React, { memo, useMemo, useState } from 'react';

import { postNewSite } from '@Actions/site.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackHistory, useGetCityAndCountry } from '@hooks';
import { RootState } from '@RootStateType';
import { schemaSite } from '@schema/site';
import { TSelectValue } from '@Types/application.types';
import { City } from '@Types/definition.types';
import { TFormCreateSite } from '@Types/site.types';
import { TextField, TextArea, Select, Divider } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface CreateSiteProps {}

const getSiteState = (state: RootState) => state.SiteReducer;

const CreateSite: React.FC<CreateSiteProps> = () => {
  const dispatch = useDispatch();
  const backHistory = useBackHistory();
  const { citiesList, countriesList, loadingDefinition } = useGetCityAndCountry();
  const { siteList, loadingSite } = useSelector(getSiteState);
  const [countryValue, setCountryValue] = useState<TSelectValue<number>>();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TFormCreateSite>({
    resolver: yupResolver(schemaSite),
  });

  const memoizedControl = useMemo(() => control, []);

  const onSubmit = (site: TFormCreateSite) => {
    const newSite = {
      ...site,
      cityId: site.cityId.value,
      countryId: site.countryId.value,
      parentSiteId: site.parentSiteId ? site.parentSiteId.value : undefined,
    };
    dispatch(postNewSite(newSite));
  };

  const getCountryValue = (country: TSelectValue<number>) => {
    setCountryValue(country);
  };

  const filterCity = (): City[] => {
    return citiesList.filter((city) => city.countryId === countryValue?.value);
  };

  if (loadingSite || loadingDefinition) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderSaveAction title="New Site" errors={errors} onCancelButton={backHistory} />
          <div className="form_box">
            <InputContainer columns={2} title="Summary">
              <TextField
                errorText={errors.name?.message}
                id="SiteName"
                placeholder="Site name"
                label="Site name"
                required
                {...register('name')}
              />
              <TextField
                errorText={errors.barcode?.message}
                id="SiteBarcode"
                placeholder="Site Barcode"
                label="Site Barcode"
                required
                {...register('barcode')}
              />
              <TextField
                errorText={errors.siteCode?.message}
                id="SiteCode"
                placeholder="Site code"
                label="Site code"
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
                  isDisabled={!filterCity().length}
                  required
                />

                <TextField
                  errorText={errors.town?.message}
                  id="Town"
                  placeholder="Text"
                  label="Town"
                  {...register('town')}
                />
                <TextField
                  errorText={errors.area?.message}
                  id="Area"
                  placeholder="Area"
                  label="Area"
                  {...register('area')}
                />
              </InputContainer>
              <InputContainer>
                <TextField
                  errorText={errors.address?.message}
                  id="Address"
                  placeholder="Add address"
                  label="Address"
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
                />
              </InputContainer>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateSite);
