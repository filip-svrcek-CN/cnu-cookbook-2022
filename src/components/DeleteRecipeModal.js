import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Spinner,
  Alert,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { api } from '../api';

export function DeleteRecipeModal({ openModal, setOpenModal, recipeId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDeleteRecipe = () => {
    setHasError(false);
    setIsLoading(true);
    api
      .delete(`/recipes/${recipeId}`)
      .then(() => {
        setIsSuccess(true);
        notify();
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const notify = () => toast.success('Recept úspěšně smazán!');

  return (
    <Modal isOpen={openModal}>
      <ModalHeader>Smazání receptu</ModalHeader>
      <ModalBody>
        <div>Opravdu chcete smazat recept?</div>
        {isLoading && <Spinner style={{ margin: '10px 0px 0px 0px' }} />}
        {!isSuccess && hasError && (
          <Alert style={{ margin: '10px 0px 0px 0px' }} color="danger">
            Smazání nebylo úspěšné!
          </Alert>
        )}
      </ModalBody>
      <ModalFooter>
        {!isSuccess && (
          <Button
            style={{ width: '80px' }}
            color="danger"
            onClick={handleDeleteRecipe}
          >
            Smazat
          </Button>
        )}
        {!isSuccess && (
          <Button color="secondary" onClick={() => setOpenModal(!openModal)}>
            Zrušit
          </Button>
        )}
        {isSuccess && <Navigate to="/" />}
      </ModalFooter>
    </Modal>
  );
}
