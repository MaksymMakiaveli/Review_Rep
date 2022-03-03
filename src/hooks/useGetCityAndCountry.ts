import { useEffect } from 'react';

import { getCitiesList, getCountriesList } from '@Actions/definition.action';
import { RootState } from '@RootStateType';
import { City, Country } from '@Types/definition.types';
import { useDispatch, useSelector } from 'react-redux';

const getDefinitionState = (state: RootState) => state.DefinitionReducer;

const useGetCityAndCountry = (): {
  citiesList: City[];
  countriesList: Country[];
} => {
  const { citiesList, countriesList } = useSelector(getDefinitionState);
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

  return { citiesList, countriesList };
};

export default useGetCityAndCountry;
