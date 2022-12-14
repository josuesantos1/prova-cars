import { App } from "./app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize()
    .then(() => {
        console.log("[{+}] AppResource initialized")
        new App().server.listen(3030);
    })
    .catch((error) => console.log(error))
