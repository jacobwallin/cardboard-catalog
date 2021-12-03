import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { createBrand, updateBrand } from "../../../store/library/brands/thunks";
import ModalBackground from "../../shared/Background";
import ModalWindow from "../components/modal/ModalWindow";
import ModalHeader from "../components/modal/ModalHeader";
import BrandForm from "./BrandForm";
import { createStatusSelector } from "../../../store/loading/reducer";
import { Brand } from "../../../store/library/brands/types";

const createBrandStatusSelector = createStatusSelector("CREATE_BRAND");
const updateBrandStatusSelector = createStatusSelector("UPDATE_BRAND");

interface Props {
  dismiss(): void;
  editBrand?: Brand;
}
export default function BrandModal(props: Props) {
  const dispatch = useDispatch();

  const [brandCreatedOrEdited, setBrandCreatedOrEdited] = useState(false);

  const createBrandStatus = useSelector((state: RootState) =>
    createBrandStatusSelector(state)
  );
  const updateBrandStatus = useSelector((state: RootState) =>
    updateBrandStatusSelector(state)
  );

  function createNewBrand(brandData: { name: string }) {
    dispatch(createBrand({ name: brandData.name }));
    setBrandCreatedOrEdited(true);
  }

  function editBrand(brandData: { name: string }) {
    if (props.editBrand) {
      dispatch(updateBrand(props.editBrand.id, { name: brandData.name }));
      setBrandCreatedOrEdited(true);
    }
  }

  // dismiss modal upon success
  useEffect(() => {
    if (createBrandStatus === "SUCCESS" && brandCreatedOrEdited) {
      props.dismiss();
    }
  }, [createBrandStatus, props, brandCreatedOrEdited]);
  useEffect(() => {
    if (updateBrandStatus === "SUCCESS" && brandCreatedOrEdited) {
      props.dismiss();
    }
  }, [updateBrandStatus, props, brandCreatedOrEdited]);

  return (
    <ModalBackground>
      <ModalWindow>
        {props.editBrand ? (
          <>
            <ModalHeader handleClose={props.dismiss} title="Edit Brand" />
            <BrandForm handleSubmit={editBrand} editBrand={props.editBrand} />
          </>
        ) : (
          <>
            <ModalHeader handleClose={props.dismiss} title="Add New Brand" />
            <BrandForm handleSubmit={createNewBrand} />
          </>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
