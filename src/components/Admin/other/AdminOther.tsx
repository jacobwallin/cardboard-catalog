import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchAllBrands } from "../../../store/library/brands/thunks";
import { fetchAllGradingCompanies } from "../../../store/library/grading_companies/thunks";
import AdminPageContainer from "../components/AdminPageContainer";
import EditFormHeader from "../components/EditFormHeader";
import { DataTableWrapper } from "../components/DataTableComponents";
import DataTable from "react-data-table-component";
import { brandColumns, companyColumns } from "./columns";
import StyledButton from "../components/StyledButton";
import { Brand } from "../../../store/library/brands/types";
import { GradingCompany } from "../../../store/library/grading_companies/types";
import BrandModal from "./BrandModal";
import CompanyModal from "./CompanyModal";

export default function AdminOther() {
  const dispatch = useDispatch();

  const [showCreateBrandModal, setShowCreateBrandModal] = useState(false);
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState<Brand | undefined>(undefined);
  const [companyToEdit, setCompanyToEdit] = useState<
    GradingCompany | undefined
  >(undefined);

  const brands = useSelector(
    (state: RootState) => state.library.brands.allBrands
  );
  const companies = useSelector(
    (state: RootState) => state.library.gradingCompanies
  );

  useEffect(() => {
    dispatch(fetchAllBrands());
    dispatch(fetchAllGradingCompanies());
  }, []);

  function editBrand(b: Brand) {
    setBrandToEdit(b);
  }
  function editCompany(c: GradingCompany) {
    setCompanyToEdit(c);
  }

  function openBrandModal() {
    setShowCreateBrandModal(true);
  }

  function closeBrandModal() {
    setShowCreateBrandModal(false);
    setBrandToEdit(undefined);
  }

  function openCompanyModal() {
    setShowCreateCompanyModal(true);
  }

  function closeCompanyModal() {
    setShowCreateCompanyModal(false);
    setCompanyToEdit(undefined);
  }

  return (
    <AdminPageContainer>
      {showCreateBrandModal && <BrandModal dismiss={closeBrandModal} />}
      {brandToEdit && (
        <BrandModal dismiss={closeBrandModal} editBrand={brandToEdit} />
      )}
      <EditFormHeader text="Manage Brands" />
      <DataTableWrapper>
        <DataTable
          title="Brands"
          actions={
            <StyledButton
              color="GREEN"
              width="125px"
              height="27px"
              fontSize="0.9rem"
              onClick={openBrandModal}
            >
              Add Brand
            </StyledButton>
          }
          data={brands}
          columns={brandColumns(editBrand)}
          dense
          pagination
        />
      </DataTableWrapper>
      {showCreateCompanyModal && <CompanyModal dismiss={closeCompanyModal} />}
      {companyToEdit && (
        <CompanyModal dismiss={closeCompanyModal} editCompany={companyToEdit} />
      )}
      <EditFormHeader text="Manage Grading Companies" />
      <DataTableWrapper>
        <DataTable
          title="Grading Companies"
          actions={
            <StyledButton
              color="GREEN"
              width="125px"
              height="27px"
              fontSize="0.9rem"
              onClick={openCompanyModal}
            >
              Add Company
            </StyledButton>
          }
          data={companies}
          columns={companyColumns(editCompany)}
          dense
          pagination
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
