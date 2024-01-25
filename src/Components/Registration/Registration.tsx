import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { LinearProgress } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FormikTouched, useFormik } from "formik";
import * as Yup from "yup";

import {
  addUserDetails,
  addOtherDetails,
  addUserData,
} from "../../redux/formAction";
import { RootState } from "../../redux/store";

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  gender: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  mobile: string;
}

type StatesByCountry = {
  [country: string]: string[];
};

const countries = ["USA", "Canada", "UK", "Australia", "India"];

const statesByCountry: StatesByCountry = {
  USA: ["New York", "California", "Texas", "Florida"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  UK: ["Peris", "Brampton", "Chicago", "poland"],
  India: ["Bihar", "Gujarat", "Delhi", "Ayodhya"],
  Australia: ["Brazil", "Azerbaijan", "Bosnia", "Honduras"],
};

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state);


  console.log("state: ", state);
  // console.log('userDetails: ', userDetails);
  // console.log('otherDetails: ', otherDetails);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  
  const [initialValidationDone, setInitialValidationDone] = useState(false);

  useEffect(() => {
    const performInitialValidation = async () => {
      const validationErrors = await formik.validateForm();
      const fieldsToValidate: (keyof FormValues)[] = [
        "firstname",
        "lastname",
        "email",
        "dob",
        "gender",
      ];
      validateAndSetErrors(fieldsToValidate);
      if (fieldsToValidate.some((field) => !!formik.errors[field])) {
        
      } else {
        setInitialValidationDone(true);
      }
    };
    performInitialValidation();
  }, []);

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female"], "Invalid gender"),
  });

  const validationSchema2 = Yup.object({
    address1: Yup.string().required("Address 1 is required"),
    address2: Yup.string().required("Address 2 is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number. It should be 10 digits.")
      .required("Mobile No. is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      gender: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      mobile: "",
    },
    validationSchema: activeStep === 0 ? validationSchema : validationSchema2,
    initialTouched: {},
    onSubmit: (values) => {

      console.log(values);
   
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },
  });

  const handleNext = async () => {
    console.log("Handling next step");
  
    if (!initialValidationDone) {
      const fieldsToValidate: (keyof FormValues)[] = [
        "firstname",
        "lastname",
        "email",
        "dob",
        "gender",
      ];
  
      const touched: FormikTouched<FormValues> = {};
      fieldsToValidate.forEach((field) => {
        touched[field] = true;
      });
  
      formik.setTouched(touched);
  
      const validationErrors = await formik.validateForm();
      validateAndSetErrors(fieldsToValidate);
  
      if (fieldsToValidate.some((field) => !!formik.errors[field])) {
        return;
      } else {
        setInitialValidationDone(true);
      }
    }
  
   
    if (activeStep === 0) {
      const fieldsToValidate: (keyof FormValues)[] = [
        "firstname",
        "lastname",
        "email",
        "dob",
        "gender",
      ];
  
      if (!formik.values.firstname || !formik.values.lastname || !formik.values.email || !formik.values.dob || !formik.values.gender) {
        validateAndSetErrors(fieldsToValidate);
  
        if (fieldsToValidate.some((field) => !!formik.errors[field])) {
          return;
        }
      }
  
      fieldsToValidate.forEach((field) => {
        dispatch(addUserDetails(field, formik.values[field]));
      });
    } else {
      const fieldsToValidate: (keyof FormValues)[] = [
        "address1",
        "address2",
        "country",
        "state",
        "mobile",
      ];
  
      validateAndSetErrors(fieldsToValidate);
  
      if (fieldsToValidate.some((field) => !!formik.errors[field])) {
        return;
      }
  
      fieldsToValidate.forEach((field) => {
        dispatch(addOtherDetails(field, formik.values[field]));
      });
    }
  
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const validateAndSetErrors = async (
    fieldsToValidate: (keyof FormValues)[]
  ) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};

    fieldsToValidate.forEach((field) => {
      const reduxAction =
        activeStep === 0
          ? addUserDetails(field, formik.values[field])
          : addOtherDetails(field, formik.values[field]);

      dispatch(reduxAction);
    });

    formik.setErrors(errors);
  };

  
  const handleBack = (e: any) => {
    e.preventDefault();

    if (activeStep === 1) {
      const fieldsToClear: (keyof FormValues)[] = [
        "address1",
        "address2",
        "country",
        "state",
        "mobile",
      ];
  
      fieldsToClear.forEach((field) => {
        formik.setFieldError(field, ""); // Clear errors for step 1 fields
      });
    }
  
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleSubmit = async () => {
    if (activeStep === 0) {
      handleNext();
    } else {
      const validateAndSetField = async (field: keyof FormValues) => {
        try {
          await formik.validateField(field);
        } catch (error: any) {
          const validationError = error as Error;
          formik.setFieldError(field, validationError.message);
          formik.setFieldTouched(field, true, false);
        }
      };

      const validateFields = async (fields: (keyof FormValues)[]) => {
        await Promise.all(fields.map(validateAndSetField));
      };

      const dispatchUserDetailsAction = (field: keyof FormValues) => {
        dispatch(addUserDetails(field, formik.values[field] as string));
      };

      const dispatchOtherDetailsAction = (field: keyof FormValues) => {
        dispatch(addOtherDetails(field, formik.values[field] as string));
      };

      const fieldsToValidate: (keyof FormValues)[] = [
        "address1",
        "address2",
        "country",
        "state",
        "mobile",
      ];

      await validateFields(fieldsToValidate);

      if (
        Object.keys(await formik.validateForm()).length === 0 &&
        !fieldsToValidate.some((field) => !!formik.errors[field])
      ) {
        if (!formik.values.country) {
          formik.setFieldError("country", "Country is required");
          return;
        }

        if (
          !statesByCountry[formik.values.country]?.includes(formik.values.state)
        ) {
          formik.setFieldError("state", "Please select country first");
          return;
        }

        // Dispatch actions to update Redux store with user details and other details
        const userDetailFields: (keyof FormValues)[] = [
          "firstname",
          "lastname",
          "email",
          "dob",
          "gender",
        ];
        for (const field of userDetailFields) {
          dispatchUserDetailsAction(field);
        }

        const otherDetailFields: (keyof FormValues)[] = [
          "address1",
          "address2",
          "country",
          "state",
          "mobile",
        ];
        for (const field of fieldsToValidate) {
          dispatchOtherDetailsAction(field);
        }

        const userDetailData = userDetailFields.reduce((data, field) => {
          data[field] = formik.values[field] as string;
          return data;
        }, {} as any);

        const otherDetailData = otherDetailFields.reduce((data, field) => {
          data[field] = formik.values[field] as string;
          return data;
        }, {} as any);

        dispatch(
          addUserData({
            userDetails: userDetailData,
            otherDetails: otherDetailData,
          })
        );

        // Reset form
        formik.resetForm();

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  const steps = ["Enter User Details", "Enter Other Details"];

  return (
    <>
      <Container component="main" maxWidth="md">
        <Paper elevation={6} style={{ padding: 16, marginTop: 32 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography
            sx={{ marginY: "16px" }}
            variant="h5"
            align="left"
            gutterBottom
          >
            {steps[activeStep]}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {activeStep === 0 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="firstname"
                      name="firstname"
                      label="First Name"
                      variant="outlined"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstname && !!formik.errors.firstname
                      }
                      helperText={
                        formik.touched.firstname && formik.errors.firstname
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastname"
                      name="lastname"
                      label="Last Name"
                      variant="outlined"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lastname && !!formik.errors.lastname
                      }
                      helperText={
                        formik.touched.lastname && formik.errors.lastname
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="dob"
                      name="dob"
                      label="Date of Birth"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.dob && !!formik.errors.dob}
                      helperText={formik.touched.dob && formik.errors.dob}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RadioGroup
                      row
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                      />
                    </RadioGroup>

                    {formik.touched.gender && formik.errors.gender && (
                      <Typography variant="body2" color="error">
                        {formik.errors.gender}
                      </Typography>
                    )}
                  </Grid>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="address1"
                      name="address1"
                      label="Address 1"
                      variant="outlined"
                      value={formik.values.address1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.address1 && !!formik.errors.address1
                      }
                      helperText={
                        formik.touched.address1 && formik.errors.address1
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="address2"
                      name="address2"
                      label="Address 2"
                      variant="outlined"
                      value={formik.values.address2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.address2 && !!formik.errors.address2
                      }
                      helperText={
                        formik.touched.address2 && formik.errors.address2
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId="country-label"
                        id="country"
                        name="country"
                        label="Country"
                        value={formik.values.country}
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSelectedCountry(e.target.value as string);
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.country && !!formik.errors.country
                        }
                      >
                        {countries.map((country) => (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.country && formik.errors.country && (
                        <Typography variant="body2" color="error">
                          {formik.errors.country}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="state-label">State</InputLabel>
                      <Select
                        labelId="state-label"
                        id="state"
                        name="state"
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.state && !!formik.errors.state}
                      >
                        {selectedCountry &&
                          statesByCountry[selectedCountry]?.map(
                            (state: string) => (
                              <MenuItem key={state} value={state}>
                                {state}
                              </MenuItem>
                            )
                          )}
                      </Select>
                      {formik.touched.state && formik.errors.state && (
                        <Typography variant="body2" color="error">
                          {formik.errors.state}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="mobile"
                      name="mobile"
                      label="Mobile No."
                      variant="outlined"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.mobile && !!formik.errors.mobile}
                      helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {activeStep === 0 ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: 16 }}
                  >
                    Next Step
                  </Button>
                ) : (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      style={{ marginTop: 16, marginRight: 8 }}
                      onClick={handleBack}
                    >
                      Back Step
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ marginTop: 16, marginRight: 8 }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      style={{ marginTop: 16 }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};
