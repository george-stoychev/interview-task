import React from "react";
import { Dialog } from "@reach/dialog";
import { useMutation } from "react-query";
import "@reach/dialog/styles.css";

import Form from "src/components/Product/Form";
import { addProduct } from "src/api/products";
import { Product } from "src/model/Product";

const AddProduct: React.FC = (): React.ReactElement => {
  const [showDialog, setShowDialog] = React.useState(false);
  const buttonRef = React.useRef(null);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => close(),
    onError: (error) => {
      console.log("something happened:", error);
    }
  });

  function onSubmit(values: Product) {
    addMutation.mutate(values);
  }

  return (
    <div>
      <button onClick={open}>Add a product</button>

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        initialFocusRef={buttonRef}
        aria-label="Add a new product"
      >
        {addMutation.error && (
          <p className="danger">{String(addMutation.error)}</p>
        )}

        {addMutation.isLoading && <p>Saving ...</p>}

        <h4>Add a product</h4>
        <Form
          onSubmit={onSubmit}
          cancel={close}
          isLoading={addMutation.isLoading}
        />
      </Dialog>
    </div>
  );
};

export default AddProduct;
