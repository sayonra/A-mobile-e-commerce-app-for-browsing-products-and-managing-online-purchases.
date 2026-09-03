import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().trim().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object({
  username: yup.string().trim().min(3, 'At least 3 characters').required('Username is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'At least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

export const checkoutSchema = yup.object({
  fullName: yup.string().trim().required('Full name is required'),
  address: yup.string().trim().required('Address is required'),
  city: yup.string().trim().required('City is required'),
  zip: yup
    .string()
    .trim()
    .matches(/^[0-9]{4,10}$/, 'Enter a valid ZIP/postal code')
    .required('ZIP/postal code is required'),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9+\-\s]{7,15}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
});

// Runs a yup schema and returns a simple { valid, errors } shape that's easy
// to bind directly to form field error props.
export async function validateForm(schema, values) {
  try {
    await schema.validate(values, { abortEarly: false });
    return { valid: true, errors: {} };
  } catch (err) {
    const errors = {};
    if (err.inner) {
      err.inner.forEach((e) => {
        if (e.path && !errors[e.path]) errors[e.path] = e.message;
      });
    }
    return { valid: false, errors };
  }
}
