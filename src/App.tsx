import styled from "styled-components";

import GoogleLoginPage from "./components/GoogleLoginPage";

const Container = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 10px;
  padding: 50px;
`;

function App() {
    return (
        <Container>
            <GoogleLoginPage />
        </Container>
    );
}

export default App;