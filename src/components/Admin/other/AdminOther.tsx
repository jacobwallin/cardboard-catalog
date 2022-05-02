import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchAllBrands } from "../../../store/library/brands/thunks";
import { fetchAllGradingCompanies } from "../../../store/library/grading_companies/thunks";
import AdminPageContainer from "../components/AdminPageContainer";
import * as DataTableComponents from "../components/DataTableComponents";
import DataTable from "react-data-table-component";
import { brandColumns, companyColumns } from "./columns";
import { Brand } from "../../../store/library/brands/types";
import { GradingCompany } from "../../../store/library/grading_companies/types";
import BrandModal from "./BrandModal";
import CompanyModal from "./CompanyModal";
import { Header } from "../components/PageHeader";
import CreateButton from "../components/CreateButton";

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
      <Header>MANAGE BRANDS</Header>
      <DataTableComponents.DataTableWrapper>
        <DataTableComponents.DataTableHeader>
          <DataTableComponents.DataTableTitle>
            Card Brands
          </DataTableComponents.DataTableTitle>
          <DataTableComponents.DataTableButtonsContainer>
            <CreateButton onClick={openBrandModal}>Add Brand</CreateButton>
          </DataTableComponents.DataTableButtonsContainer>
        </DataTableComponents.DataTableHeader>
        <DataTable
          noHeader
          data={brands}
          columns={brandColumns(editBrand)}
          dense
          pagination
        />
      </DataTableComponents.DataTableWrapper>
      {showCreateCompanyModal && <CompanyModal dismiss={closeCompanyModal} />}
      {companyToEdit && (
        <CompanyModal dismiss={closeCompanyModal} editCompany={companyToEdit} />
      )}
      <Header>MANAGE GRADING COMPANIES</Header>
      <DataTableComponents.DataTableWrapper>
        <DataTableComponents.DataTableHeader>
          <DataTableComponents.DataTableTitle>
            Grading Companies
          </DataTableComponents.DataTableTitle>
          <DataTableComponents.DataTableButtonsContainer>
            <CreateButton onClick={openCompanyModal}>Add Company</CreateButton>
          </DataTableComponents.DataTableButtonsContainer>
        </DataTableComponents.DataTableHeader>
        <DataTable
          noHeader
          data={companies}
          columns={companyColumns(editCompany)}
          dense
          pagination
        />
      </DataTableComponents.DataTableWrapper>
    </AdminPageContainer>
  );
}
