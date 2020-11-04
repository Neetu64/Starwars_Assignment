import styled from 'styled-components';

const Planet = styled.div`
width: ${props => (props.population / 100000)}px;
height: ${props => (props.population / 100000)}px;
border-radius: 10px;
`;
export default Planet;
