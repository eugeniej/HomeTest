import styled from "styled-components";
import React, { Fragment, useCallback } from "react";

import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import { CountriesSortDirection, PatientsSortDirection, CountryListCollection } from "./App";
import SearchBar from "./SearchBar";

const Table = styled.div`
  border-collapse: separate;
  border-spacing: 0px 8px;
  display: table;
`;

const Header = styled.div`
  display: table-header-group;
`;

const Body = styled.div`
  display: table-row-group;
`;

const Row = styled.div`
  display: table-row;
`;

const HeaderCell = styled.div`
  display: table-cell;
  padding: 8px 32px;
  border-radius: 4px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ClickableHeaderCell = styled(HeaderCell)`
  cursor: pointer;
  &:hover {
    background-color: #b5b6ba;
  }
`;

const Cell = styled.div`
  --border-color: #eaedf1;
  display: table-cell;
  vertical-align: middle;
  padding: 16px 32px;
  background: #ffffff;
  border-width: 1px;
  border-style: solid none;
  border-color: var(--border-color);

  &:first-child {
    border-left: 1px solid var(--border-color);
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-right: 1px solid var(--border-color);
    border-radius: 0 4px 4px 0;
  }
`;
export interface Props {
  clinicalTrials: AppQueryResponse["clinicalTrials"];
  patientsSortDirection: PatientsSortDirection;
  countriesSortDirection: CountriesSortDirection;
  countryListCollection: CountryListCollection;
  setPatientsSortDirection: (
    patientsSortDirection: PatientsSortDirection
  ) => void;
  setCountriesSortDirection: (
    countriesSortDirection: CountriesSortDirection
  ) => void;
  setCountryListCollection: (
    countryListCollection: CountryListCollection
  ) => void;
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  countriesSortDirection,
  setPatientsSortDirection,
  setCountriesSortDirection,
  setCountryListCollection,
}: Props) => {

  const togglePatientsSortDirection = useCallback(() => {
    if (patientsSortDirection == null) {
      setPatientsSortDirection("asc");
    } else if (patientsSortDirection === "asc") {
      setPatientsSortDirection("desc");
    } else {
      setPatientsSortDirection(null);
    }
  }, [patientsSortDirection, setPatientsSortDirection]);

    const toggleCountriesSortDirection = useCallback(() => {
    if (countriesSortDirection == null) {
      setCountriesSortDirection("asc");
    } else if (countriesSortDirection === "asc") {
      setCountriesSortDirection("desc");
    } else {
      setCountriesSortDirection(null);
    }
  }, [countriesSortDirection, setCountriesSortDirection]);


  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
            <SearchWrapper>
              <ClickableHeaderCell onClick={toggleCountriesSortDirection}>
                  <p>country{sortCountriesDirectionIndicator(countriesSortDirection)}</p>
              </ClickableHeaderCell>
              <SearchBar setCountryListCollection={setCountryListCollection} />
            </SearchWrapper>
          <HeaderCell>city</HeaderCell>
          <ClickableHeaderCell onClick={togglePatientsSortDirection}>
            patients{sortDirectionIndicator(patientsSortDirection)}
          </ClickableHeaderCell>
        </Header>
        <Body>
          {clinicalTrials.map(clinicalTrial => (
            <Row key={clinicalTrial.site}>
              <Cell>{clinicalTrial.site}</Cell>
              <Cell>{clinicalTrial.country}</Cell>
              <Cell>{clinicalTrial.city.toUpperCase()}</Cell>
              <Cell>{clinicalTrial.patients}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Fragment>
  );
};

const sortDirectionIndicator = (
  patientsSortDirection: PatientsSortDirection
) => {
  if (patientsSortDirection === "asc") return "↑";
  if (patientsSortDirection === "desc") return "↓";
  return "";
};

const sortCountriesDirectionIndicator = (
  countriesSortDirection: CountriesSortDirection
) => {
  if (countriesSortDirection === "asc") return "↑";
  if (countriesSortDirection === "desc") return "↓";
  return "";
};

export default ClinicalTrials;
