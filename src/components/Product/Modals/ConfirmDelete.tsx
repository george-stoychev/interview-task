import React from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { Product } from "../../../model/Product";
import { deleteProduct } from "../../../api/products";

type Props = {
  product: Product;
};

const ConfirmDelete: React.FC<Props> = ({ product }): React.ReactElement => {
  const [showDialog, setShowDialog] = React.useState(false);
  const buttonRef = React.useRef(null);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  function handleOnDelete() {
    deleteProduct(product);
  }

  return (
    <div>
      <button onClick={open}>&#10005;</button>

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        initialFocusRef={buttonRef}
        aria-label="Confirm delete"
      >
        <h4>Are you sure you want to delete this product?</h4>
        <button
          className="action danger"
          type="submit"
          onClick={handleOnDelete}
        >
          Delete
        </button>
        <button ref={buttonRef} type="button" onClick={close}>
          Cancel
        </button>
      </Dialog>
    </div>
  );
};

export default ConfirmDelete;
