import React from "react";
import { Dialog } from "@reach/dialog";
import { useMutation } from "react-query";
import "@reach/dialog/styles.css";

import Form from "src/components/Product/Form";

import { Product } from "src/model/Product";
import { updateProduct } from "src/api/products";

type Props = {
  product: Product;
};

const ProductModal: React.FC<Props> = ({ product }): React.ReactElement => {
  const [showDialog, setShowDialog] = React.useState(false);
  const buttonRef = React.useRef(null);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => close()
  });

  return (
    <div>
      <button onClick={open}>&#9998;</button>

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        initialFocusRef={buttonRef}
        aria-label="Edit a product"
      >
        {updateMutation.error && (
          <p className="danger">{String(updateMutation.error)}</p>
        )}

        {updateMutation.isLoading && <p>Saving ...</p>}

        <h4>Edit product</h4>
        <Form
          onSubmit={updateMutation.mutate}
          isLoading={updateMutation.isLoading}
          cancel={close}
          productValues={product}
        />
      </Dialog>
    </div>
  );
};

export default ProductModal;
