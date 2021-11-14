import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../../../store/index";
import {
  updateSeries,
  deleteSeries,
} from "../../../../store/library/series/thunks";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";
import SeriesForm from "./SeriesForm";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import EditDeleteButtons from "../../components/form/EditDeleteButtons";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import CreatedUpdatedBy from "../../components/CreatedUpdatedBy";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SERIES"]);
const deletingSeriesSelector = createStatusSelector("DELETE_SERIES");

interface Props {
  seriesId: number;
}

export default function EditCard(props: Props) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [seriesDeleted, setSeriesDeleted] = useState(false);
  const [subsetId, setSubsetId] = useState(0);

  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );
  const deleteSeriesStatus = useSelector((state: RootState) =>
    deletingSeriesSelector(state)
  );
  const series = useSelector((state: RootState) => state.library.series.series);

  useEffect(() => {
    if (!isUpdating) {
      setIsEditing(false);
    }
  }, [isUpdating]);

  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }
  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal);
  }

  function handleFormSubmit(seriesData: {
    name: string;
    serialized: number | null;
    auto: boolean;
    relic: boolean;
    manufacturedRelic: boolean;
    refractor: boolean;
    shortPrint: boolean;
  }) {
    dispatch(
      updateSeries(series.id, {
        ...seriesData,
      })
    );
  }

  function handleDelete() {
    setSeriesDeleted(true);
    setSubsetId(series.subsetId);
    dispatch(deleteSeries(props.seriesId));
  }

  // re-direct if the card is succesfully deleted
  if (seriesDeleted && deleteSeriesStatus === "SUCCESS") {
    return <Redirect to={`/admin/edit/subset/${subsetId}`} />;
  }

  return (
    <>
      {showDeleteModal && (
        <ConfirmDeleteModal
          deleteStatus={deleteSeriesStatus}
          handleDelete={handleDelete}
          handleDismiss={toggleDeleteModal}
          message="This will delete this all card from this series as well including any that are in user's collections."
        />
      )}
      {isEditing ? (
        <SeriesForm
          createNew={false}
          handleCancel={handleEditStateChange}
          handleSubmit={handleFormSubmit}
        />
      ) : (
        <FormContainer>
          <FieldContainer>
            <FieldTitle>Name</FieldTitle>
            <FieldData>{series.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Serialized to</FieldTitle>
            <FieldData>
              {series.serialized ? series.serialized : "Not Serialized"}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Auto</FieldTitle>
            <FieldData>{series.auto ? "Yes" : "No"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Relic</FieldTitle>
            <FieldData>{series.relic ? "Yes" : "No"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Refractor</FieldTitle>
            <FieldData>{series.refractor ? "Yes" : "No"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Short Print</FieldTitle>
            <FieldData>{series.shortPrint ? "Yes" : "No"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Manufactured Relic</FieldTitle>
            <FieldData>{series.manufacturedRelic ? "Yes" : "No"}</FieldData>
          </FieldContainer>
          <EditDeleteButtons
            handleEdit={handleEditStateChange}
            handleDelete={toggleDeleteModal}
            hideDelete={series.subset.baseSeriesId === series.id}
          />
          <CreatedUpdatedBy
            createdBy={{
              username: series.createdByUser.username,
              timestamp: series.createdAt,
            }}
            updatedBy={{
              username: series.updatedByUser.username,
              timestamp: series.updatedAt,
            }}
          />
        </FormContainer>
      )}
    </>
  );
}
