import styled from "styled-components";
import * as colors from "src/styles/colors";

export const StyledLayout = styled.div`
    && {
        background-color: ${colors.white};
        min-height: 100vh;
    }
`;

export const ContentContainer = styled.div`
    && {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 50px;
        background-color: #fff;
    }
`;
