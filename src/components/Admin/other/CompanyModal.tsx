import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  createGradingCompany,
  updateGradingCompany,
} from "../../../store/library/grading_companies/thunks";
import ModalBackground from "../../shared/Background";
import ModalWindow from "../components/modal/ModalWindow";
import ModalHeader from "../components/modal/ModalHeader";
import CompanyForm from "./CompanyForm";
import { createStatusSelector } from "../../../store/loading/reducer";
import { GradingCompany } from "../../../store/library/grading_companies/types";

const createCompanyStatusSelector = createStatusSelector(
  "CREATE_GRADING_COMPANY"
);
const updateCompanyStatusSelector = createStatusSelector(
  "UPDATE_GRADING_COMPANY"
);

interface Props {
  dismiss(): void;
  editCompany?: GradingCompany;
}
export default function CompanyModal(props: Props) {
  const dispatch = useDispatch();

  const [companyCreatedOrEdited, setCompanyCreatedOrEdited] = useState(false);

  const createCompanyStatus = useSelector((state: RootState) =>
    createCompanyStatusSelector(state)
  );
  const updateCompanyStatus = useSelector((state: RootState) =>
    updateCompanyStatusSelector(state)
  );

  function createNewCompany(companyData: { name: string }) {
    dispatch(createGradingCompany({ name: companyData.name }));
    setCompanyCreatedOrEdited(true);
  }

  function editCompany(companyData: { name: string }) {
    if (props.editCompany) {
      dispatch(
        updateGradingCompany(props.editCompany.id, { name: companyData.name })
      );
      setCompanyCreatedOrEdited(true);
    }
  }

  // dismiss modal upon success
  useEffect(() => {
    if (createCompanyStatus === "SUCCESS" && companyCreatedOrEdited) {
      props.dismiss();
    }
  }, [createCompanyStatus, props, companyCreatedOrEdited]);
  useEffect(() => {
    if (updateCompanyStatus === "SUCCESS" && companyCreatedOrEdited) {
      props.dismiss();
    }
  }, [updateCompanyStatus, props, companyCreatedOrEdited]);

  return (
    <ModalBackground>
      <ModalWindow>
        {props.editCompany ? (
          <>
            <ModalHeader handleClose={props.dismiss} title="Edit Company" />
            <CompanyForm
              handleSubmit={editCompany}
              editCompany={props.editCompany}
            />
          </>
        ) : (
          <>
            <ModalHeader handleClose={props.dismiss} title="Add New Company" />
            <CompanyForm handleSubmit={createNewCompany} />
          </>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
