import { useEffect, useState } from 'react';

import { getCitiesList, getCountriesList } from '@Actions/definition.action';
import { RootState } from '@RootStateType';
import { City, Country } from '@Types/definition.types';
import { useDispatch, useSelector } from 'react-redux';

interface Return {
  citiesList: City[];
  countriesList: Country[];
  filteredCityList: City[];
  loadingDefinition: boolean;
  getCountryId: (id: number | string | undefined) => void;
}

const getDefinitionState = (state: RootState) => state.DefinitionReducer;

const useGetCityAndCountry = (): Return => {
  const { citiesList, countriesList, loadingDefinition } = useSelector(getDefinitionState);
  const [countryID, setCountryID] = useState<number | undefined>(undefined);
  const [filteredCityList, setFilteredCityList] = useState<City[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!citiesList.length) {
      dispatch(getCitiesList());
    }
  }, []);

  useEffect(() => {
    if (!countriesList.length) {
      dispatch(getCountriesList());
    }
  }, []);

  function getCountryId(id: number | string | undefined) {
    if (typeof id === 'number') {
      setCountryID(id);
    } else {
      setCountryID(undefined);
    }
  }

  useEffect(() => {
    if (countryID) {
      const selectedCountry = countriesList.filter((country) => country.countryId === countryID)[0];
      setFilteredCityList(selectedCountry.cities);
    } else {
      setFilteredCityList([]);
    }
  }, [countryID]);

  return {
    citiesList,
    countriesList,
    loadingDefinition,
    getCountryId,
    filteredCityList,
  };
};

export default useGetCityAndCountry;
