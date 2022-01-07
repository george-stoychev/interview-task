import React from "react";
import { Field, useField } from "formik";
import { ErrorMessage } from "formik";

type Props = {
  name: string;
  label: string;
  readOnly?: boolean;
};

const Text: React.FC<Props> = (props) => {
  const [, { error }] = useField(props);

  return (
    <div className={`input-wrapper ${error ? "with-error" : ""}`} {...props}>
      <label htmlFor={props.name}>{props.label}</label>
      <Field type="text" {...props} id={props.name} />
      <ErrorMessage name={props.name}>
        {(msg) => <div className="error-message">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Text;
