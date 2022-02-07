import { combineReducers } from 'redux';
import { ApplicationReducer } from './application.reducer';
import { CompanyReducer } from './company.reducer';
import { DefinitionReducer } from './definition.reducer';
import { VendorReducer } from './vendor.reducer';
import { ContractReducer } from './contract.reducer';
import { CurrencyReducer } from './currency.reducer';
import { TitleReducer } from './title.reducer';
import { CostCenterReducer } from './costCenter.reducer';

const reducer = combineReducers({
  ApplicationReducer,
  CompanyReducer,
  DefinitionReducer,
  VendorReducer,
  ContractReducer,
  CurrencyReducer,
  TitleReducer,
  CostCenterReducer,
});

export default reducer;
