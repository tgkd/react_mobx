import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { observer } from "mobx-react";

import { ContentContainer, StyledLayout } from "pages/DefaultPage/styled";

interface IDefaultPageProps {}

@observer
class DefaultPage extends React.Component<IDefaultPageProps & RouteComponentProps<any>> {
    public render() {
        const { children } = this.props;

        return (
            <StyledLayout>
                <ContentContainer>{children}</ContentContainer>
            </StyledLayout>
        );
    }
}

export default withRouter(DefaultPage);
