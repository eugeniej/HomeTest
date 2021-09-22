import React, { useState } from 'react';
import styled from 'styled-components';
import { Props } from './ClinicalTrials';

const BarStyled = styled.input`
  width: 10rem;
  background: #F2F1F9;
  padding: 0.5rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonStyled = styled.button`
  background: #000;
  color: #fff;
`;

const SearchBar = ({setCountryListCollection}: Pick<Props, 'setCountryListCollection'>) => {

const [keyword, setKeyword] = useState(String)

  return (
    <SearchBarContainer>
      <BarStyled 
       type="text"
       value={keyword}
       placeholder={"search country"}
       onChange={(e) => setKeyword(e.target.value)}
      />
      <ButtonStyled onClick={() => setCountryListCollection(keyword)}>OK</ButtonStyled>
    </SearchBarContainer>
  );
}

export default SearchBar