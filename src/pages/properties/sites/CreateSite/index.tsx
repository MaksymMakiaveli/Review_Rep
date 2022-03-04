import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@RootStateType';
import { TextField, TextArea, Select, Divider } from '@UiKitComponents';
import { TFormCreateSite } from '@Types/site.types';
import { postNewSite, GetSiteList } from '@Actions/site.action';
import { Loader } from '@common';
import { useBackHistory, useGetCityAndCountry } from '@hooks';
import { schemaSite } from '@schema/site';
import { HeaderSaveAction, InputContainer } from '@components';
import { City } from '@Types/definition.types';
import { TSelectValue } from '@Types/application.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface CreateSiteProps {}

const getLoadingSite = (state: RootState) => state.SiteReducer.loadingSite;
const getLoadingDefinition = (state: RootState) => state.DefinitionReducer.loadingDefinition;
const getSiteState = (state: RootState) => state.SiteReducer;

const CreateSite: React.FC<CreateSiteProps> = () => {
  const dispatch = useDispatch();
  const backHistory = useBackHistory();
  const loadingSite = useSelector(getLoadingSite);
  const loadingDefinition = useSelector(getLoadingDefinition);
  const { citiesList, countriesList } = useGetCityAndCountry();
  const { siteList } = useSelector(getSiteState);
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
    console.log(site);
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

  useEffect(() => {
    if (!siteList.length) {
      dispatch(GetSiteList());
    }
  }, [siteList]);

  if (loadingSite) {
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
