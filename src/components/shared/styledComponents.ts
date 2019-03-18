import styled from "styled-components";
import * as colors from "src/styles/colors";

interface IStyledAvatarProps {
    size?: number;
    url: string;
}

export const StyledAvatar = styled.div`
    width: ${(p: IStyledAvatarProps) => `${p.size || 40}px`};
    height: ${(p: IStyledAvatarProps) => `${p.size || 40}px`};
    border-radius: ${p => `${p.size ? p.size / 2 : 20}px`};
    background-image: url("${(p: IStyledAvatarProps) => p.url}");
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
`;

