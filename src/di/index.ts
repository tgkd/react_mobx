import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

const container = new Container();
const { lazyInject } = getDecorators(container);

export {
    container,
    lazyInject
};
