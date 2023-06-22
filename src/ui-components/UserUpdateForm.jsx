/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    wallet: "",
    herotag: "",
    totalDonated: "",
    role: "",
    date_joined: "",
  };
  const [wallet, setWallet] = React.useState(initialValues.wallet);
  const [herotag, setHerotag] = React.useState(initialValues.herotag);
  const [totalDonated, setTotalDonated] = React.useState(
    initialValues.totalDonated
  );
  const [role, setRole] = React.useState(initialValues.role);
  const [date_joined, setDate_joined] = React.useState(
    initialValues.date_joined
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setWallet(cleanValues.wallet);
    setHerotag(cleanValues.herotag);
    setTotalDonated(cleanValues.totalDonated);
    setRole(cleanValues.role);
    setDate_joined(cleanValues.date_joined);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(User, idProp)
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    wallet: [],
    herotag: [],
    totalDonated: [],
    role: [],
    date_joined: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          wallet,
          herotag,
          totalDonated,
          role,
          date_joined,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            User.copyOf(userRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="Wallet"
        isRequired={false}
        isReadOnly={false}
        value={wallet}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wallet: value,
              herotag,
              totalDonated,
              role,
              date_joined,
            };
            const result = onChange(modelFields);
            value = result?.wallet ?? value;
          }
          if (errors.wallet?.hasError) {
            runValidationTasks("wallet", value);
          }
          setWallet(value);
        }}
        onBlur={() => runValidationTasks("wallet", wallet)}
        errorMessage={errors.wallet?.errorMessage}
        hasError={errors.wallet?.hasError}
        {...getOverrideProps(overrides, "wallet")}
      ></TextField>
      <TextField
        label="Herotag"
        isRequired={false}
        isReadOnly={false}
        value={herotag}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wallet,
              herotag: value,
              totalDonated,
              role,
              date_joined,
            };
            const result = onChange(modelFields);
            value = result?.herotag ?? value;
          }
          if (errors.herotag?.hasError) {
            runValidationTasks("herotag", value);
          }
          setHerotag(value);
        }}
        onBlur={() => runValidationTasks("herotag", herotag)}
        errorMessage={errors.herotag?.errorMessage}
        hasError={errors.herotag?.hasError}
        {...getOverrideProps(overrides, "herotag")}
      ></TextField>
      <TextField
        label="Total donated"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalDonated}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              wallet,
              herotag,
              totalDonated: value,
              role,
              date_joined,
            };
            const result = onChange(modelFields);
            value = result?.totalDonated ?? value;
          }
          if (errors.totalDonated?.hasError) {
            runValidationTasks("totalDonated", value);
          }
          setTotalDonated(value);
        }}
        onBlur={() => runValidationTasks("totalDonated", totalDonated)}
        errorMessage={errors.totalDonated?.errorMessage}
        hasError={errors.totalDonated?.hasError}
        {...getOverrideProps(overrides, "totalDonated")}
      ></TextField>
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wallet,
              herotag,
              totalDonated,
              role: value,
              date_joined,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
      ></TextField>
      <TextField
        label="Date joined"
        isRequired={false}
        isReadOnly={false}
        value={date_joined}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wallet,
              herotag,
              totalDonated,
              role,
              date_joined: value,
            };
            const result = onChange(modelFields);
            value = result?.date_joined ?? value;
          }
          if (errors.date_joined?.hasError) {
            runValidationTasks("date_joined", value);
          }
          setDate_joined(value);
        }}
        onBlur={() => runValidationTasks("date_joined", date_joined)}
        errorMessage={errors.date_joined?.errorMessage}
        hasError={errors.date_joined?.hasError}
        {...getOverrideProps(overrides, "date_joined")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
