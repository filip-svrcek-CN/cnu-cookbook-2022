import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner, Alert, Button, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { api } from '../api';

export function DeleteRecipeModal({ getModalState, recipeId }) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [hasErrorDelete, setHasErrorDelete] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  const [modalState, setModalState] = useState(true);

  useEffect(() => {
    getModalState(modalState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState])

  const handleDeleteRecipe = () => {
    setHasErrorDelete(false);
    setIsLoadingDelete(true);
    api.delete(`/recipes/${recipeId}`).then(
      () => {
        setIsSuccessDelete(true);
        notify();
      }
    )
      .catch(
        () => {
          setHasErrorDelete(true);
        }
      )
      .finally(
        () => {
          setIsLoadingDelete(false);
        }
      );
  };

  const notify = () => toast.success("Recept úspěšně smazán!");

  return (
    <Modal isOpen={modalState}>
      <ModalHeader>Smazání receptu</ModalHeader>
      <ModalBody>
        <div>Opravdu chcete smazat recept?</div>
        {isLoadingDelete && <Spinner style={{ margin: "10px 0px 0px 0px" }} />}
        {!isSuccessDelete && hasErrorDelete && <Alert style={{ margin: "10px 0px 0px 0px" }} color="danger">Smazání nebylo úspěšné!</Alert>}
      </ModalBody>
      <ModalFooter>
        {!isSuccessDelete && <Button style={{ width: "80px" }} color="danger" onClick={handleDeleteRecipe}>Smazat</Button>}
        {!isSuccessDelete && <Button color="secondary" onClick={() => setModalState(!modalState)}>Zrušit</Button>}
        {isSuccessDelete && <Navigate to="/" />}
      </ModalFooter>
    </Modal>
  )
}
