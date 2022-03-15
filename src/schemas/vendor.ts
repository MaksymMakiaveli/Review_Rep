import * as yup from 'yup';

export const schemaVendor = yup.object({
  name: yup.string().required('This field is required').max(100, 'Max length 100 characters'),
  partnerCode: yup.string().required('This field is required').max(50, 'Max length 50 characters'),
  phone: yup.string().max(11, 'Phone must be max 11 characters').required('This field is required'),
  address: yup.string().required('This field is required'),
  taxNumber: yup.string().max(10, 'Max length 10 characters').required('This field is required'),
  taxOffice: yup.string().max(50, 'Max length 50 characters'),
  cityId: yup.object({
    label: yup.string(),
    value: yup.number().required('Please select a city'),
  }),
  countryId: yup.object({
    label: yup.string(),
    value: yup.number().required('Please select a country'),
  }),
  email: yup.string().email('Email is not valid'),
  secondPhone: yup.string(),
  description: yup.string(),
});
