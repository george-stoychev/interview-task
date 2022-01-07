import { useRef } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import Text from "../Inputs/Text";
import { Product } from "../../model/Product";

const ValidationSchema = object().shape({
  id: string().required("This field is required"),
  name: string().required("This field is required"),
  description: string().required("This field is required").min(3)
});

const initialValues = {
  id: "",
  name: "",
  description: "",
  imageUrl: ""
};

type Props = {
  cancel: () => void;
  onSubmit: (values: Product) => void;
  isLoading: boolean;
  productValues?: Product;
};

const Form: React.FC<Props> = ({
  cancel,
  onSubmit,
  isLoading,
  productValues
}): React.ReactElement => {
  const buttonRef = useRef(null);

  return (
    <Formik
      initialValues={productValues || initialValues}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Text
              name="id"
              label="ID"
              readOnly={!!(productValues && productValues.id)}
            />
            <Text name="name" label="Name" />
            <Text name="description" label="Description" />
            <Text name="imageUrl" label="Image" />
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
            <button ref={buttonRef} type="button" onClick={cancel}>
              Cancel
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
