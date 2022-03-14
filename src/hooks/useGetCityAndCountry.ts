import { useEffect } from 'react';

import { getCitiesList, getCountriesList } from '@Actions/definition.action';
import { RootState } from '@RootStateType';
import { City, Country } from '@Types/definition.types';
import { useDispatch, useSelector } from 'react-redux';

interface Return {
  citiesList: City[];
  countriesList: Country[];
  loadingDefinition: boolean;
}

const getDefinitionState = (state: RootState) => state.DefinitionReducer;

const useGetCityAndCountry = (): Return => {
  const { citiesList, countriesList, loadingDefinition } = useSelector(getDefinitionState);
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

  return { citiesList, countriesList, loadingDefinition };
};

export default useGetCityAndCountry;
