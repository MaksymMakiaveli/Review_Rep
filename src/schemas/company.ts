import * as yup from 'yup';

export const schemaCompany = yup.object({
  name: yup.string().required('This field is required'),
  companyCode: yup
    .string()
    .required('This field is required')
    .min(1, 'Company code must be max 4 characters')
    .max(4, 'Company code must be max 4 characters'),
  taxOffice: yup.string(),
  taxNumber: yup
    .string()
    .matches(/^[0-9]*$/, 'TXN must be a number')
    .required('This field is required'),
  cityId: yup.object({
    label: yup.string(),
    value: yup.number().required('Please select a city'),
  }),
  countryId: yup.object({
    label: yup.string(),
    value: yup.number().required('Please select a country'),
  }),
  address: yup.string().required('This field is required'),
  contactName: yup.string().email('Email is not valid'),
  phone: yup.string().max(11, 'Phone must be max 11 characters').required('This field is required'),
});
