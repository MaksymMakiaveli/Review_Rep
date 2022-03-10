import { combineReducers } from 'redux';

import { ApplicationReducer } from './application.reducer';
import { CheckFactorReducer } from './checkFactors.reducer';
import { CompanyReducer } from './company.reducer';
import { ContractReducer } from './contract.reducer';
import { CostCenterReducer } from './costCenter.reducer';
import { CurrencyReducer } from './currency.reducer';
import { DefinitionReducer } from './definition.reducer';
import { DepartmentReducer } from './department.reducer';
import { SiteReducer } from './site.reducer';
import { VendorReducer } from './vendor.reducer';
import { TitleReducer } from './title.reducer';

const reducer = combineReducers({
  ApplicationReducer,
  CompanyReducer,
  DefinitionReducer,
  VendorReducer,
  ContractReducer,
  CurrencyReducer,
  TitleReducer,
  CostCenterReducer,
  DepartmentReducer,
  SiteReducer,
  CheckFactorReducer,
});

export default reducer;
