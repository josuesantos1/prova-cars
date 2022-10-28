import { App } from "./app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize()
    .then(() => {
        console.log("[{+}] AppResource initialized")
        new App().server.listen(3000);
    })
    .catch((error) => console.log(error))
