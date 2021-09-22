import React, {useState} from "react";
import graphql from "babel-plugin-relay/macro";
import styled from "styled-components";
import {QueryRenderer} from "react-relay";

import ClinicalTrials from "./ClinicalTrials";
import environment from "./environment";
import {AppQuery} from "./__generated__/AppQuery.graphql";

const Layout = styled.div`
  background: #f6f7fa;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 48px;
  max-width: 1300px;
  width: 100%;
`;

export type PatientsSortDirection = 'asc' | 'desc' | null;
export type CountriesSortDirection = 'asc' | 'desc' | null;
export type CountryListCollection = string | null;

const App: React.FC = () => {
  const [patientsSortDirection, setPatientsSortDirection] = useState<PatientsSortDirection>(null);
  const [countriesSortDirection, setCountriesSortDirection] = useState<CountriesSortDirection>(null);
  const [countryListCollection, setCountryListCollection] = useState<CountryListCollection>(null);

    return (
      <Layout>
        <Content>
          <QueryRenderer<AppQuery>
            environment={environment}
            query={graphql`
          query AppQuery($patientsSortDirection: String, $countriesSortDirection: String, $countryListCollection: String)  {
            clinicalTrials(patientsSortDirection:$patientsSortDirection, countriesSortDirection:$countriesSortDirection, countryListCollection:$countryListCollection) {
              country
              city
              patients
              site
            }
          }
        `}
            variables={{patientsSortDirection, countriesSortDirection, countryListCollection}}
            render={({props}) => {
              if (!props) {
                return;
              }
              return <ClinicalTrials patientsSortDirection={patientsSortDirection}
                                     countriesSortDirection={countriesSortDirection}
                                     countryListCollection={countryListCollection}
                                     setCountriesSortDirection={setCountriesSortDirection}
                                     setPatientsSortDirection={setPatientsSortDirection}
                                     setCountryListCollection={setCountryListCollection}
                                     clinicalTrials={props.clinicalTrials}/>;
            }}
          />
        </Content>
      </Layout>
    );
};

export default App;
